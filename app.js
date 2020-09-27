const salida = document.querySelector('#salida');
const microfono = document.querySelector('#microfono');

microfono.addEventListener('click', ejecutarSpeechAPI);

function ejecutarSpeechAPI() {
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.onstart = function() {
        salida.classList.add('mostrar');
        salida.textContent = 'Escuchando..';
    };

    recognition.onspeechend =  function() {
        salida.textContent = 'Se dejo de escuchar...';
        recognition.stop();
    }

    recognition.onresult = function(e) {
        console.log(e.results[0][0]);
        const {confidence, transcript} = e.results[0][0];

        const speech = document.createElement('p');
        speech.innerHTML = `Grabando: ${transcript}`;

        const seguridad = document.createElement('p');
        seguridad.innerHTML =`seguridad: ${parseInt( confidence * 100)}`;

        salida.appendChild(speech);
        salida.appendChild(seguridad);
    }
}

//Pausar video cuando ya no esta en pantalla y reproducir al ver-------------------------
/*
document.addEventListener('visibilitychange', () => {
    if(document.visibilityState === 'visible'){
        console.log('Ejecutar ver reproducir video');
    }else{
        console.log('Pausar el video');
    }
});*/

//pantalla completa---------------------------------------------------------

 const abrirBtn = document.querySelector('#abrir-pantalla-completa');
const salirBtn = document.querySelector('#salir-pantalla-completa');

abrirBtn.addEventListener('click',pantallaCompleta);
salirBtn.addEventListener('click',salirPantallaCompleta);

function pantallaCompleta() {
    document.documentElement.requestFullscreen();
}

function salirPantallaCompleta() {
    document.exitFullscreen();
}
 


const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click',() => {
    Notification
    .requestPermission()
    .then( resultado => {
        console.log('El resultado es ', resultado);
    })
});

const verNotificacion = document.querySelector('#verNotificacion');
verNotificacion.addEventListener('click', () => {
    if(Notification.permission === 'granted'){
        const notificacion = new Notification('Holi meh',{
            icon: 'img/gatos.png',
            body: 'notificacion meeh'
        });

        notificacion.onclick = function(){
            window.open('https://fb.com');
        }
    }
});



//si te quedas sin internet o con internet---------------------------------------
/*
window.addEventListener('online',actualizarEstado);
window.addEventListener('offline',actualizarEstado);
function actualizarEstado(){
    if(navigator.onLine) {
        console.log('Si estas Conectado');
    }else {
        console.log('No estas Conectado...');
    }
}*/