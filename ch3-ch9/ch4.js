// Global variable
var add_item_to_cart = [];
var shopping_cart_total = 0;

// 4.1 將商品加入購物車

function add_item_to_cart(name, price) {
  add_item_to_cart.push({
    name: name,
    price: price,
  });
}

// 4.2 計算免運費項目

function update_shopping_icons() {
  var buy_buttons = document.querySelectorAll('.buy-button');

  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.innerHTML;
    var discount_button = button.querySelector('.discount-button');

    if (item.price + shopping_cart_total >= 20) {
      discount_button.style.visibility = 'visible';
    } else {
      discount_button.style.visibility = 'hidden';
    }
  }
}

// 4.3 計算稅金 & 總和

function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.05);
}

function calc_cart_total() {
  shopping_cart_total = 0;

  for (var i = 0; i < shopping_cart.length; i++) {
    var item = shopping_cart[i];
    shopping_cart_total += item.price;
  }

  set_cart_total_dom();
  update_shopping_icons();
  update_tax_dom();
}
