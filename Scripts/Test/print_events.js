// Este script irá imprimir no log todos os eventos que ocorrem no dispositivo

Shelly.addEventHandler(function (event) {
  print("==== Novo Evento ====");
  print("Nome do evento:", event.name);
  print("Componente:", event.component);
  print("Informação adicional:", JSON.stringify(event.info));
  print("=====================");
});