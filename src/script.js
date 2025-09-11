let carrinho = [];

// Carregar carrinho do servidor
async function carregarCarrinho() {
    const res = await fetch('/api/carrinho');
    carrinho = await res.json();
    atualizarCarrinho();
}

// Atualizar carrinho na tela
function atualizarCarrinho() {
    const lista = document.querySelector('#cart-items');
    lista.innerHTML = "";

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.quantidade}x ${item.nome} - R$ ${item.preco.toFixed(2)}`;

        // botão remover
        const btnRemove = document.createElement('button');
        btnRemove.textContent = "X";
        btnRemove.classList.add("remove-btn");
        btnRemove.addEventListener('click', async () => {
            await fetch(`/api/carrinho/${index}`, { method: 'DELETE' });
            await carregarCarrinho();
        });

        li.appendChild(btnRemove);
        lista.appendChild(li);
    });

    // atualizar texto do botão finalizar
    let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    document.querySelector('#finalizar').textContent = `Finalizar Compra - R$ ${total.toFixed(2)}`;
}

// Comprar produto - envia para backend
async function comprarProduto(name, priceValue, quantidade) {
    const totalProduto = priceValue * quantidade;
    await fetch('/api/carrinho', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name, quantidade, preco: totalProduto })
    });
    await carregarCarrinho();
}

// Função para criar produtos
function createProduct(name, priceValue, imgValue) {
    const pBackground = document.querySelector('.p-background');
    const product = document.createElement('div');
    const imagemProduct = document.createElement('div');
    const img = document.createElement('img');
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
    imagemProduct.classList.add('imagem-produto');
    img.setAttribute('id', 'product-img');
    productDetails.classList.add('product-details');
    price.setAttribute('id', 'price');  
    quant.setAttribute('id', 'quant');
    sub.setAttribute('id', 'sub');
    add.setAttribute('id', 'add');
    buy.setAttribute('id', 'buy');

    unitPrice.textContent = 'Preço Unitário';
    price.textContent = `R$ ${priceValue}`;
    img.setAttribute("src", imgValue);
    add.textContent = '>';
    sub.textContent = '<';
    numQuant.textContent = '1';
    buy.textContent = `R$ ${priceValue}`;
    nomeProduct.textContent = name;
    
    quant.appendChild(sub);
    quant.appendChild(numQuant);
    quant.appendChild(add);
    productDetails.appendChild(nomeProduct);
    productDetails.appendChild(unitPrice);
    productDetails.appendChild(price);
    productDetails.appendChild(quant);
    productDetails.appendChild(buy);
    imagemProduct.append(img);
    product.appendChild(imagemProduct);
    product.appendChild(productDetails);
    pBackground.appendChild(product);

    // lógica de quantidade
    add.addEventListener('click', () => {
        let newNum = Number(numQuant.textContent) + 1;
        numQuant.textContent = newNum;
        buy.textContent = `R$ ${(priceValue * newNum).toFixed(2)}`;
    });

    sub.addEventListener('click', () => {
        if (Number(numQuant.textContent) <= 1) return;
        let newNum = Number(numQuant.textContent) - 1;
        numQuant.textContent = newNum;
        buy.textContent = `R$ ${(priceValue * newNum).toFixed(2)}`;
    });

    // botão de comprar → adiciona no carrinho (backend)
    buy.addEventListener('click', async () => {
        let quantidade = Number(numQuant.textContent);
        await comprarProduto(name, priceValue, quantidade);
    });
}

// cria os produtos
createProduct('Banana', 4.99, 'https://www.freeiconspng.com/thumbs/banana-png/banana-png-32.png');
createProduct('Maçã', 6.49, 'https://png.pngtree.com/png-vector/20231017/ourmid/pngtree-3d-red-apple-png-with-green-leaf-png-image_10201408.png');
createProduct('Leite 1L', 3.79, 'https://images.vexels.com/media/users/3/160370/isolated/preview/b37d7b06ff68db3c4a667e56a458b4e6-vidro-de-vaca-leite-leite-caixa-plana.png');
createProduct('Arroz 5kg', 22.90, 'https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-uncooked-rice-in-a-wooden-bowl-with-transparent-background-png-image_13669075.png');
createProduct('Feijão 1kg', 7.50, 'https://img.pikbest.com/png-images/20241028/baked-beans-in-white-bowl-isolated-on-transparent-background-png_11021493.png!sw800');
createProduct('Ovos (dúzia)', 12.00, 'https://png.pngtree.com/png-vector/20240521/ourmid/pngtree-fresh-single-egg-png-image_12504967.png');
createProduct('Mussarela 500g', 18.99, 'https://www.extraplus.com.br/uploads/produtos/original/162009_20220503111810_thumb_50440_removebg_preview.png');
createProduct('Tomate', 5.90, 'https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-fruit-fresh-tomato-png-image_9959799.png');
createProduct('Pão de Forma', 8.49, 'https://depanes.com.br/img/paesart/pao_forma_integral.png');
createProduct('Café 500g', 14.30, 'https://superprix.vteximg.com.br/arquivos/ids/217102-600-600/StandPack-Tradicional-500g--1-.png?v=638284027975900000');
createProduct('Frango Congelado', 16.90, 'https://phygital-files.mercafacil.com/supersantafe/uploads/produto/frango_inteiro_congelado_kg_92e666b5-bf3d-452b-a3bb-06e54272a29e.png');
createProduct('Açúcar 1kg', 4.10, 'https://static.vecteezy.com/system/resources/previews/044/902/331/non_2x/kitchen-essentials-the-versatile-sugar-bowl-for-every-sweet-tooth-free-png.png');
createProduct('Óleo de Soja 900ml', 7.80, 'https://d21wiczbqxib04.cloudfront.net/peRiV01SBLxRA-mcaAxx0ZZ_cBs=/1600x0/smart/https://osuper-ecommerce-viladasfrutas2.s3.sa-east-1.amazonaws.com/3f1cec37-789603609024417120072srgb.png');
createProduct('Detergente', 2.39, 'https://ibassets.com.br/ib.item.image.large/l-f1bdafce5cd54313af97177110ae6912.png');

// botão de finalizar compra
document.querySelector('#finalizar').addEventListener('click', async () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    let resumo = carrinho.map(item => `${item.quantidade}x ${item.nome} = R$ ${item.preco.toFixed(2)}`).join("\n");
    alert(`Resumo da Compra:\n\n${resumo}\n\nTotal: R$ ${total.toFixed(2)}`);

    // limpa carrinho no servidor
    await fetch('/api/carrinho', { method: 'DELETE' });
    await carregarCarrinho();
});

// inicializa carrinho ao abrir a página
carregarCarrinho();