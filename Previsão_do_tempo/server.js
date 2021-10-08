const express = require('express');
const app = express();

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/src/index.html");
});

app.get("/style.css", function(req, res) {
    res.sendFile(__dirname + "/src/style.css");
});

app.get("/css/nav.css", function(req, res) {
    res.sendFile(__dirname + "/src/css/nav.css");
});

app.get("/css/main.css", function(req, res) {
    res.sendFile(__dirname + "/src/css/main.css");
});

app.get("/css/footer.css", function(req, res) {
    res.sendFile(__dirname + "/src/css/footer.css");
})

app.get("/script.js", function(req, res) {
    res.sendFile(__dirname + "/src/script.js");
});

/* const server = http.createServer(function(req, res){
    res.end(contents);
}) */
app.listen(8080, '192.168.1.7', () => {
    console.log('Servidor de pé em: http://192.168.1.7:8080');
    console.log('Pra desligar o nosso servidor: ctrl + c');
});
