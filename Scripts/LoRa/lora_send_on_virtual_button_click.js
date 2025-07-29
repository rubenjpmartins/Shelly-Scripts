// AES key – usa uma chave única!
const aesKey = 'aa469421e5f4089a1418ea24ba37c61bdd469421e5f41249a1418ea24ba374321';
const CHECKSUM_SIZE = 4;

// ---------- Funções de encriptação / checksum ----------
function encryptMessage(msg, keyHex) {
  function fromHex(hex) {
    const arr = new ArrayBuffer(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) arr[i / 2] = parseInt(hex.substr(i, 2), 16);
    return arr;
  }

  function padRight(str, size) {
    const pad = (size - (str.length % size)) % size;
    for (let i = 0; i < pad; i++) str += ' ';
    return str;
  }

  const key = fromHex(keyHex);
  const plaintext = padRight(msg.trim(), 16);
  return AES.encrypt(plaintext, key, { mode: 'ECB' });
}

function generateChecksum(msg) {
  let c = 0;
  for (let i = 0; i < msg.length; i++) c ^= msg.charCodeAt(i);
  let hex = c.toString(16);
  while (hex.length < CHECKSUM_SIZE) hex = '0' + hex;
  return hex.slice(-CHECKSUM_SIZE);
}

// ---------- Envio LoRa ----------
function sendMessage(message) {
  const payload = generateChecksum(message) + message;            // checksum + mensagem
  const encrypted = encryptMessage(payload, aesKey);              // encripta
  Shelly.call('Lora.SendBytes',
    { id: 100, data: btoa(encrypted) },
    function (_, err_code, err_msg) {
      if (err_code !== 0) {
        print('Erro ao enviar LoRa:', err_code, err_msg);
      } else {
        print('Mensagem LoRa enviada com sucesso:', message);
      }
    }
  );
}

// ---------- Escuta o botão virtual (button:200) ----------
Shelly.addEventHandler(function (event) {
  if (
    event &&                                           // objecto válido
    event.component === 'button:200' &&                // é o nosso botão virtual
    event.info &&                                      // info presente
    event.info.event === 'single_push'                 // tipo de acção
  ) {
    print('Botão virtual 200 single_push – a enviar comando LoRa...');
    sendMessage('ABRIR_PORTAO_1');
  }
});