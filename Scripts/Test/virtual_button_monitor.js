// Logger de todos os eventos do botão virtual:200
Shelly.addEventHandler(function(ev){
  if(ev && ev.component==='button:200'){
    print('=== VIRTUAL BUTTON 200 ===');
    print('Evento :', ev.info.event);
    print('TS     :', ev.info.ts);
    print('Info   :', JSON.stringify(ev.info));
    print('===========================');
  }
});
