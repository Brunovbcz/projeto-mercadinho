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
    add.setAttribute('id', 'add')
    buy.setAttribute('id', 'buy');


    img.style.backgroundsize = 'cover';

    unitPrice.textContent = 'Preço Unitário'
    price.textContent = `R$ ${priceValue}`;
    img.setAttribute("src", imgValue);
    add.textContent = '>'
    sub.textContent = '<'
    numQuant.textContent = '1'
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

    
}

createProduct('galinha', 799.90, 'https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-brown-hen-with-egg-basket-broody-henhouse-hens-and-chicks-isolated-png-image_13052144.png')
