const { prototype } = require('events');
const fs = require('fs');
const { exit } = require('process');
const { stringify } = require('querystring');


module.exports = {
    crearArchivo: (archivo)=> {
        fs.appendFile(archivo, "1070381780" + " 0",(err)=>{
            if(err) throw('F');
        });
    },
    lecturaArchivo: (id,archivo)=> {
        var sw = false;
        var lineas = fs.readFileSync(archivo,'utf-8');
        var linea = lineas.split("\n");
        linea.forEach(element => {
            var linea2 = element.split(" ");
            if(linea2[0] == (id)){
                sw = true;
            }
        });
        return sw;
    },
    leerArchivo: (archivo)=> {
        var sw = false;
        var lineas = fs.readFileSync(archivo,'utf-8');
        var linea = lineas.split("\n");
        var linaux;
        var lin = [];
        linea.forEach(element => {
            linaux = element.split(" ");
            lin.push(linaux[0]);
        });
        return lin;
    },
    buscarArchivo: (archivo)=> {
        var sw = 0;
        var lineas = fs.readFileSync(archivo,'utf-8');
        var linea = lineas.split("\n");
        linea.forEach(element => {
            var linea2 = element.split(" ");
            if(linea2[1] == 0){
                sw = linea2[0];
            }
        });
        return sw;
    },
    escribirArchivo: (id,archivo)=> {
        fs.appendFile(archivo, "\n" + id + " 1",(err)=>{
            if(err) throw('F');
        });
    },
    encenderLed: (msgSplit) =>{
        var mensaje = "";
        var sw = 0;
        for(let i = 1; i<msgSplit.length; i++){
            switch (msgSplit[i]){
                case "todas" :
                    mensaje = "ELL";
                    sw++;
                break;
                case "todo" :
                    mensaje = "ELL";
                    sw++;
                break;
                case "sala" :
                    mensaje = mensaje + "EL1\n";
                    sw++;
                break;
                case "cocina" :
                    mensaje = mensaje + "EL2\n";
                    sw++;
                break;
                case "estudio" :
                    mensaje = mensaje + "EL3\n";
                    sw++;
                break;
                case "habitacion" :
                    mensaje = mensaje + "EL4\n";
                    sw++;
                break;
                case "habitación" :
                    mensaje = mensaje + "EL4\n";
                    sw++;
                break;
                default :
                break;
            }
        }
        if(sw == 0){
            return "error";
        }
        return mensaje;
    },
    apagarLed: (msgSplit) =>{
        var mensaje = "";
        var sw = 0;
        for(let i = 1; i<msgSplit.length; i++){
            switch (msgSplit[i]){
                case "todas" :
                    mensaje = "ALL";
                    sw++;
                break;
                case "todo" :
                    mensaje = "ALL";
                    sw++;
                break;
                case "sala" :
                    mensaje = mensaje + "AL1\n";
                    sw++;
                break;
                case "cocina" :
                    mensaje = mensaje + "AL2\n";
                    sw++;
                break;
                case "estudio" :
                    mensaje = mensaje + "AL3\n";
                    sw++;
                break;
                case "habitacion" :
                    mensaje = mensaje + "AL4\n";
                    sw++;
                break;
                case "habitación" :
                    mensaje = mensaje + "AL4\n";
                    sw++;
                break;
                default :
                break;
            }
        }
        if(sw == 0){
            return "error";
        }
        return mensaje;
    }
}