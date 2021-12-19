var $ = document
let bodyElem = document.body;
let preLoad = $.getElementById('pre-load');
let months = $.getElementById('select-months');
let selectedPlanName = $.getElementById('price-plan-name');
let pricePlan = $.getElementById('price-selected');
let goldPlan = $.getElementById('plan-gold');
let silverPlan = $.getElementById('plan-silver');
let bronzePlan = $.getElementById('plan-bronze');
let submitPlan = $.getElementById('submit-plan');
let emailInput = $.getElementById('email');
let telInput = $.getElementById('tel');
let formEror = $.getElementById('form-eror');
let formErorMessage = $.getElementById('form-eror-message');
let payInfoBox = $.querySelector('.pay-info');
months.disabled = true

let plans = {
    gold: {
        Name: 'Permium Gold',
        Price: '25000'
    },
    silver: {
        Name: 'Permium Silver',
        Price: '18000'
    },
    bronze: {
        Name: 'Permium Bronze',
        Price: '10000'
    }
}


function pagePreLoad() {
    preLoad.classList.add('hidden')
}
window.addEventListener('load', pagePreLoad)


function userSelectMonths(event) {

    selectedPlanName.innerHTML = `${permiumName} ${months.options[months.selectedIndex].text}`
    pricePlan.innerHTML = plans[priceAllPlans].Price * event.target.value + ' تومان'
}

months.addEventListener('change', userSelectMonths)
let permiumName;
let priceAllPlans;

function defaultText() {
    pricePlan.innerHTML = '--'
    months.disabled = false
    months.value = 'default'
    payInfoBox.style.display = 'grid'

}
// gold function 
function goldFunc() {

    permiumName = 'اشتراک طلایی'
    selectedPlanName.innerHTML = permiumName
    priceAllPlans = 'gold'
    defaultText()
}

goldPlan.addEventListener('click', goldFunc)

// silver function 
function silverFunc() {

    permiumName = 'اشتراک نقره ای'
    selectedPlanName.innerHTML = permiumName
    priceAllPlans = 'silver'
    defaultText()
}
silverPlan.addEventListener('click', silverFunc)

// bronze function 
function bronzeFunc() {

    permiumName = 'اشتراک برنزی'
    selectedPlanName.innerHTML = permiumName
    priceAllPlans = 'bronze'
    defaultText()
}
bronzePlan.addEventListener('click', bronzeFunc)



function telValidationCheck() {

    if (telInput.value.length < 10) {
        telInput.style.border = '1px solid red'
    } else {
        telInput.style.border = '1px solid green'
    }
}
telInput.addEventListener('blur', telValidationCheck)

function emailValidationCheck() {
    if (emailInput.value != ''){
        emailInput.style.border = '1px solid green'
    } else {
        emailInput.style.border = '1px solid red'
    }
}
emailInput.addEventListener('blur', emailValidationCheck)

function formValidationCheck(event) {
    event.preventDefault();

    if (permiumName === undefined) {
        formEror.style.display = 'block'
        formErorMessage.innerHTML = 'شما هنوز پلن خود را انتخاب نکرده اید'
        
    } else if (months.value === 'default') {
        formEror.style.display = 'block'
        months.style.border = '1px solid red'
        formErorMessage.innerHTML = `تعداد ماه ${permiumName} خود را انتخاب کنید`

    } else if (emailInput.value === '') {
        formEror.style.display = 'block'
        formErorMessage.innerHTML = 'لطفا آدرس ایمیل را به درستی وارد کنید'
        emailValidationCheck()

    } else if (telInput.style.border === '1px solid red' || telInput.value === '') {
        formEror.style.display = 'block'
        formErorMessage.innerHTML = 'شماره تلفن همراه باید 11 رقم باشد. مثال: 09308586985'
        telValidationCheck()
    } else {
            formEror.style.display = 'block'
            formErorMessage.innerHTML = 'درحال انتقال به درگاه پرداخت...'
            formErorMessage.style.backgroundColor = 'green'
        
    }
}

submitPlan.addEventListener('click', formValidationCheck)