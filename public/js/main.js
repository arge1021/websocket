const socket = io();


socket.on('regenerarProductos', (productos) => {
    
    fetch('http://localhost:8080/template/tableProducts.tpl')
    .then(res => res.text())
    .then(data => {
        let template = Handlebars.compile(data);
        let html = template({productos});
        document.getElementById('tablaProductos').innerHTML = html;
    });
    //Cree este emit para poder regenerar la tabla de productos desde otro navegador
    socket.emit('finish-productos');
});

socket.on('regenerarChat', (chat) => {

    fetch('http://localhost:8080/template/listMessages.tpl')
    .then(res => res.text())
    .then(data => {
        let template = Handlebars.compile(data);
        let html = template({chat});
        document.getElementById('listaMensajes').innerHTML = html;
    });
    //Cree este emit para poder regenerar el chat cuando entro desde otro navegador, no se si esta bien
    socket.emit('finish-chat');
});

document.getElementById('btnGuardarMensaje').addEventListener('click', (e) => {
    e.preventDefault();
    
    const mensaje = document.getElementById('inpMensaje').value;
    const email = document.getElementById('inpEmail').value;
    const date = getFormatDate();
    const data = {
        email,
        message: mensaje,
        date
    };
    socket.emit('incomingMessage', data);
    document.getElementById('inpMensaje').value = '';
    document.getElementById('inpMensaje').focus();
});

const getFormatDate = () => {
    const dateFull = new Date();
    const date = dateFull.getDate() + '-' + (dateFull.getMonth() + 1) + '-' +  dateFull.getFullYear()
                + ' ' + dateFull.getHours() + ':' + dateFull.getMinutes() + ':' + dateFull.getSeconds();
    return date;
}

