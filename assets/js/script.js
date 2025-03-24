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
// el uso de ace-builds y que se imprima el tiempo de ejecucion.
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

function shareCode() {
    var link = window.location.href.split('?')[0] + "?code=" + encodeURIComponent(editor.getValue());
    window.prompt("Copy link to clipboard: Ctrl+C, Enter", link);
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
        button.textContent = newTheme === "dark" ? "☀️" : "🌙";
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
//Literal
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

            // Aquí las palabras clave y sus códigos
            if (transcript.includes("imprime")) {
                editor.insert('print("Hola Mundo")\n');
            } else if (transcript.includes("ciclo for")) {
                editor.insert('for i in range(5):\n    print(i)\n');
            } else if (transcript.includes("condicional if")) {
                editor.insert('if condicion:\n    print("Condición verdadera")\n');
            } else if (transcript.includes("función")) {
                editor.insert('def mi_funcion():\n    print("Hola desde la función")\n');
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
//Interprete
function kbShortcuts() {
    window.alert("Run : Ctrl+Enter\nOpen : Ctrl+Shift+O\nConsole : Ctrl+Shift+E\nSave : Ctrl+Shift+S\nDownload : Ctrl+Shift+D\nShare : Ctrl+Shift+A\nKeyboard : Ctrl+Shift+K\nSettings : Ctrl+,")
}

function aceSettings() {
    editor.execCommand("showSettingsMenu")
}

function resPanel() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
startVoiceRecognition();
startCodeVoiceRecognition();
document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key == "O") {
        if (recognition && recognition.state !== "recording") {
            recognition.start();
        }
    }
    if (event.shiftKey && event.key == "U") {
        if (codeRecognition && codeRecognition.state !== "recording") {
            codeRecognition.start();
        }
    }
    if (event.ctrlKey && event.key == "Enter") {
        event.preventDefault();
        main();
    }

    if (event.ctrlKey && event.shiftKey && event.key == "O") {
    }

    if (event.ctrlKey && event.shiftKey && event.key == "E") {
        event.preventDefault();
        toggleConsole();
    }

    if (event.ctrlKey && event.shiftKey && event.key == "S") {
        event.preventDefault();
        saveCode();
    }

    if (event.ctrlKey && event.shiftKey && event.key == "D") {
        event.preventDefault();
        downloadCode();
    }

    if (event.ctrlKey && event.shiftKey && event.key == "A") {
        event.preventDefault();
        shareCode();
    }

    if (event.ctrlKey && event.shiftKey && event.key == "K") {
        event.preventDefault();
        kbShortcuts();
    }

});
document.addEventListener('keyup', (event) => {
    if (event.shiftKey && event.key == "O") {
        stopVoiceRecognition();
    }
    if (event.shiftKey && event.key == "U") {
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

var savedCode = localStorage['saveKey'] || 'defaultValue';

if (savedCode != "defaultValue") {
    editor.setValue(savedCode);
}

var params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

if (params.code != null) {
    editor.setValue(params.code);
};

var input = document.querySelector('input')
input.addEventListener('change', () => {
    openFile();
});

window.addEventListener('beforeunload', function (event) {
    event.preventDefault();
    event.returnValue = '';
});

