'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let fs = require('fs');
const app = express();

let produto = {
    infor: []
};


app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


app.get('/', function (req, resp) {
    resp.send('<h1>ola</h1>');
})

app.get('/produto', function (req, resp) {
        //salvarEmDisco()
        return resp.json(produto);
        
})

app.post('/enviarProduto', function(req, resp){
    let nome = req.body.nome;
    let valor = req.body.valor;
    let boll = true;
    produto.infor.forEach(e=>{
        if(e.nome === nome){
        boll = false;
        }
    })
    if(boll){
        produto.infor.push(
            {id :  nome.slice(0,1) + produto.infor.length,  nome:nome, valor:valor}

        )
        
    }
    //salvarEmDisco()
})
app.post('/alterarProduto', function(req, resp){
    let id = req.body.id;
    let valor = req.body.valor;
    produto.infor.forEach((item)=>{
        if(item.id === id){
            item.valor = valor;
        }
    })
    

})

app.post('/excluirProduto', function(req, resp){
    let id = req.body.id;
    produto.infor.forEach((item, index)=>{
        if(item.id == id){
             produto.infor.splice(index, 1);
            
        }
    })


})

/*const salvarEmDisco = ()=>{
    fs.writeFile('produto.json', JSON.stringify(produto, null, 2))

}*/


app.listen(3000);