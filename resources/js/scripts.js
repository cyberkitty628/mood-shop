const itemsContainer = document.getElementById('items')

import data from './data.js'

// the length of our data determines how many times this loop goes around
for (let i=0; i<data.length; ++i) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop. Can you explain why?
    img.src = data[i].image
    img.width = 300
    img.height = 300

    // Add the image to the div
    newDiv.appendChild(img)
    console.log(img)
    // put new div inside items container
    itemsContainer.appendChild(newDiv)

    let desc = document.createElement('P')
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)

    let price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name

    // creates a custom attribute called data-price. 
    // That will hold price for each element in the button
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    
    // put new div inside items container
    itemsContainer.appendChild(newDiv)
}

const cart = [ ]

//-----------------------------

// Add Items
function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            return
        }
    }

    const item = {name, price, qty: 1}
    cart.push(item)
}

//-----------------------------

// Show Items
function showItems() {
    const qty = getQty()
    console.log(`You have ${getQty()} items in your cart`)
    
    for (let i = 0; i < cart.length; i += 1) {
        console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
    }

    console.log(`Total in cart: $${getTotal()}`)
}

//-----------------------------

// Get Qty
function getQty() {
    let qty = 0
    for (let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty
    }
    return qty
}

//-----------------------------

//Get Total
function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * cart[i].qty
    }

    return total.toFixed(2)
}

//-----------------------------

//Remove Item
function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
            cart[i].qty -= qty
            }
            if (cart[i].qty < 1) {
            cart.splice(i, 1)
            }
            return
        }
    }
}

//-----------------------------

addItem('Apple', 0.99)
addItem('Orange', 1.29)
addItem('Opinion', 0.02)
addItem('Frisbee', 9.92)
addItem('Apple', 0.99)
addItem('Orange', 1.29)

showItems()
removeItem('Apple', 1)
removeItem('Frisbee')

showItems()