const sequence = {
    _id: 1,
    get id(){return this._id++}
}

const produtos = {
    infor: []
};

function salvarProduto(produto){

    produtos.infor.push(produto);
}

function getProduto(id){
    return produtos.infor[id] || {};
}

function getProdutos(){
    return produtos;
}
function deleteProduto(id){
    const produto = produtos.infor[id]
    delete produtos.infor[id];
    return produto;
}
module.exports = {
    salvarProduto,
    getProduto,
    getProdutos, deleteProduto
}
