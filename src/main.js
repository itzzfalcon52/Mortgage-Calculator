"use strict";

//elements
const amtContainer = document.getElementById("Mort_amt");
const durContainer = document.getElementById("Mort_term");
const interestContainer = document.getElementById("interest");
const submitbtn = document.querySelector(".submitBtn");
const repayLabel = document.getElementById("repayment");
const interestLabel = document.getElementById("interestOnly");
const resultContainer = document.querySelector(".result_container");
const errormsg = document.getElementById("error-amt");
const icon = document.querySelector(".icon");
const clearBtn = document.querySelector(".clear_btn");
//functions

let isValid = true;

function clearForm() {
  // Clear all input fields
  document.querySelectorAll("input").forEach((input) => {
    if (input.type === "radio" || input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
}

clearBtn.addEventListener("click", function () {
  const html = `<div class="flex justify-center items-center">
            <div class="result flex justify-around">
              <img
                src="assets/images/illustration-empty.svg"
                alt="illustration-empty"
                class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
              />
              <div
                class="result_text mt-60 flex flex-col justify-center items-center"
              >
                <h2 class="font-jakarta-bold text-white text-2xl">
                  Results Shown Here
                </h2>
                <p class="font-jakarta text-gray-400 text-lg mt-2 text-center">
                  Complete the form and click "calculate Repayments" to see what
                  your monthly repayments should be.
                </p>
              </div>
            </div>
          </div>`;
  resultContainer.innerHTML = "";
  resultContainer.insertAdjacentHTML("beforeend", html);
  clearForm();
});

const displayError = function (inputEl, errEl) {
  if (!inputEl.value.trim()) {
    errEl.classList.remove("hidden");
    inputEl.classList.add("border-red-500");

    //icon.classList.add("bg-red-500");
    return false;
  } else {
    errEl.classList.add("hidden");
    inputEl.classList.remove("border-red-500");
    return true;
  }
};

amtContainer.addEventListener("input", () => {
  const value = parseFloat(amtContainer.value.replace(/,/g, ""));
  if (!isNaN(value)) {
    amtContainer.value = value.toLocaleString("en-GB");
  }
});

const calculateMortgage = function (principal, interest, years) {
  const r = interest / 100 / 12; //monthly interest
  const n = years * 12; //total repayment
  if (r === 0) {
    // Edge case: 0% interest
    return {
      monthlyPayment: monthly,
      totalRepayment: principal,
    };
  }
  const monthlyPayment =
    (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  const totalRepayment = monthlyPayment * n;
  return {
    monthlyPayment,
    totalRepayment,
  };
};

const CalculateInterest = function (principal, interest, years) {
  const r = interest / (100 * 12); //monthly interest
  const monthlyPayment = principal * r;
  const totalRepayment = monthlyPayment * years * 12;
  return {
    monthlyPayment,
    totalRepayment,
  };
};

const updateUI = function (amt, container) {
  const html = ` 
    <div class="result p-4">
      <h2 class="font-jakarta-bold text-2xl text-white">Your results</h2>
      <p class="font-jakarta text-md text-center text-gray-400 mt-3">
        Your results are shown below based on the information you provided.to
        adjust the results, edit the form and click on "calculate Repayment"
      </p>
      <div class="card rounded-xl sm:w-4/5 mx-auto mt-4 bg-gray-900 p-4 border-t-4 border-t-yellow-500">
       
         <h2 class="font-jakarta text-blue-100 font-extralight text-md">
          Your Monthly Repayments
         </h2>
         <h2 class="font-jakarta-bold text-yellow-500 text-4xl sm:text-6xl pt-4 pl-4 pb-6 sm:pb-10 border-b border-b-blue-50">£${amt.monthlyPayment.toLocaleString(
           "en-GB",
           { minimumFractionDigits: 2 }
         )}
         </h2>
          <h2 class="font-jakarta text-blue-100 font-extralight mt-8 text-sm">
          Total you will repay over the term 
         </h2>
         <h2 class="font-jakarta-bold text-2xl text-white pt-3 pl-2">£${amt.totalRepayment.toLocaleString(
           "en-GB",
           { minimumFractionDigits: 2 }
         )}
         </h2>

      
       
      </div>
    </div>`;
  container.innerHTML = "";
  container.insertAdjacentHTML("beforeend", html);
};

submitbtn.addEventListener("click", function (e) {
  e.preventDefault();
  const isrepayment = repayLabel.checked;
  const isinterest = interestLabel.checked;
  const amt = parseFloat(amtContainer.value.replace(/,/g, ""));
  const years = parseFloat(durContainer.value);
  const interest = parseFloat(interestContainer.value);
  const amtValid = displayError(
    amtContainer,
    document.getElementById("error-amt")
  );
  const yearsValid = displayError(
    durContainer,
    document.getElementById("error-term")
  );
  const interestValid = displayError(
    interestContainer,
    document.getElementById("error-interest")
  );

  if (!amtValid || !yearsValid || !interestValid) {
    return; // Stop form submission if any field is invalid
  }

  let result;
  if (isrepayment) {
    result = calculateMortgage(amt, interest, years);
    console.log(result);
  }
  if (isinterest) {
    result = CalculateInterest(amt, interest, years);
    console.log(result);
  }
  updateUI(result, resultContainer);
});
