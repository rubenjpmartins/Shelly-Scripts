# Script Transmitter

* Cria‐se um **virtual button** (`button:200`)  
* Quando receber `single_push` → chama `sendMessage()`  
* `sendMessage()` faz: `checksum + AES.encrypt + Lora.SendBytes`  
* ID `100` = canal LoRa configurado de fábrica (pode mudar)

### Criar botão virtual
```bash
curl "http://IP_DO_TX/rpc/Virtual.Add?type=\"button\"&config={\"name\":\"Abrir\"}"
# devolve 200  ➜  usar button:200 nos scripts
```
