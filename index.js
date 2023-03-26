import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://playground-a9bbc-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const shoppingListInDB = ref(database, "shoppingList")

const addBtnEl = document.getElementById('add-button')
const inputFieldEl = document.getElementById('input-field')
const shoppingListEl = document.getElementById('shopping-list')

onValue(shoppingListInDB, function(snapshot) {
    let shoppingListArray = Object.values(snapshot.val())
    clearShoppingListEl()


    for (let i = 0; i < shoppingListArray.length; i++) {
        let currentItems = shoppingListArray[i]
        handleAddLi(currentItems)
    }
})


addBtnEl.addEventListener('click', function(){
    let inputValue = inputFieldEl.value
    if (inputValue) {
        push(shoppingListInDB, inputValue)
        handleClearInput()
    

        console.log("ITEMS PUSHED")
    }
})


function handleClearInput() {
    inputFieldEl.value = ''
}

function handleAddLi(itemValue) {
    shoppingListEl.innerHTML += `<li> ${itemValue} </li>`
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}