//Codigo proporcionado por skulpt
function outf(text) {
    var mypre = document.getElementById("output");
    mypre.value = mypre.value + text;
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

//Codigo proporcionado por skulpt pero modificado para el uso de Python 3,
function run() {
    var t0 = (new Date()).getTime()
    var prog = editor.getValue();
    var mypre = document.getElementById("output");
    mypre.value = '';
    Sk.pre = "output";
    Sk.configure({
        inputfun: function (prompt) {
            return window.prompt(prompt);
        },
        inputfunTakesPrompt: true,
        output: outf,
        read: builtinRead,
        __future__: Sk.python3
    });
    var myPromise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function () {
        var t1 = (new Date()).getTime()
        mypre.value = mypre.value + "\n" + "<completed in " + (t1 - t0) + " ms>";
    },
        function (err) {
            mypre.value = mypre.value + err.toString() + "\n";
            var t1 = (new Date()).getTime()
            mypre.value = mypre.value + "\n" + "<completed in " + (t1 - t0) + " ms>";
        });
};

function main() {
    run();
    var mypre = document.getElementById("output");
    mypre.style.display = 'block';
    editor.resize()
}

function openFile() {
    var files = input.files;
    if (files.length == 0) return;

    var file = files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
        var file = e.target.result;
        var lines = file.split(/\r\n|\n/);
        editor.setValue(lines.join('\n'));
    };

    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
};

function saveCode() {
    localStorage['saveKey'] = editor.getValue();
    window.alert("¡Codigo guardado!")
}

function downloadCode() {
    var prog = editor.getValue();
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(prog);
    hiddenElement.download = 'download.py';
    if (confirm('¿Descargar codigo?')) {
        hiddenElement.click();
    }
}
function mostrarComandos() {
    alert(`¡Bienvenido! Aquí están los comandos disponibles:
  
  - Ctrl + Shift: Activar reconocimiento de voz para dictado de texto.
  - Shift + Alt: Activar reconocimiento de comandos.
  
  ℹ️ Para más información sobre los comandos por voz, consulta la lista en el pie de página.`);
  }
  
//Codigo para cambiar el color de oscuro a claro
function Color() {
    const html = document.documentElement;
    const newTheme = html.getAttribute("data-bs-theme") === "light" ? "dark" : "light";
    html.setAttribute("data-bs-theme", newTheme);
    
    const button = document.querySelector(".nav-link[onclick='Color()']");
    if (button) {
        button.classList.toggle("btn-light");
        button.classList.toggle("btn-dark");
    
        // Cambiar el contenido del botón usando los SVGs
        button.innerHTML = newTheme === "dark" 
            ? `<svg fill="#FFF" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3C11 2.44772 11.4477 2 12 2Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L17.7071 7.70711C17.3166 8.09763 16.6834 8.09763 16.2929 7.70711C15.9024 7.31658 15.9024 6.68342 16.2929 6.29289L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18 12C18 11.4477 18.4477 11 19 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H19C18.4477 13 18 12.5523 18 12Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C12.5523 18 13 18.4477 13 19V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19C11 18.4477 11.4477 18 12 18Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.70711 16.2929C8.09763 16.6834 8.09763 17.3166 7.70711 17.7071L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L6.29289 16.2929C6.68342 15.9024 7.31658 15.9024 7.70711 16.2929Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 11.4477 2.44772 11 3 11H5C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13H3C2.44772 13 2 12.5523 2 12Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"></path>
</svg>
`
            : `<svg fill="#000" width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                 <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>
               </svg>`;
    }
    
    const div = document.getElementById("output");
    if (div) {
        div.style.backgroundColor = newTheme === "dark" ? "#1C1C1C" : "#f9f9f9";
    }
    editor.setTheme(newTheme === "dark" ? "ace/theme/merbivore_soft" : "ace/theme/dawn");
    const img = document.getElementById("themeImage");
    if (img) {
    img.src = newTheme === "dark" ? "assets/img/Blanco.png" : "assets/img/Negro.png";
    }
}
//Literal
// Variables de control
let recognition = null;
let isListening = false;
let keysPressed = {};

// Elemento visual
const micStatus = document.getElementById("mic-status");

function initializeRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Tu navegador no soporta reconocimiento de voz.');
    return null;
  }

  const recog = new webkitSpeechRecognition();
  recog.lang = 'es-MX';
  recog.interimResults = true;
  recog.maxAlternatives = 1;

  recog.onstart = () => {
    isListening = true;
    micStatus.style.display = 'block';
    console.log("🎤 Reconocimiento iniciado...");
  };

  recog.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        const transcript = event.results[i][0].transcript;
        editor.insert(transcript + ' ');
      }
    }
  };

  recog.onerror = (event) => {
    console.error("❌ Error: ", event.error);
  };

  recog.onend = () => {
    isListening = false;
    micStatus.style.display = 'none';
    console.log("🎤 Reconocimiento detenido.");
  };

  return recog;
}

function startRecognition() {
  if (!isListening) {
    recognition = initializeRecognition();
    if (recognition) recognition.start();
  }
}

function stopRecognition() {
  if (recognition && isListening) {
    recognition.stop();
  }
}
//Interprete
let codeRecognition = null;
let isCodeListening = false;
let codeKeysPressed = {};

const codeStatus = document.getElementById("code-status");

function initializeCodeRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Tu navegador no soporta reconocimiento de voz.');
        return null;
    }

    const recog = new webkitSpeechRecognition();
    recog.lang = 'es-MX';
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    recog.onstart = () => {
        isCodeListening = true;
        codeStatus.style.display = 'block';
        console.log("🧠 Modo código activado...");
    };

    recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const editor = ace.edit("editor");
        console.log("Comando reconocido: ", transcript);

        // Instrucciones por voz mapeadas a código
        const comandos = [
            { palabras: ["imprime"], codigo: 'print("Hola Mundo")\n' },
            { palabras: ["ciclo for"], codigo: 'for i in range(5):\n    ' },
            { palabras: ["ciclo while"], codigo: 'while condicion:\n    ' },
            { palabras: ["condicional if else"], codigo: 'if condicion:\n    nelse:\n ' },
            { palabras: ["condicional if"], codigo: 'if condicion:\n ' },
            { palabras: ["función"], codigo: 'def mi_funcion():\n ' },
            { palabras: ["lista"], codigo: 'mi_lista = [1, 2, 3, 4, 5]\n' },
            { palabras: ["tupla"], codigo: 'mi_tupla = (1, 2, 3, 4, 5)\n' },
            { palabras: ["clase"], codigo: 'class MiClase:\n' },
            { palabras: ["objeto"], codigo: 'objeto = MiClase("Valor")\n' },
            { palabras: ["importa"], codigo: 'import numpy as np\n' },
            { palabras: ["entrada"], codigo: 'nombre = input("Ingrese su nombre: ")\n' },
            { palabras: ["suma"], codigo: 'resultado = 5 + 3\n' },
            { palabras: ["resta"], codigo: 'resultado = 10 - 4\n' },
            { palabras: ["multiplicación"], codigo: 'resultado = 6 * 7\n' },
            { palabras: ["división entera"], codigo: 'resultado = 9 // 2\n' },
            { palabras: ["división"], codigo: 'resultado = 8 / 2\n' },
            { palabras: ["módulo"], codigo: 'resultado = 10 % 3\n' },
            { palabras: ["potencia"], codigo: 'resultado = 2 ** 3\n' },
            { palabras: ["convertir a entero"], codigo: 'numero = int("42")\n' },
            { palabras: ["convertir a flotante"], codigo: 'numero = float("3.14")\n' },
            { palabras: ["convertir a cadena"], codigo: 'texto = str(100)\n' },
        ];

        const comando = comandos.find(c => c.palabras.some(p => transcript.includes(p)));

        if (comando) {
            editor.insert(comando.codigo);
        } else if (transcript.includes("ejecutar")) {
            main();
        } else if (transcript.includes("abrir")) {
            document.querySelector('input').click();
        } else if (transcript.includes("guardar")) {
            saveCode();
        } else if (transcript.includes("descarga")) {
            downloadCode();
        } else if (transcript.includes("tema")) {
            Color();
        } else if (transcript.includes("borrar")) {
            const range = editor.getSelectionRange();
            if (!range.isEmpty()) {
                editor.session.remove(range);
            } else {
                editor.insert('# No hay texto seleccionado para borrar\n');
            }
        }else if (transcript.includes("enter")) {
            editor.insert('\n');
        }else if (/(\d+)\s+tabulaciones?/.test(transcript)) {
            const match = transcript.match(/(\d+)\s+tabs?/);
            const count = parseInt(match[1]);
            const tabs = '\t'.repeat(count); // o usa '    '.repeat(count) si prefieres espacios
            editor.insert(tabs);
        }else if (/(\d+)\s+espacios?/.test(transcript)) {
            const match = transcript.match(/(\d+)\s+espacios?/);
            const count = parseInt(match[1]);
            const espacios = ' '.repeat(count);
            editor.insert(espacios);
        }else if (transcript.startsWith("comentario")) {
            let contenido = transcript.replace("comentario", "").trim();
        
            // Eliminar signos de puntuación comunes al inicio/final
            contenido = contenido.replace(/^[.,;:'"!?¿¡()\[\]{}<>]+/, ''); // al inicio
            contenido = contenido.replace(/[.,;:'"!?¿¡()\[\]{}<>]+$/, ''); // al final
        
            if (contenido.length > 0) {
                editor.insert('# ' + contenido + '\n');
            } else {
                editor.insert('# Comentario vacío\n');
            }
        }else if (transcript.includes("tabulación")) {
            editor.insert("\t");
        }else if (transcript.startsWith("variable")) {
            let contenido = transcript.replace("variable", "").trim();
        
            // 1. Eliminar puntuación (como punto final)
            contenido = contenido.replace(/[.,;:'"!?¿¡()\[\]{}<>]/g, '');
        
            // 2. Eliminar acentos
            contenido = contenido.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
            // 3. Convertir a snake_case (espacios a guiones bajos)
            contenido = contenido.toLowerCase().replace(/\s+/g, "_");
        
            // 4. Insertar como variable válida
            if (contenido.length > 0) {
                editor.insert(contenido);
            } else {
                editor.insert('# Nombre de variable no detectado\n');
            }
        }else if (transcript.includes("copiar")) {
            const selectedText = editor.getSelectedText();
            if (selectedText) {
                navigator.clipboard.writeText(selectedText)
                    .then(() => alert("Texto copiado al portapapeles"))
                    .catch(err => alert("Error al copiar: " + err));
            } else {
                alert("No hay texto seleccionado para copiar");
            }
        
        } else if (transcript.includes("cortar")) {
            const selectedText = editor.getSelectedText();
            if (selectedText) {
                navigator.clipboard.writeText(selectedText)
                    .then(() => {
                        editor.session.replace(editor.getSelectionRange(), ""); // Borra el texto
                        alert("Texto cortado al portapapeles");
                    })
                    .catch(err => alert("Error al cortar: " + err));
            } else {
                alert("No hay texto seleccionado para cortar");
            }
        
        } else if (transcript.includes("pegar")) {
            navigator.clipboard.readText()
                .then(text => {
                    editor.insert(text);
                })
                .catch(err => alert("Error al pegar: " + err));
        }else if (transcript.startsWith("número")) {
            let valor = transcript.replace("número", "").trim().toLowerCase();
        
            // Normalizar tildes (por si dice "diez", "cuatro", "tres", etc.)
            valor = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // elimina acentos
        
            // Diccionario simple
            const mapaNumeros = {
                "cero.": 0,
                "uno.": 1,
                "dos.": 2,
                "tres.": 3,
                "cuatro.": 4,
                "cinco.": 5,
                "seis.": 6,
                "siete.": 7,
                "ocho.": 8,
                "nueve.": 9,
                "diez.": 10
            };
        
            // Intenta encontrarlo como palabra
            if (mapaNumeros.hasOwnProperty(valor)) {
                editor.insert(mapaNumeros[valor].toString());
            }
            // O si viene como número directamente (e.g. "11", "23")
            else if (!isNaN(Number(valor))) {
                editor.insert(Number(valor).toString());
            }
            else {
                alert("No se reconoció un número válido: " + valor);
            }
        }
        
        else {
            // Diccionario de símbolos por voz
            const simbolos = {
                "igual": "=",
                "más": "+",
                "menos": "-",
                "por": "*",
                "diagonal": "/",
                "doble puntos": ":",
                "punto y coma": ";",
                "coma": ",",
                "punto": ".",
                "comilla doble": '"',
                "comilla simple": "'",
                "mayor que": ">",
                "menor que": "<",
                "interrogación": "?",
                "admiración": "!",
                "paréntesis": "("            
            };
        
            // Buscar coincidencia exacta
            const simbolo = Object.keys(simbolos).find(key => transcript.includes(key));
            if (simbolo) {
                editor.insert(simbolos[simbolo]);
            } else {
                alert('Comando no reconocido: ' + transcript);
            }
        }
    };

    recog.onerror = (event) => {
        console.error("❌ Error (modo código): ", event.error);
    };

    recog.onend = () => {
        isCodeListening = false;
        codeStatus.style.display = 'none';
        console.log("🧠 Modo código desactivado.");
    };

    return recog;
}

function startCodeRecognition() {
    if (!isCodeListening) {
        codeRecognition = initializeCodeRecognition();
        if (codeRecognition) codeRecognition.start();
    }
}

function stopCodeRecognition() {
    if (codeRecognition && isCodeListening) {
        codeRecognition.stop();
    }
}
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;

    if (keysPressed['Control'] && keysPressed['Shift'] && !isListening) {
      startRecognition();
    }
    if (event.shiftKey && event.altKey && !isCodeListening) {
        startCodeRecognition();
    }
});
document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;

    if (!event.ctrlKey || !event.shiftKey) {
      stopRecognition();
    }
    if (!event.shiftKey || !event.altKey) {
        stopCodeRecognition();
    }
});
var editor = ace.edit("editor");
editor.setTheme("ace/theme/merbivore_soft");
editor.session.setMode("ace/mode/python");
editor.setShowPrintMargin(false);
editor.commands.removeCommand('findprevious');
editor.commands.removeCommand('duplicateSelection');
editor.commands.removeCommand('replaymacro');
ace.require("ace/ext/language_tools");
editor.setOptions({
    fontFamily: "Source Code Pro",
    fontSize: "18px",
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    autoScrollEditorIntoView: true,
});