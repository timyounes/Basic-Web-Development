function addToCart(id) {
    var items = JSON.parse(localStorage.getItem('storeProducts'));
    for (var x = 0; x < items.length; x++) {
        if (items[x].id == id) {
            if (localStorage.getItem('cartItems') === null) {
                var cartItems = [];
                cartItems.push(items[x]);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                document.querySelector('.cart-drawer').style.display = 'block';
                document.getElementById('cartItemCount').innerHTML = JSON.parse(localStorage.getItem('cartItems')).length;
                CustomAlert.show('Add To Cart', 'Item ' + items[x].title + ' has been added to your cart successfully!', 'dialog-sm');
            } else {
                var cartItems = JSON.parse(localStorage.getItem('cartItems'));
                cartItems.push(items[x]);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                document.querySelector('.cart-drawer').style.display = 'block';
                document.getElementById('cartItemCount').innerHTML = JSON.parse(localStorage.getItem('cartItems')).length;
                CustomAlert.show('Add To Cart', 'Item ' + items[x].title + ' has been added to your cart successfully!', 'dialog-sm');
            }

            break;
        }
    }
}

function viewCart() {
    var items = JSON.parse(localStorage.getItem('cartItems'));
    var itemList = '<div class="prod list-view">';
    for (var x = 0; x < items.length; x++) {
        
        itemList += '<div class="item">'+
                        '<h3>'+ items[x].title +'</h3>' +
                        '<span class="price">'+ items[x].price +'</span>' +
                        '<img src="' + items[x].src + '" alt="">' +
                        '<p class="desc">'+ items[x].descr +'</p>' +
                    '</div>';
    }

    itemList += '</div>';
    document.querySelector('.dialog').style.background = 'transparent';
    document.querySelector('.dialog').style.opacity = 1;
    CustomAlert.show('Cart Item List', itemList, 'dialog-xl');
}

if (localStorage.getItem('cartItems') !== null && JSON.parse(localStorage.getItem('cartItems')).length > 0) {
    document.querySelector('.cart-drawer').style.display = 'block';
    document.getElementById('cartItemCount').innerHTML = JSON.parse(localStorage.getItem('cartItems')).length;
} else {
    document.querySelector('.cart-drawer').style.display = 'none';

}

fetch('js/products.json')
    .then((data) => data.json())
    .then((json) => {
        var items = json;
        localStorage.setItem('storeProducts', JSON.stringify(items));
        for (var x = 0; x < items.length; x++) {
            document.getElementById('productList').innerHTML += '<div class="product-card">' +
                '<div class="product-image">' +
                '<img class="prod-image" src="' + items[x].src + '">' +
                '</div>' +

                '<div class="product-info-group">' +
                '<div class="product-info">' +
                '<h3 class="prod-title">' + items[x].title + '</h3>' +
                '<h4 class="prod-price">' + items[x].price + '</h4>' +
                '</div>' +
                '<button type="button" id="' + items[x].id + '" class="button order-button" onclick="addToCart(' + items[x].id + ')">Order</button>' +
                '</div>' +
                '</div>';
        }
    });
