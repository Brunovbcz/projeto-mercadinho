let carrinho = [];
var produtosAAA = [];

// Carregar carrinho do servidor
async function carregarCarrinho() {
    const res = await fetch('/carrinho');
    carrinho = await res.json();
    atualizarCarrinho(carrinho);
}

async function carregarProdutos() {
    const res = await fetch('/produtos');
    produtos = await res.json();
    produtos.forEach(p => {
        createProduct(p)
    });
    produtosAAA=produtos;
}

// Atualizar carrinho na tela
function atualizarCarrinho(carrinho) {
    console.log(carrinho);
    console.log(produtosAAA);
    let nomeProd = '';
    let precoProd = 0;
    produtosAAA.forEach(p =>{
        if(carrinho[0].id_produto===p.id){
            nomeProd=p.nome;
            precoProd=p.preco * carrinho[0].quantidade
        };
        
    });
    console.log(nomeProd);
    const lista = document.querySelector('#cart-items');
    lista.innerHTML = "";
    
    carrinho.forEach((item, index) => {
        console.log(item)
        const li = document.createElement('li');
        console.log(item)
        li.textContent = `${item.quantidade}x ${nomeProd} - R$ ${precoProd}`;

        // botão remover
        const btnRemove = document.createElement('button');
        btnRemove.textContent = "X";
        btnRemove.classList.add("remove-btn");
        btnRemove.addEventListener('click', async () => {
            await fetch(`/carrinho/${index}`, { method: 'DELETE' });
            await carregarCarrinho();
        });

        li.appendChild(btnRemove);
        lista.appendChild(li);
    });

    // atualizar texto do botão finalizar
    let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    document.querySelector('#finalizar').textContent = `Finalizar Compra - R$ ${total}`;
}

// Comprar produto - envia para backend
async function comprarProduto(name, priceValue, quantidade) {
    const totalProduto = priceValue * quantidade;
    await fetch('/carrinho', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name, quantidade, preco: totalProduto })
    });
    await carregarCarrinho();
}

// Função para criar produtos
function createProduct(p) {
    const pBackground = document.querySelector('.p-background');
    const product = document.createElement('div');
    const productDetails = document.createElement('div');
    const nomeProduct = document.createElement('p');
    const unitPrice = document.createElement('p');
    const price = document.createElement('p');
    const quant = document.createElement('div');
    const sub = document.createElement('button');
    const numQuant = document.createElement('p');
    const add = document.createElement('button');
    const buy = document.createElement('button');

    product.classList.add('product');
    productDetails.classList.add('product-details');
    price.setAttribute('id', 'price');  
    quant.setAttribute('id', 'quant');
    sub.setAttribute('id', 'sub');
    add.setAttribute('id', 'add');
    buy.setAttribute('id', 'buy');

    unitPrice.textContent = 'Preço Unitário';
    price.textContent = `R$ ${p.preco}`;
    add.textContent = '>';
    sub.textContent = '<';
    numQuant.textContent = '1';
    buy.textContent = `R$ ${p.preco}`;
    nomeProduct.textContent = p.nome;
    
    quant.appendChild(sub);
    quant.appendChild(numQuant);
    quant.appendChild(add);
    productDetails.appendChild(nomeProduct);
    productDetails.appendChild(unitPrice);
    productDetails.appendChild(price);
    productDetails.appendChild(quant);
    productDetails.appendChild(buy);
    product.appendChild(productDetails);
    pBackground.appendChild(product);

    // lógica de quantidade
    add.addEventListener('click', () => {
        let newNum = Number(numQuant.textContent) + 1;
        numQuant.textContent = newNum;
        buy.textContent = `R$ ${(p.preco * newNum)}`;
    });

    sub.addEventListener('click', () => {
        if (Number(numQuant.textContent) <= 1) return;
        let newNum = Number(numQuant.textContent) - 1;
        numQuant.textContent = newNum;
        buy.textContent = `R$ ${(p.preco * newNum)}`;
    });

    // botão de comprar → adiciona no carrinho (backend)
    buy.addEventListener('click', async () => {
        let quantidade = Number(numQuant.textContent);
        await comprarProduto(p.nome, p.preco, quantidade);
        await carregarCarrinho();
    });
}

// botão de finalizar compra
document.querySelector('#finalizar').addEventListener('click', async () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    let resumo = carrinho.map(item => `${item.quantidade}x ${item.nome} = R$ ${item.preco}`).join("\n");
    alert(`Resumo da Compra:\n\n${resumo}\n\nTotal: R$ ${total}`);

    // limpa carrinho no servidor
    await fetch('/carrinho', { method: 'DELETE' });
    await carregarCarrinho();
});

document.addEventListener('DOMContentLoaded', async () => {
    await carregarProdutos();
})