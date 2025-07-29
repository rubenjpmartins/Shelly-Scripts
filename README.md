# Shelly LoRa Gate Control

Automação de abertura de portão com dois dispositivos **Shelly Gen 2**

* **Transmitter** – envia um comando LoRa (“ABRIR_PORTAO_1”) quando o botão virtual `button:200` recebe um `single_push`.
* **Receiver** – valida AES + checksum, confirma que o relé está OFF, depois liga‑o 1 s e desliga novamente.
* **Logger** – script opcional para debugar os eventos do botão virtual.

> Todos os scripts são JavaScript MJS (nativos dos Shelly Plus/Pro)  
> Firmware mínimo recomendado : **1.1.0‑beta3**

## Como usar

1. Flash/actualiza ambos os Shelly para a mesma versão Gen 2.
2. Siga **docs/hardware_setup.md** para cablagem e IDs.
3. No transmissor:
   - Crie o botão virtual (ID 200) ou use o Shelly App.
   - Carregue `scripts/transmitter_script.js`.
4. No receptor:
   - Carregue `scripts/receiver_script.js`.
5. Prima o botão virtual no transmissor → o portão deve abrir!

Mais detalhes em cada ficheiro dentro de **/docs**.



Para adicionar um botao virtual é necessário fazer primeiro um grupo e só depois é que da para ter o botão virtual

Based on https://github.com/ALLTERCO/shelly-script-examples