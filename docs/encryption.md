# Encriptação & Payload

* **AES‑128/ECB** (biblioteca interna do Shelly)
* Payload = `<checksum(4 hex)> + <mensagem ASCII>`  
* Checksum = XOR de todos os bytes da mensagem  
* Chaves **diferentes** para transmitter e receiver (good practice)  
* Gerar nova chave: `openssl rand -hex 16` → 32 hex chars
