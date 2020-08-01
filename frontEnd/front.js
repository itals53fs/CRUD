
// Aqui iremos Fazer manipulacão da API DOM usando JavaScript puro. E Tambem fazer rotas
// de comunicação via Ajax.
(function () { // IIFE (função alto executavel) Como estamos no lado do cliente é recomendo usar essa estrutura, pois as variaveis
                    // dexam de ir para o scopo global. trabalharemos no escopo local para previnir de 
    function app() { // eventuais problemas.

        return {

            init: function init() { // inicia a função
                this.event();

            },

            event: function event() { // starta todos os eventos
                let $submit = document.querySelector('form[data-js="submit"]'); // pega o elemento do index.js
                $submit.addEventListener('submit', this.startPost, false); // adiciona uma lista de eventsos e passa uma função de calbak

                let $listar = document.querySelector('[data-js="listar"]');
                $listar.addEventListener('click', this.startGet, false);

                let $alterar = document.querySelector('[data-js="alterar"]');
                $alterar.addEventListener('submit', this.alterar, false);

                let $excluir = document.querySelector('[data-js="excluir"]');
                $excluir.addEventListener('submit', this.excluir, false);
                // this aqui faz referencia a app(), poderia dubstituir por ele.
            },

            excluir: function excluir(event){ // rota para excluir elemento, mandano para o backEnd
                //event.preventDefault();
                let $id = document.querySelector('[data-js="excluir-id" ]');
                let post = new XMLHttpRequest();

                post.open('POST', 'http://localhost:3000/excluirProduto')
                post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                post.send('id=' + $id.value);
            },

            alterar: function alterar(event){ // rota para alterar
                //event.preventDefault();
                let $id = document.querySelector('[data-js="id" ]');
                let $newValue = document.querySelector('[data-js="newValue"]');
                let post = new XMLHttpRequest();

                post.open('POST', 'http://localhost:3000/alterarProduto')
                post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                post.send('id=' + $id.value+ '&valor=' + $newValue.value);
            },
            startPost: function startPost(event) { // rota para criar um novo produto
                //event.preventDefault();
                let $nome = document.querySelector('[data-js="codigo"]');
                let $valor = document.querySelector('[data-js="valor"]');
                let post = new XMLHttpRequest();
                post.open('POST', 'http://localhost:3000/enviarProduto')
                post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                post.send('nome=' + $nome.value+ '&valor=' + $valor.value);
                


            },

            startGet: function startGet() { // aqui é uma rota para buscar o elemento do backEnd
                let get = new XMLHttpRequest();
                get.open('GET', 'http://localhost:3000/produto')
                get.send();

                get.addEventListener('readystatechange', app().isOK, false); 
                // o this dentro de um event faz referencia ao evento e não a app(), por isso usamos app() ao invés de this
            },
            isOK: function isOK() {
                if (this.status === 200 && this.readyState === 4) { // se o stado e e o status tiver ok 
                    let data = JSON.parse(this.responseText); // data recebe um objet já convertido de Json para JS
                   // this faz referencia a variavel ajax.
                    let $tablecar = document.querySelector('[data-js="table-Info"]');
                    let fragment = document.createDocumentFragment(); // criando um fragmento
                    
                    data.infor.forEach(element => { // percorendo todos elementos de data.infor, sendo data um obj que contem um array

                        let tr = document.createElement('tr') // criando uma coluna
                        let codigo = document.createElement('td'); // linha
                        let valor = document.createElement('td');
                        let id = document.createElement('td');

                        codigo.textContent = element.nome; // add os elementos de data.infor
                        valor.textContent = element.valor;
                        id.textContent = element.id



                        tr.appendChild(codigo);  // elementos firam filhos da coluna
                        tr.appendChild(id)
                        tr.appendChild(valor);


                        $tablecar.appendChild(fragment.appendChild(tr)); // tr vira filho do fragmento e ele vira filho de $tablecar
                    });
                }
                // tabela de resposta esta montada

            },
        }
    }
    app().init();
})();