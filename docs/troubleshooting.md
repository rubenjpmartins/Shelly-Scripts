# Troubleshooting

| Sintoma | Possível causa | Solução |
|---------|----------------|---------|
| **LoRa invalid** no log | Chave errada ou payload truncado | Verifique `aesKey` e integridade da antena |
| Relé não desliga | Falha no comando OFF | Aumentar `Timer` ou ver supply ao relé |
| Nada acontece ao premir botão virtual | ID errado ou script não corrido | Reboot, confirmar `button:200` e logs |
| Erro `Lora.SendBytes` | ID não existente | Ajuste `id` ou ative LoRa no firmware |
