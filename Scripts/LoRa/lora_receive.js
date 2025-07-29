// AES key - usa uma chave única e segura!
const aesKey = 'aa469421e5f4089a1418ea24ba37c61bdd469421e5f41249a1418ea24ba374321';
const CHECKSUM_SIZE = 4;
const MENSAGEM_PARA_ACCAO = 'ABRIR_PORTAO_1';

// Geração de checksum simples com XOR
function generateChecksum(msg) {
  let checksum = 0;
  for (let i = 0; i < msg.length; i++) {
    checksum ^= msg.charCodeAt(i);
  }
  let hexChecksum = checksum.toString(16);
  while (hexChecksum.length < CHECKSUM_SIZE) {
    hexChecksum = '0' + hexChecksum;
  }
  return hexChecksum.slice(-CHECKSUM_SIZE);
}

// Verifica integridade do conteúdo da mensagem
function verifyMessage(message) {
  if (message.length < CHECKSUM_SIZE + 1) {
    print('[LoRa] invalid message (too short)');
    return;
  }

  const receivedCheckSum = message.slice(0, CHECKSUM_SIZE);
  const _message = message.slice(CHECKSUM_SIZE);
  const expectedChecksum = generateChecksum(_message);

  if (receivedCheckSum !== expectedChecksum) {
    print('[LoRa] invalid message (checksum corrupted)');
    return;
  }

  return _message;
}

// Função para decifrar a mensagem AES
function decryptMessage(buffer, keyHex) {
  function fromHex(hex) {
    const arr = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      arr[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return arr;
  }

  function hex2a(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }

  function toHex(buffer) {
    let s = '';
    for (let i = 0; i < buffer.length; i++) {
      s += (256 + buffer[i]).toString(16).substr(-2);
    }
    return s;
  }

  const key = fromHex(keyHex);
  const decrypted = AES.decrypt(buffer, key, { mode: 'ECB' });

  if (!decrypted || decrypted.byteLength === 0) {
    print('[LoRa] invalid msg (empty decryption result)');
    return;
  }

  const hex = toHex(decrypted);
  const checksumMessage = hex2a(hex).trim();
  const finalMessage = verifyMessage(checksumMessage);
  
  return finalMessage;
}

// Manipulador de eventos LoRa
Shelly.addEventHandler(function (event) {
  if (
    typeof event !== 'object' ||
    event.name !== 'lora' ||
    !event.info ||
    !event.info.data
  ) {
    return;
  }

  // Descodifica e desencripta a mensagem
  const encryptedMsg = atob(event.info.data);
  const decryptedMessage = decryptMessage(encryptedMsg, aesKey);

  // Se a mensagem não for válida, ignora
  if (typeof decryptedMessage === "undefined") {
    return;
  }

  print("Message received: ", decryptedMessage);

  // Só executar o relé se a mensagem for "ABRIR_PORTAO_1"
  if (decryptedMessage !== MENSAGEM_PARA_ACCAO) {
    print("Mensagem não autorizada. Ignorado.");
    return;
  }

  // Lógica: Primeiro garante que o relé está desligado
  Shelly.call("Switch.Set", { id: 0, on: false }, function(res, err) {
    if (err) {
      print("Erro ao desligar o relé inicialmente:", err.message);
      return;
    }

    print("Relé OFF confirmado. A aguardar...");

    // Espera 500ms para garantir estabilidade do estado
    Timer.set(500, false, function() {
      // Confirma se o relé realmente está OFF
      Shelly.call("Switch.GetStatus", { id: 0 }, function(status, err) {
        if (err || status.output !== false) {
          print("Relé ainda está ligado, operação cancelada.");
          return;
        }

        print("Relé está definitivamente OFF. Executar pulso ON-OFF.");

        // Liga o relé
        Shelly.call("Switch.Set", { id: 0, on: true }, function () {
          print("Relé ligado (ON)");

          // Após 1 segundo, desliga novamente
          Timer.set(1000, false, function() {
            Shelly.call("Switch.Set", { id: 0, on: false }, function() {
              print("Relé desligado (OFF) após 1s");
            });
          });
        });
      });
    });
  });
});