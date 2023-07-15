let title = document.getElementById('title'),
price = document.getElementById('price'),
taxes = document.getElementById('taxes'),
    ads = document.getElementById('ads'),
    discount = document.getElementById('discount'),
    total = document.getElementById('total'),
    count = document.getElementById('count'),
    category = document.getElementById('category'),
    submit = document.getElementById('submit'),
    totalDiv = document.getElementById('totalDiv'),
    tbody = document.getElementById('tbody'),
    search = document.getElementById('search');


let mood = 'create';
let tmp;
    
    // get total
    function getTotal() {
        if (price.value != '') {
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value
            total.innerHTML = result
            totalDiv.style.backgroundColor = 'rgb(0, 148, 181)'   
        } else {
        total.innerHTML = '';
        totalDiv.style.backgroundColor = "rgb(233, 130, 229)";
    }
}
// creat product
let dataPro;
if (localStorage.product === undefined) {
    dataPro = [];
} else if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
}
submit.onclick = function() {
        let newPro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase()
        }
        if (title.value != '' && price.value != '' && category.value != '' && count.value < 100) {
            // Create Or Update
            if (mood === 'create') {
                // count
                if (newPro.count > 1) {
                    for (let i = 0 ; i < newPro.count ; i++) {
                        dataPro.push(newPro);
                    }
                } else {
                    dataPro.push(newPro);
                } 
            } else {
                dataPro[tmp] = newPro;
                mood = 'create';
                submit.innerHTML = 'Create';
                count.style.display = 'block';
            }
            clearInputs();
        }
        

        // Save Data to localeStorage
        localStorage.setItem("product", JSON.stringify(dataPro));

        // make The inputs Empty
        showData();
}


// clear inputs
let inputArr = [title, price,ads,discount,taxes,count,category,search];
function clearInputs() {
    inputArr.forEach((input) => {
        input.value = '';
    })
    total.innerHTML = '';
}
// read
console.log(dataPro)
function showData() {
    let table = ``;
    for (let i = 0 ; i < dataPro.length ; i++) {
        table += `<tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button>
        <td><button onclick="deleteData(${i})" id="delete">delete</button>
        </tr>`
    }
    tbody.innerHTML = table;
    let deleteAllDiv = document.getElementById('deleteAll');
if (dataPro.length > 0 ) {
    deleteAllDiv.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
} else {
    deleteAllDiv.innerHTML = '';
}
getTotal();
}
showData();
// delete
function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
// delete All button
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
// search
let  searchMood = 'title';
function getSearchMood(id) {
    
    if (id === "searchTitle") {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = `Search By ${searchMood}`;
    search.focus();
    search.value = '';
    showData();
}
let table = '';
function searchData(value) {
    table = '';
    for (let i = 0 ; i < dataPro.length ; i++) {
        if (searchMood == 'title') {
                if (dataPro[i].title.includes(value.toLowerCase())) {
                    table += `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button>
                    </tr>`
                }
        } else {
                if (dataPro[i].category.includes(value.toLowerCase())) {
                    table += `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button>
                    </tr>`
                }
        }
        tbody.innerHTML = table;
    }
}



// Change night or light mood
let changeMoodBtn = document.getElementById('mood-btn');
let body = document.body
let lnLabel = document.getElementById('ln-label');


changeMoodBtn.addEventListener('click', function() {
    if (localStorage.getItem('lnMood') === 'night') {
        lightMood();
    } else {
        nightMood();
    }
})

function lightMood() {
    localStorage.lnMood = 'light';
        lnLabel.innerHTML = 'night mood';
        body.classList.remove('night-mood');
        body.classList.add('light-mood');
        inputArr.forEach((input) => {
            input.classList.remove('night-mood');
            input.classList.add('light-mood');
        })
}
function nightMood() {
    localStorage.lnMood = 'night'
        lnLabel.innerHTML = 'light mood';
        body.classList.remove('light-mood');
        body.classList.add('night-mood');
        inputArr.forEach((input) => {
            input.classList.remove('light-mood');
            input.classList.add('night-mood');
        })
}


function chekMood() {
    if (localStorage.lnMood == 'night') {
        nightMood();
    } else {
        lightMood();
        
    }
}
chekMood();


// reset button
let btnReset = document.querySelector('#reset');

function reset() {
    localStorage.clear();
    location.reload();
}