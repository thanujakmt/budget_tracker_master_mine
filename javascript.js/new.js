
const income_btn = document.getElementById('income_button');


const getIncomeFormDataObject = () =>{
    income = document.getElementById('income_form');
    let formData = new FormData(income);
    let formDataObject = {}

    formData.forEach((value,key) =>{
        if (key == 'amount'){
            formDataObject[key] == parseInt(value);
        }
        else{
            formDataObject[key] == value;
        }
    });
    formDataObject['type'] = 'income';
    formDataObject['category'] = 'Income'
    console.log(formDataObject)
    return formDataObject
}
