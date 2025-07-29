# Hardware & Ligações

| Dispositivo | Função | Ligações físicas |
|-------------|--------|------------------|
| **Shelly Plus/Pro A** | *Transmitter* | Botão virtual (no firmware); sem cabos externos |
| **Shelly Plus/Pro B** | *Receiver*    | Relé 0 → contactos do automatismo do portão |

* Ambos na mesma rede Wi‑Fi 2.4 GHz  
* LoRa ID **100** usado por convenção (pode alterar em `Lora.SendBytes`)  
* Certifique‑se de que o relé 0 do Receiver está em modo **“pulse”** ou “momentary” (se necessário)  
