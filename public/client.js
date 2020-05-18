var socket = io.connect();

socket.on('mensaje', (data) => {
    console.log(data)
    render(data)
})

function render(data) {
    var html = data.map((elemento, index) => {
        htmlTemp = `
            <div> 
                <strong> ${elemento.author} : </strong> 
                <em> ${elemento.texto} </em>
            </div>
        `

        return (htmlTemp);
    }).join(" ");

    document.getElementById('mensaje').innerHTML = html;
}

function addMensaje(e) {
    var payload = {
        author: document.getElementById('user').value,
        texto: document.getElementById('texto').value
    }

    socket.emit('respuesta-cliente', payload);

    return false;
}