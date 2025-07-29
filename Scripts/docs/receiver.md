# Script Receiver

1. Espera por evento `lora`  
2. Desencripta com AES → verifica checksum  
3. Se mensagem = `ABRIR_PORTAO_1`, garante `switch:0` **OFF**  
4. Liga relé 1 s → desliga  
5. Fail‑safes: confirma estado após 500 ms, aborta se já estiver ON
