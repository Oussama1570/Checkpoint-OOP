//declaration
var plusBtn = Array.from(document.querySelectorAll(".fa-plus-circle"));
var minusBtn = Array.from(document.querySelectorAll(".fa-minus-circle"));
var trashBtn = Array.from(document.querySelectorAll(".fa-trash-alt"));
var cards = Array.from(document.querySelectorAll(".card"));
var likeBtn =  Array.from( document.querySelectorAll(".fa-heart"));

//plus button

for (let plus of plusBtn){
    plus.addEventListener("click", function(){
        plus.nextElementSibling.innerHTML++
        total();
    });
}

//minus button

for (let minus of minusBtn){
    minus.addEventListener("click", function(){
        minus.previousElementSibling.innerHTML>0
        ? minus.previousElementSibling.innerHTML--
        : null
        total();
    });
}

//trash button


for (let i in trashBtn){
    trashBtn[i].addEventListener("click",function(){
        cards[i].remove();
        total();
    })
}

//like button

likeBtn.forEach(btn => {
    btn.addEventListener("click", function() {
        btn.style.color = 'blue';
        total();
    }); 
});

//price

function total(){
    let q = Array.from(document.querySelectorAll(".qute"));
    let up = Array.from(document.querySelectorAll(".unitt-price"));
    let s = 0 ;

        for(let i = 0; i< up.length; i++){
            s= s + q[i].innerHTML *up[i].innerHTML;
        }
        document.getElementById("total-price").innerHTML = s;

}















// Product Class
class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }

  // Method to get the product information as a string
  getInfo() {
    return `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}`;
  }
}

// Shopping Cart Item Class
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Method to calculate total price of the item
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// Shopping Cart Class
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Get the total number of items in the cart
  getTotalItems() {
    return this.items.length;
  }

  // Add item to the cart with quantity validation
  addItem(productId, quantity = 1) {
    quantity = Math.max(1, quantity); // Ensure quantity is at least 1

    const product = this.findProduct(productId);
    if (product) {
      const existingItem = this.items.find(item => item.product.id === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.updateCartDisplay(productId, quantity); // Update cart display for added item
      this.updateTotalPrice();
    } else {
      console.error("Product not found:", productId);
    }
  }

  // Remove item from the cart
  removeItem(productId) {
    const removedItemIndex = this.items.findIndex(item => item.product.id === productId);
    if (removedItemIndex !== -1) {
      const removedItem = this.items.splice(removedItemIndex, 1)[0];
      this.updateCartDisplay(productId, -removeItem.quantity); // Update cart display for removed item
      this.updateTotalPrice();
    } else {
      console.error("Product not found in cart:", productId);
    }
  }

  // Find product by ID in the cart (helper function)
  findProduct(productId) {
    // Assuming you have a way to retrieve products (replace with your logic)
    // This example assumes you have a global `products` array containing Product objects
    return products.find(product => product.id === productId);
  }

  // Update cart display based on product ID and quantity change (implement your logic)
  updateCartDisplay(productId, quantityChange) {
    // Find the element in your HTML that represents the product in the cart
    const cartItemElement = document.querySelector(`[data-product-id="${productId}"]`);
    if (cartItemElement) {
      // Update the quantity or remove the element based on quantityChange
      const quantityElement = cartItemElement.querySelector(".qute");
      if (quantityChange > 0) {
        quantityElement.textContent = parseInt(quantityElement.textContent) + quantityChange;
      } else if (quantityChange < 0) {
        const newQuantity = parseInt(quantityElement.textContent) + quantityChange;
        if (newQuantity > 0) {
          quantityElement.textContent = newQuantity;
        } else {
          cartItemElement.remove();
        }
      }
    } else {
      console.error("Cart item element not found for product:", productId);
    }
  }

  // Update total price of the cart
  updateTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.getTotalPrice();
    }
    document.getElementById('total-price').textContent = totalPrice;
  }
}

// Usage Example (Assuming you have a way to retrieve product data)
const cart = new ShoppingCart();

// Add some products to the cart (replace with your logic)
cart.addItem(1, 2); // Product with ID 1, quantity 2
cart.addItem(2, 