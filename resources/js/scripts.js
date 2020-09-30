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

const itemList = document.getElementById('items-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
const itemName = document.getElementById('item-name')
const itemPrice = document.getElementById('item-price')

const cart = []

//-----------------------------

// Handle change events on update input
itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}

//-----------------------------

// Handle clicks on list
itemList.onclick = function(e) {
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name
        removeItem(name)
    } else if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name
        addItem(name)
    } else if (e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name
        removeItem(name)
    }
}


//-----------------------------

// Handle add form submit
addForm.onsubmit = function(e) {
    e.preventDefault ()
    const name = itemName.value
    const price = itemPrice.value
    addItem(name, price)
}

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
    console.log(cart)
    const qty = getQty()
    cartQty.innerHTML = `You have ${getQty(qty)} items in your cart`

    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1) {
        console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        const {name, price, qty} = cart[i]

        itemStr += `<li>
        ${name} $${price} x ${qty} = ${qty * price}
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}"> + </button>
        <button class="remove-one" data-name="${name}"> - </button>
        <input class="update" type="number" data=name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr

    const all_items_button = Array.from(document.querySelectorAll("button"))
    all_items_button.forEach(elt => elt.addEventListener('click', () => {
        addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
        showItems()
      }))

    console.log(`Total in cart: $${getTotal()}`)
    cartTotal.innerHTML = `Total in cart: $${getTotal()}`
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
            showItems()
            return
        }
    }
}

//-----------------------------

//Update Cart
function updateCart(name, qty) {
    for (let i= 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItem(name)
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}