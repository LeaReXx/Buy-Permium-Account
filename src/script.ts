import formatCurrency from "./FormatCurrency.js";

// Call from HTML
const $: Document = document;
const preLoad = $.getElementById("pre-load") as HTMLDivElement;
const months = $.getElementById("select-months") as HTMLSelectElement;
const selectedPlanName = $.getElementById("price-plan-name") as HTMLSpanElement;
const pricePlan = $.getElementById("price-selected") as HTMLSpanElement;
const submitPlan = $.getElementById("submit-plan") as HTMLInputElement;
const emailInput = $.getElementById("email") as HTMLInputElement;
const telInput = $.getElementById("tel") as HTMLInputElement;
const formError = $.getElementById("form-error") as HTMLDivElement;
const payInfoBox = $.querySelector(".pay-info") as HTMLDivElement;
const planBtns = $.querySelectorAll(".plans-btn") as NodeList;

// Premium Plans Array
const premiumPlans: { id: number; planName: string; price: number }[] = [
  {
    id: 1,
    planName: "GOLD",
    price: 25000,
  },
  {
    id: 2,
    planName: "SILVER",
    price: 18000,
  },
  {
    id: 3,
    planName: "BRONZE",
    price: 10000,
  },
];
let selectedPlan: { id: number; planName: string; price: number } = {
  id: 0,
  planName: "",
  price: 0,
};

let selectedMonth: number = 1;
planBtns.forEach((plan) =>
  plan.addEventListener("click", (event: any) =>
    getSelectedPlan(Number(event.target.dataset.id))
  )
);

const getSelectedPlan = (planID: number) => {
  selectedPlan = premiumPlans.filter((item) => item.id === planID)[0];
  months.value = "1";
  selectedMonth = 1;
  activePlanInfoBox();
};

// Preload Function
function pagePreLoad() {
  preLoad.classList.add("hidden");
}
window.addEventListener("load", pagePreLoad);

const activePlanInfoBox = () => {
  payInfoBox.style.display = "grid";

  switch (selectedPlan.planName) {
    case "GOLD":
      selectedPlanName.innerHTML = `اشتراک طلایی ${
        months.options[months.selectedIndex].text
      }`;
      break;
    case "SILVER":
      selectedPlanName.innerHTML = `اشتراک نقره ای ${
        months.options[months.selectedIndex].text
      }`;
      break;
    case "BRONZE":
      selectedPlanName.innerHTML = `اشتراک برنزی ${
        months.options[months.selectedIndex].text
      }`;
    default:
      break;
  }
  setPlanTotalPrice();
};

const setPlanTotalPrice = () => {
  pricePlan.innerHTML = selectedPlan.price * selectedMonth + " تومان";
};

months.addEventListener("change", (event: any) => {
  selectedMonth = event.target.value;
  activePlanInfoBox();
});

let isFormValid = {
  phoneValidation: false,
  emailValidation: false,
};

// Email And Tel Input Validation
function telValidationCheck() {
  if (telInput.value.length < 11) {
    formError.style.display = "flex";
    telInput.style.border = "1px solid red";
    isFormValid.phoneValidation = false;
  } else {
    formError.style.display = "none";
    telInput.style.border = "1px solid green";
    isFormValid.phoneValidation = true;
  }
  formValidationCheck();
}
function emailValidationCheck() {
  if (emailInput.value.length < 4) {
    formError.style.display = "flex";
    emailInput.style.border = "1px solid red";
    isFormValid.emailValidation = false;
  } else {
    formError.style.display = "none";
    emailInput.style.border = "1px solid green";
    isFormValid.emailValidation = true;
  }
  formValidationCheck();
}
emailInput.addEventListener("input", emailValidationCheck);

// form Validation Check
function formValidationCheck() {
  submitPlan.disabled = true;
  formError.innerHTML = "";

  if (!isFormValid.emailValidation) {
    formError.insertAdjacentHTML(
      "afterbegin",
      "<p id='form-error-message'>لطفا آدرس ایمیل را به درستی وارد کنید</p>"
    );
  } else if (!isFormValid.phoneValidation) {
    formError.insertAdjacentHTML(
      "afterbegin",
      "<p id='form-error-message'>شماره تلفن همراه باید 11 رقم باشد. مثال: 09308586985</p>"
    );
  }

  if (isFormValid.emailValidation && isFormValid.phoneValidation) {
    submitPlan.disabled = false;
  }
}
telInput.addEventListener("input", telValidationCheck);

const successForm = () => {
  formError.style.display = "flex";
  formValidationCheck();
  formError.insertAdjacentHTML(
    "afterbegin",
    "<p id='form-error-message' class='bg-green'>درحال انتقال به درگاه پرداخت...</p>"
  );
};
submitPlan.addEventListener("click", successForm);

export {};
