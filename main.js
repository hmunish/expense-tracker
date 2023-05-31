const addForm = document.querySelector('#add-form');
const expenseList = document.querySelector('.list-group');
const expenseName = document.querySelector('#exp-name');
const expenseAmt = document.querySelector('#exp-amt');
const expenseCat = document.querySelector('#exp-cat');
let expenseData = [];
if(localStorage.getItem('expenses') !== null){
    expenseData = JSON.parse(localStorage.getItem('expenses'));
    let liHtml = ``;
    expenseData.forEach((e)=>{
        liHtml += `<li class="list-group-item">${e}<button type="submit" class="btn btn-primary">Edit</button> <button type="submit" class="btn btn-danger">Delete</button> </li>`
    })
    expenseList.insertAdjacentHTML('beforeend', liHtml);
}



// Add Expense function
function addingExpense(e){
    e.preventDefault();
    expenseHtml = `<li class="list-group-item">${e.target.expName.value} ${e.target.expAmt.value} ${e.target.expCat.value} <button type="submit" class="btn btn-primary">Edit</button> <button type="submit" class="btn btn-danger">Delete</button> </li>` 
    expenseList.insertAdjacentHTML('beforeend', expenseHtml);
    expenseData.push(e.target.expName.value + ' ' + e.target.expAmt.value + ' ' + e.target.expCat.value);
    localStorage.setItem('expenses', JSON.stringify(expenseData));
}

// Delete Expense Function

function deleteExpense(e){
    if(e.target.classList.contains('btn-danger')){
        var i = e.target.parentElement.childNodes[0].data;
        expenseData = expenseData.filter((e)=>{
            return (e != i);
        })
        localStorage.setItem('expenses', JSON.stringify(expenseData));
        e.target.parentElement.remove();
    }
}

// Edit Expense Function

function editExpense(e){
    if(e.target.classList.contains('btn-primary')){
        var i = e.target.parentElement.childNodes[0].data.split(' ');
        expenseName.value = i[0];
        expenseAmt.value = i[1];
        expenseCat.value = i[2];

        expenseData = expenseData.filter((e)=>{
            return (e != i);
        })
        localStorage.setItem('expenses', JSON.stringify(expenseData));
        e.target.parentElement.remove();
    }
}


addForm.addEventListener('submit', addingExpense);
expenseList.addEventListener('click', deleteExpense);
expenseList.addEventListener('click', editExpense);

