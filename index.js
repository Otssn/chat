const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

let usuario = require('./metodos');
let prueba = 0;

const token = '2017344686:AAHYoUa9lailpir-wFddhbNcAFVd-le4YYE';
const bot = new TelegramBot(token, {polling: true});

var NodeWebcam = require( "node-webcam" );

var opts = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "location",
  verbose: false
};

var Webcam = NodeWebcam.create( opts );

var SerialPort = require('serialport');
const { Console } = require('console');
const { parsers } = require('serialport');
const { serialize } = require('v8');
var port = new SerialPort('COM3',{
   baudRate: 9600,
   autoOpen: true
});
var archivo = "./usuario.txt";

fs.access(archivo, fs.constants.F_OK, (err)=>{
  if(err){
    usuario.crearArchivo(archivo);
  }
});

const parser = new SerialPort.parsers.Readline();
port.pipe(parser);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  var mensaje = msg.text;
  mensaje = mensaje.toLocaleLowerCase();
  var msgSplit = "";
  if(usuario.lecturaArchivo(chatId.toString(),archivo)){
    msgSplit = mensaje.split(" ");
    var resp = "";
    switch (msgSplit[0]){
      case "💡💡":
          port.write("ELL");
          bot.sendMessage(chatId,"Hecho")
      break;
      case "🔌🔌":
          port.write("ALL");
          bot.sendMessage(chatId,"Hecho")
      break;
      case "🔓":
          port.write("Abrir");
          bot.sendMessage(chatId,"Hecho")
      break;
      case "abrir":
          port.write("Abrir");
          bot.sendMessage(chatId,"Hecho")
      break;
      case "🔒":
          port.write("Cerrar");
          bot.sendMessage(chatId,"Hecho")
      break;
      case "cerrar":
          port.write("Cerrar");
          bot.sendMessage(chatId,"Hecho")
      break;
      case "💡":
        resp = usuario.encenderLed(msgSplit);
        if(resp == "error"){
          bot.sendMessage(chatId, 'Lo siento, esa funcion no la tengo');
        }else{
          port.write(resp);
          bot.sendMessage(chatId,"Hecho")
        }
      break;
      case "enciende":
        resp = usuario.encenderLed(msgSplit);
        if(resp == "error"){
          bot.sendMessage(chatId, 'Lo siento, esa funcion no la tengo');
        }else{
          port.write(resp);
          bot.sendMessage(chatId,"Hecho")
        }
      break;
      case "encender":
        resp = usuario.encenderLed(msgSplit);
        if(resp == "error"){
          bot.sendMessage(chatId, 'Lo siento, esa funcion no la tengo');
        }else{
          port.write(resp);
          bot.sendMessage(chatId,"Hecho")
        }
      break;
      case "apaga":
        resp = usuario.apagarLed(msgSplit);
        if(resp == "error"){
          bot.sendMessage(chatId, 'Lo siento, esa funcion no la tengo');
        }else{
          port.write(resp);
          bot.sendMessage(chatId,"Hecho")
        }
      break;
      case "apagar":
        resp = usuario.apagarLed(msgSplit);
        if(resp == "error"){
          bot.sendMessage(chatId, 'Lo siento, esa funcion no la tengo');
        }else{
          port.write(resp);
          bot.sendMessage(chatId,"Hecho")
        }
      break;
      case "🔌":
        resp = usuario.apagarLed(msgSplit);
        if(resp == "error"){
          bot.sendMessage(chatId, 'Lo siento, esa funcion no la tengo');
        }else{
          port.write(resp);
          bot.sendMessage(chatId,"Hecho")
        }
      break;
      case "ayuda":
        bot.sendMessage(chatId, 'Hola, soy el bot encargado de esta casa.\nTe voy a indicar que funciones puedo hacer\n1. Encender luces:\n-Si deseas encender todas las luces puedes digitar:\n  Enciende todo\n   Encender todo\n   💡💡\n-Si desea uncender una o varias luces primero debe escribir "Enciende" o "Encender" o "💡" seguido de un espacio y la luz o luces a encender, en estos momentos puede encender las siguientes luces\n   Sala\n  Cocina\n  Estudio\n  Habitacion\n2. Apagar luces:\n-Si deseas apagar todas las luces puedes digitar:\n  Apaga todo\n   Apagar todo\n   🔌🔌\n-Si desea apagar una o varias luces primero debe escribir "Apaga" o "Apagar" o "🔌" seguido de un espacio y la luz o luces a apagar, en estos momentos puede encender las siguientes luces\n   Sala\n  Cocina\n  Estudio\n  Habitacion\n3. Abrir caja de seguridad\nPara abrir la caja simplemente digite la palabra "Abrir" o "🔓"\n4. Cerrar caja de seguridad\nPara cerrar la caja simplemente digite la palabra "Cerrar" o "🔒"\n');
      break;
      case "si":
        if(prueba != 0 && usuario.lecturaArchivo(chatId.toString(),archivo)){
          bot.sendMessage(usuario.buscarArchivo(archivo),"Acerca la tardeja de seguridad al lector para poder continuar");
        }else{
          bot.sendMessage(chatId, 'Lo siento, esa funcion no la tengo');Eso 
        }
      break;
      case "no":
        if(prueba != 0 && usuario.lecturaArchivo(chatId.toString(),archivo)){
          bot.sendMessage(prueba, 'Lo siento no puedo aceptar tu solicitud');
        }else{
          bot.sendMessage(chatId, 'Lo siento, esa funcion no la tengo');
        }
      break;
      default:
        bot.sendMessage(chatId, 'Lo siento, esa funcion no la tengo');
      break;
    }
  }else if(mensaje == "registrar"){
      bot.sendMessage(usuario.buscarArchivo(archivo),"Un nuevo usuario quiere ser registrado\n" + msg.chat.first_name);
      prueba = msg.chat.id;
  }else{
    bot.sendMessage(chatId, 'Lo siento no puedo aceptar tu solicitud');
  }
});
parser.on('data',function(data){
  console.log(data);
  if(data == 'btn'){
    Webcam.capture("foto", function( err, data ) {
      var linea = usuario.leerArchivo(archivo);
      linea.forEach(element => {
        bot.sendPhoto(element,"foto.jpg", {
          caption: "🛎🛎🛎🛎🛎🛎🛎🛎"
        });
      });
    });
    
  }
});
parser.on('data',function(data){
  var t = data.substring(-1,11);
  if(prueba != 0){
    if(t.toString() == "51 7B 03 1D"){
      usuario.escribirArchivo(prueba,archivo);
      bot.sendMessage(usuario.buscarArchivo(archivo),"Usuario aceptado");
      bot.sendMessage(prueba, 'Hola, soy el bot encargado de esta casa.\nTe voy a indicar que funciones puedo hacer\n1. Encender luces:\n-Si deseas encender todas las luces puedes digitar:\n  Enciende todo\n   Encender todo\n   💡💡\n-Si desea uncender una o varias luces primero debe escribir "Enciende" o "Encender" o "💡" seguido de un espacio y la luz o luces a encender, en estos momentos puede encender las siguientes luces\n   Sala\n  Cocina\n  Estudio\n  Habitacion\n2. Apagar luces:\n-Si deseas apagar todas las luces puedes digitar:\n  Apaga todo\n   Apagar todo\n   🔌🔌\n-Si desea apagar una o varias luces primero debe escribir "Apaga" o "Apagar" o "🔌" seguido de un espacio y la luz o luces a apagar, en estos momentos puede encender las siguientes luces\n   Sala\n  Cocina\n Estudio\n   Habitacion\n3. Abrir caja de seguridad\nPara abrir la caja simplemente digite la palabra "Abrir" o "🔓"\n4. Cerrar caja de seguridad\nPara cerrar la caja simplemente digite la palabra "Cerrar" o "🔒"\n');
      prueba = 0;
    }else if(data == 'btn'){
    }else{
      bot.sendMessage(prueba, 'Lo siento no puedo aceptar tu solicitud');
    }
  }
});