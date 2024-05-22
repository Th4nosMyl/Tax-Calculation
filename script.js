// Mylonas Athanasios e21118
// Get references to the HTML elements
const form = document.getElementById("form");
const incomeInput = document.getElementById("income");
const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");
const childrenInput = document.getElementById("children");
const taxableIncomeSpan = document.getElementById("taxableIncome");
const taxSpan = document.getElementById("tax");
const finalDiscountSpan = document.getElementById("finalDiscount");
const finalTaxSpan = document.getElementById("finalTax");
const netIncomeSpan = document.getElementById("netIncome");

// Add event listener to the form submit event
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the input values
  const income = parseFloat(incomeInput.value);
  const year = parseInt(yearInput.value);
  const month = parseInt(monthInput.value);
  const day = parseInt(dayInput.value);
  const children = parseInt(childrenInput.value);

  // Create a Date object from the input values
  const birthDate = new Date(year, month, day);

  // Calculate the taxable income, tax, final discount, final tax, and net income
  const taxableIncome = calculateTaxableIncome(income);
  const tax = calculateTax(taxableIncome);
  const finalDiscount = calculateFinalDiscount(birthDate, income);
  const finalTax = calculateFinalTax(tax, finalDiscount);
  const netIncome = calculateNetIncome(income, finalTax);

  // Update the HTML elements with the calculated values
  taxableIncomeSpan.textContent = taxableIncome.toFixed(2);
  taxSpan.textContent = tax.toFixed(2);
  finalDiscountSpan.textContent = (finalDiscount * 100).toFixed(1) + "%";
  finalTaxSpan.textContent = finalTax.toFixed(2);
  netIncomeSpan.textContent = netIncome.toFixed(2);
});

// Calculate the taxable income based on the income and exemption
function calculateTaxableIncome(income) {
  const exemption = getExemption(income);
  return income - exemption;
}

// Get the exemption amount based on the income
function getExemption(income) {
  if (income <= 12000) {
    return 8000;
  } else if (income <= 24000) {
    return 8000 + (income - 12000) * 0.5;
  } else {
    return 14000;
  }
}

// Calculate the tax based on the taxable income
function calculateTax(taxableIncome) {
  if (taxableIncome <= 18000) {
    return taxableIncome * 0.23;
  } else if (taxableIncome <= 36000) {
    return 4140 + (taxableIncome - 18000) * 0.26;
  } else if (taxableIncome <= 60000) {
    return 8360 + (taxableIncome - 36000) * 0.32;
  } else {
    return 16320 + (taxableIncome - 60000) * 0.35;
  }
}

// Calculate the age based on the birth date
function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

// Calculate the final discount based on the birth date and income
function calculateFinalDiscount(birthDate, income) {
  const age = calculateAge(birthDate);
  const discount = getBasicDiscount(age, income);
  return discount;
}

// Get the basic discount based on the age and income
function getBasicDiscount(age, income) {
  if (age < 25 || age > 65) {
    if (income <= 24000) {
      return 0.15;
    } else if (income <= 36000) {
      return 0.1;
    } else {
      return 0.05;
    }
  } else {
    return 0;
  }
}

// Calculate the final tax based on the tax and final discount
function calculateFinalTax(tax, finalDiscount) {
  return tax * (1 - finalDiscount);
}

// Calculate the net income based on the income and final tax
function calculateNetIncome(income, finalTax) {
  return income - finalTax;
}
