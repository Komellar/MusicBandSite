//ONSCROLL HIDE NAVBAR
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollpos = window.pageYOffset
    if (prevScrollpos > currentScrollpos) {
        document.getElementById('navbar').style.top = "0"
    } else {
        document.getElementById('navbar').style.top = "-8em"
    }
    prevScrollpos = currentScrollpos;
}

//ONLOAD HOME
let tickets = document.querySelectorAll('.ticket')
let ticketUser = document.querySelectorAll('.ticket-user-info')

function indexStart() {
    let e = 0
    let i = 1000
    //DELAYING ANIMATION
    tickets.forEach(ticket => {
        i += 500
        setTimeout(function(){
            ticket.classList.add('animate__animated');
            ticket.classList.add('animate__pulse');
            ticket.classList.add(e)
            e++
        },i);

        ticket.addEventListener('click', () => {          
            showTicketUser(ticket) 
        })
        //SHOWING SECTION WITH INPUTS
        function showTicketUser(ticket) {
                if (ticket.classList.contains(1) && ticket.classList.contains('isClosed')) { 
                    ticketUser[0].classList.remove('hide'); ticket.classList.remove('isClosed') }
                else if (ticket.classList.contains(1)) { tickets[1].classList.add('isClosed'); ticketUser[0].classList.add('hide')}

                if (ticket.classList.contains(2) && ticket.classList.contains('isClosed')) { 
                    ticketUser[1].classList.remove('hide'); ticket.classList.remove('isClosed') }
                    else if (ticket.classList.contains(2)) { tickets[2].classList.add('isClosed'); ticketUser[1].classList.add('hide')}

                if (ticket.classList.contains(3) && ticket.classList.contains('isClosed')) { 
                    ticketUser[2].classList.remove('hide'); ticket.classList.remove('isClosed') }
                    else if (ticket.classList.contains(3)) { tickets[3].classList.add('isClosed'); ticketUser[2].classList.add('hide')}

                if (ticket.classList.contains(4) && ticket.classList.contains('isClosed')) { 
                    ticketUser[3].classList.remove('hide'); ticket.classList.remove('isClosed') }
                    else if (ticket.classList.contains(4)) { tickets[4].classList.add('isClosed'); ticketUser[3].classList.add('hide')}

                if (ticket.classList.contains(5) && ticket.classList.contains('isClosed')) { 
                    ticketUser[4].classList.remove('hide'); ticket.classList.remove('isClosed') }
                    else if (ticket.classList.contains(5)) { tickets[5].classList.add('isClosed'); ticketUser[4].classList.add('hide')}

                if (ticket.classList.contains(6) && ticket.classList.contains('isClosed')) { 
                    ticketUser[5].classList.remove('hide'); ticket.classList.remove('isClosed') }
                    else if (ticket.classList.contains(6)) { tickets[6].classList.add('isClosed'); ticketUser[5].classList.add('hide')}
        }
    })
}

//ONLOAD STORE
let items = document.querySelectorAll('.item')
let itemName = document.querySelectorAll('.item-name')
let itemPicture = document.querySelectorAll('.item-picture')
let itemPrice = document.querySelectorAll('.item-price')
let addToCartBtn = document.querySelectorAll('.item-button')

let cartItemPrice = document.querySelectorAll('.cart-item-price')
let cart = document.getElementById('cart')
let cartMain = document.getElementById('cart-main-section')
let cartAll = document.getElementById('cart-all')

let cartSummary = document.getElementById('cart-summary-cash')
let summaryCash = 0
let ids = []
let number

function storeStart() {
    class Item {
        constructor(name, img, price, button, id) {
            this.name = name
            this.img = img
            this.price = price
            this.button = button
            this.id = id
        }
        //CHECK IF ITEM CAN BE ADDED TO CART AND CREATING ROW
        createCartRow() {
            this.button.addEventListener('click', () => {
                cartAll.classList.remove('hide')
                if (ids.length === 0) {
                    this.addToCart()
                }
                else {
                    number = this.id
                    ids.forEach(id => {
                        if (ids.includes(number)) {
                            //pass
                        }
                        else {
                            this.addToCart()
                        }
                    })
                }
            })
        }
        //ADDING ITEM TO CART
        addToCart() {
            const cartRow = document.createElement('div')
            const cartSpanName = document.createElement('span')
            const cartSpanImg = document.createElement('span')
            const cartImg = document.createElement('img')
            const cartSpanPrice = document.createElement('span')
            const cartSpanBtn = document.createElement('span')
            const cartSpanQuantity = document.createElement('span')

            cartRow.classList.add('cart-item')
            let q = 1

            cartRow.setAttribute("id", this.id)
            ids.push(this.id)
            
            //CART IMG
            cartRow.appendChild(cartSpanImg)
            cartSpanImg.appendChild(cartImg)
            cartImg.classList.add('cart-item-image')
            cartImg.src = this.img.src
            
            //CART NAME
            cartRow.appendChild(cartSpanName)
            cartSpanName.classList.add('cart-item-name')
            cartSpanName.textContent = this.name.textContent

            //CART QUANTITY
            cartRow.appendChild(cartSpanQuantity)
            cartSpanQuantity.classList.add('cart-item-quantity')
            
            cartSpanQuantity.textContent = q
            
            //CART BUTTONS MORE & LESS
            const quantityBtns = document.createElement('div')
            cartSpanQuantity.appendChild(quantityBtns)
            quantityBtns.classList.add('cart-quantity-button')
            cartRow.appendChild(quantityBtns)

            const btnMore = document.createElement('button')
            btnMore.textContent = "+"
            const btnLess = document.createElement('button')
            btnLess.textContent = "-"
            quantityBtns.appendChild(btnLess)
            quantityBtns.appendChild(btnMore)

            btnMore.addEventListener('click', () => {
                q++
                if (q > 5) { q = 5 }
                else {
                    summaryCash += Number(price);
                    cartSummary.textContent = `$${Number(summaryCash).toFixed(2)}`
                }
                cartSpanQuantity.textContent = q
                cartSpanPrice.textContent = `$${price * q}`
            })

            btnLess.addEventListener('click', () => {
                q--
                if (q < 0) { q = 0 }
                else {
                    summaryCash -= Number(price);
                    cartSummary.textContent = `$${Number(summaryCash).toFixed(2)}`
                }
                cartSpanQuantity.textContent = q
                cartSpanPrice.textContent = `$${price * q}`
            })

            //CART ITEM PRICE
            cartRow.appendChild(cartSpanPrice)
            cartSpanPrice.classList.add('cart-item-price')
            let price = this.price.textContent.slice(1)
            cartSpanPrice.textContent =  `$${price * q}`

            cartMain.appendChild(cartRow)

            //CART SUMMARY CASH
            summaryCash += Number(price)
            cartSummary.textContent = `$${Number(summaryCash).toFixed(2)}`
        }
    }
    //CREATE NEW ITEM FOR CART
    item1 = new Item (itemName[0], itemPicture[0], itemPrice[0], addToCartBtn[0], 'itemNumber1')
    item2 = new Item (itemName[1], itemPicture[1], itemPrice[1], addToCartBtn[1], 'itemNumber2')
    item3 = new Item (itemName[2], itemPicture[2], itemPrice[2], addToCartBtn[2], 'itemNumber3')
    item4 = new Item (itemName[3], itemPicture[3], itemPrice[3], addToCartBtn[3], 'itemNumber4')
    item5 = new Item (itemName[4], itemPicture[4], itemPrice[4], addToCartBtn[4], 'itemNumber5')
    item6 = new Item (itemName[5], itemPicture[5], itemPrice[5], addToCartBtn[5], 'itemNumber6')

    //ADD ID TO EACH ITEM
    let r = 0
    items.forEach(item => {
        r++
        item.setAttribute("id", `itemNumber${r}` );
    })

    // ADDING FUNCTION TO EACH ITEM
    let itemsForCart = [item1, item2, item3, item4, item5, item6]
    itemsForCart.forEach(itemForCart => {
        itemForCart.createCartRow()
    })
}

// POPUP IF "PAY" CLICKED
function popin() {
    if (ids.length === 0) {
        swal("Your cart is empty", "Add items to your cart", "error")
    }
    else {
        swal("Payment done", "Your stuff is on a go! ", "success")
    }
}
