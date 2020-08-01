'use strict';
const express = require('express'); //frameWork do node
const cors = require('cors'); // quebar o problema de segurança
const bodyParser = require('body-parser'); // parciar os dados do corpo da requisição
const app = express();
const fs = require('fs');
let produto = { // registo dos produtos
    infor: []
};
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


app.get('/', function (req, resp) { // raiz teste do sevidor
    resp.send('<h1>ola</h1>');
})

app.get('/produto', function (req, resp) {
       
       // console.log(produto)
        return resp.json(produto); // resposta para o frnot
        
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
       //escreverEmDisco()
    } // se o arqivo nao exite é feito o registro
})

app.post('/alterarProduto', function(req, resp){
    let id = req.body.id;
    let valor = req.body.valor;
    produto.infor.forEach((item)=>{
        if(item.id === id){
            item.valor = valor;
        }
    })
    

}) // altera o produto

app.post('/excluirProduto', function(req, resp){
    let id = req.body.id;
    produto.infor.forEach((item, index)=>{
        if(item.id == id){
             produto.infor.splice(index, 1);
            //return resp.json('Excluido com sucesso!')
        }
    })
    //return resp.json('Produto não existe!')

}) // exclui
function escreverEmDisco(){
    fs.writeFile('produtosS.json', JSON.stringify(produto, null, 2))
}

function ler(){
   let produto1 = fs.readFileSync('produtosS.json')
   return JSON.parse(produto1)
}
//ler()
app.listen(3000); // porta