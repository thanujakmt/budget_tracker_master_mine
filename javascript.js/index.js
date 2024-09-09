
const income_button = document.getElementById('income_button');
const expense_button = document.getElementById('Expense_button');
const table = document.querySelector('.table');
const filterDate = document.getElementById('filter_button');

const getIncomeFormDataObject = () =>{
    income_form = document.getElementById('income_form');
    let formData = new FormData(income_form);
    let formDataObject = {};

    formData.forEach((value,key) =>{
        if (key == 'amount'){
            formDataObject[key] = parseInt(value);
        }
        else{
            formDataObject[key] = value;
        }
    });
    formDataObject['type'] = 'income';
    formDataObject['category'] = 'Income'
    console.log(formDataObject)
    return formDataObject
}

const getExpenseFormDataObject = () => {
    expense_form = document.getElementById('expense_form');
    let formData = new FormData(expense_form);
    let formDataObject = {};

    formData.forEach((value,key) =>{
        
        if (key == 'amount'){
            formDataObject[key] = parseInt(value);
        }
        else{
            formDataObject[key] = value;
        }
    });

    formDataObject['type'] = 'expense'
    console.log(formDataObject)
    return formDataObject
}

const retriveDataLocalStorage = () => {
    var retrievedData = JSON.parse(localStorage.getItem("enteries"));
    if(retrievedData === null){
        let test_data = []

        localStorage.setItem("enteries", JSON.stringify(test_data));
    }
    retrievedData = JSON.parse(localStorage.getItem("enteries"));
    return retrievedData
}

const saveDataLocalStorage = (data) =>{
    var localStorageData =  retriveDataLocalStorage();
    let jsonString = JSON.stringify(data); 
    localStorageData.push(jsonString);
    localStorage.setItem("enteries", JSON.stringify(localStorageData));
    
}

const getTotalIncomeExpense = () => {
    let total_income = 0;
    let total_expense = 0;
    var localStorageData = retriveDataLocalStorage();
    localStorageData.forEach((value,key) =>{
        let valueJson = JSON.parse(value)
        if(valueJson.type === 'income'){
            total_income += valueJson.amount;
            console.log(total_income)
            }
        else if(valueJson.type === 'expense'){
            total_expense += valueJson.amount;
            console.log(total_expense)
        }
    });
    return {"total_income" : total_income, "total_expense" : total_expense, "remaining" : total_income - total_expense}
};

const filterHandler = () =>{
    let filterDateValue = document.getElementById('filter_date').value;
    
    if(filterDateValue === ''){
        let tdArrayMain = document.querySelectorAll('table tbody tr td');
        tdArrayMain.forEach((tdElementMain) => {
            tdElementMain.className = '';
        });
    }
    else{
    let trArray = document.querySelectorAll('table tbody tr');
    trArray.forEach((trElement) =>{
        if(trElement.textContent.includes(filterDateValue)){
            trElement.querySelectorAll('td').forEach((tdElement) =>{
                tdElement.className = 'found';
            });
        }
        else{
            trElement.querySelectorAll('td').forEach((tdElement) =>{
                tdElement.className = 'not_found';
            });
        }
    });
}
}

const updateSummaryHandler = () => {
    let total_income = document.getElementById('total_income');
    let total_expense = document.getElementById('total_expense');
    let remaining_balance = document.getElementById('remaining_bal');

    var summary = getTotalIncomeExpense();

    total_income.innerHTML = summary.total_income;
    total_expense.innerHTML = summary.total_expense;
    remaining_balance.innerHTML = summary.remaining;
}

const addNewDataToTable = () => {
    table.innerHTML = ''
    var localStorageData =  retriveDataLocalStorage();
    let tbodyElement = document.createElement('tbody')
    tbodyElement.innerHTML = `<thead>
    <tr>
        <th>Amount</th>
        <th>Date</th>
        <th>Category</th>
        <th>Delete</th>
    </tr>
   </thead>`
    localStorageData.forEach((value,key) => {
        let valueJson  = JSON.parse(value);
        let newTr = document.createElement('tr')
        newTr.innerHTML = `<td>${valueJson.amount}</td>
                            <td>${valueJson.date}</td>
                            <td>${valueJson.category}</td>
                            <td><i onclick = "deleteDataLocalStorage(${key})" class="fa-solid fa-trash-can"></i></td>`
        
                            tbodyElement.appendChild(newTr);
                            

    });
    table.innerHTML = tbodyElement.innerHTML;
    updateSummaryHandler();
    
};

const deleteDataLocalStorage = (index) =>{
    var localStorageData =  retriveDataLocalStorage();
  
    localStorageData.splice(index,1);

    localStorage.setItem("enteries", JSON.stringify(localStorageData));
    addNewDataToTable();
}

income_button.addEventListener('click', () =>{
    incomeData = getIncomeFormDataObject();
    saveDataLocalStorage(incomeData);
    addNewDataToTable();
})

expense_button.addEventListener('click', () =>{
    expenseData = getExpenseFormDataObject();
    saveDataLocalStorage(expenseData);
    addNewDataToTable();
})

addNewDataToTable();
filterDate.addEventListener('click', filterHandler);