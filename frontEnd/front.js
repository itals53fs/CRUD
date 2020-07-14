

(function () {

    function app() {

        return {

            init: function init() {
                this.event();

            },

            event: function event() {
                let $submit = document.querySelector('form[data-js="submit"]');
                $submit.addEventListener('submit', this.startPost, false);

                let $listar = document.querySelector('[data-js="listar"]');
                $listar.addEventListener('click', this.startGet, false);

                let $alterar = document.querySelector('[data-js="alterar"]');
                $alterar.addEventListener('submit', this.alterar, false);

                let $excluir = document.querySelector('[data-js="excluir"]');
                $excluir.addEventListener('submit', this.excluir, false);
            },

            excluir: function excluir(event){
                //event.preventDefault();
                let $id = document.querySelector('[data-js="excluir-id" ]');
                let post = new XMLHttpRequest();

                post.open('POST', 'http://localhost:3000/excluirProduto')
                post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                post.send('id=' + $id.value);

            },

            alterar: function alterar(event){
                //event.preventDefault();
                let $id = document.querySelector('[data-js="id" ]');
                let $newValue = document.querySelector('[data-js="newValue"]');
                let post = new XMLHttpRequest();

                post.open('POST', 'http://localhost:3000/alterarProduto')
                post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                post.send('id=' + $id.value+ '&valor=' + $newValue.value);
            },
            startPost: function startPost(event) {
                //event.preventDefault();
                let $nome = document.querySelector('[data-js="codigo"]');
                let $valor = document.querySelector('[data-js="valor"]');
                let post = new XMLHttpRequest();
                post.open('POST', 'http://localhost:3000/enviarProduto')
                post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                post.send('nome=' + $nome.value+ '&valor=' + $valor.value);
                


            },

            startGet: function startGet() {
                let get = new XMLHttpRequest();
                get.open('GET', 'http://localhost:3000/produto')
                get.send();

                get.addEventListener('readystatechange', app().isOK, false);
            },
            isOK: function isOK() {
                if (this.status === 200 && this.readyState === 4) {
                    let data = JSON.parse(this.responseText);
                   
                    let $tablecar = document.querySelector('[data-js="table-Info"]');
                    let fragment = document.createDocumentFragment();
                    
                    //sapp().clearTable($tablecar);
            
                    data.infor.forEach(element => {

                        let tr = document.createElement('tr')
                        let codigo = document.createElement('td');
                        let valor = document.createElement('td');
                        let id = document.createElement('td');

                        codigo.textContent = element.nome;
                        valor.textContent = element.valor;
                        id.textContent = element.id



                        tr.appendChild(codigo);
                        tr.appendChild(id)
                        tr.appendChild(valor);


                        $tablecar.appendChild(fragment.appendChild(tr));
                    });
                }


            },

            /*clearTable: function clearTable(element){
                
               let filhos =  element.childElementCount
               console.log(filhos)
               console.log(element.childElementCount)
              
               /*for(let i = 0; i <= filhos; i++  ){
                   element.removeChild(element.childNodes[i])
                   console.log(i)
               }*/
                //$table.removeChild($table.childNodes)

                /*Array.prototype.forEach.call(element.childNodes, function(item, index){
                    element.removeChild(item)
                })
            
            },*/

            enviado: function enviado() {
                alert('enviado com sucesso!');
            },

        }
    }
    app().init();
})();