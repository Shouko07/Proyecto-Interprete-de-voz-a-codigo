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

function toggleConsole() {
    var mypre = document.getElementById("output");
    if (mypre.style.display !== 'none') {
        mypre.style.display = 'none';
    }
    else {
        mypre.style.display = 'block';
    }
    editor.resize()
}

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
let recognition;

function startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'es-MX';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = function () {
            console.log("Micrófono activado...");
        };

        recognition.onresult = function (event) {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {  // Solo tomar los resultados finales
                    const transcript = event.results[i][0].transcript;
                    const editor = ace.edit("editor");
                    editor.insert(transcript + ' '); 
                }
            }
        };
        
        recognition.onerror = function (event) {
            console.error("Error: ", event.error);
        };

        recognition.onend = function () {
            console.log("Micrófono desactivado...");
        };
    } else {
        alert('La Web Speech API no está soportada en este navegador.');
    }
}

function stopVoiceRecognition() {
    if (recognition) {
        recognition.stop();
    }
}
//Interprete
let codeRecognition;

function startCodeVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        codeRecognition = new webkitSpeechRecognition();
        codeRecognition.lang = 'es-MX';
        codeRecognition.interimResults = false; // Solo resultado final
        codeRecognition.maxAlternatives = 1;

        codeRecognition.onstart = function () {
            console.log("Modo código activado...");
        };

        codeRecognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log("Escuchado: ", transcript);
            const editor = ace.edit("editor");

            // Comandos de Python
            if (transcript.includes("imprime")) {
                editor.insert('print("Hola Mundo")\n');
            } else if (transcript.includes("ciclo for")) {
                editor.insert('for i in range(5):\n    print(i)\n');
            } else if (transcript.includes("ciclo while")) {
                editor.insert('while condicion:\n    print("Dentro del while")\n');
            } else if (transcript.includes("condicional if")) {
                editor.insert('if condicion:\n    print("Condición verdadera")\n');
            } else if (transcript.includes("condicional if else")) {
                editor.insert('if condicion:\n    print("Verdadero")\nelse:\n    print("Falso")\n');
            } else if (transcript.includes("función")) {
                editor.insert('def mi_funcion():\n    print("Función")\n');
            } else if (transcript.includes("lista")) {
                editor.insert('mi_lista = [1, 2, 3, 4, 5]\n');
            } else if (transcript.includes("tupla")) {
                editor.insert('mi_tupla = (1, 2, 3, 4, 5)\n');
            } else if (transcript.includes("clase")) {
                editor.insert('class MiClase:\n    def __init__(self, atributo):\n        self.atributo = atributo\n');
            } else if (transcript.includes("objeto")) {
                editor.insert('objeto = MiClase("Valor")\n');
            } else if (transcript.includes("importa")) {
                editor.insert('import numpy as np\n');
            } else if (transcript.includes("entrada")) {
                editor.insert('nombre = input("Ingrese su nombre: ")\n');
            } else if (transcript.includes("suma")) {
                editor.insert('resultado = 5 + 3\n');
            } else if (transcript.includes("resta")) {
                editor.insert('resultado = 10 - 4\n');
            } else if (transcript.includes("multiplicación")) {
                editor.insert('resultado = 6 * 7\n');
            } else if (transcript.includes("división")) {
                editor.insert('resultado = 8 / 2\n');
            } else if (transcript.includes("división entera")) {
                editor.insert('resultado = 9 // 2\n');
            } else if (transcript.includes("módulo")) {
                editor.insert('resultado = 10 % 3\n');
            } else if (transcript.includes("potencia")) {
                editor.insert('resultado = 2 ** 3\n');
            } else if (transcript.includes("convertir a entero")) {
                editor.insert('numero = int("42")\n');
            } else if (transcript.includes("convertir a flotante")) {
                editor.insert('numero = float("3.14")\n');
            } else if (transcript.includes("convertir a cadena")) {
                editor.insert('texto = str(100)\n');
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
            } else {
                editor.insert('# Comando no reconocido: ' + transcript + '\n');
            }
            
        };

        codeRecognition.onerror = function (event) {
            console.error("Error: ", event.error);
        };

        codeRecognition.onend = function () {
            console.log("Modo código desactivado...");
        };

        codeRecognition.start();
    } else {
        alert('La Web Speech API no está soportada en este navegador.');
    }
}

function stopCodeVoiceRecognition() {
    if (codeRecognition) {
        codeRecognition.stop();
    }
}
startVoiceRecognition();
startCodeVoiceRecognition();
document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.ctrlKey) {
        if (recognition && recognition.state !== "recording") {
            recognition.start();
        }
    }
    if (event.shiftKey && event.altKey) {
        if (codeRecognition && codeRecognition.state !== "recording") {
            codeRecognition.start();
        }
    }
});
document.addEventListener('keyup', (event) => {
    if (event.shiftKey && event.ctrlKey) {
        stopVoiceRecognition();
    }
    if (event.shiftKey && event.altKey) {
        stopCodeVoiceRecognition();
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