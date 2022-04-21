
const $addToppingBtn = document.querySelector('#add-topping');
const $pizzaForm = document.querySelector('#pizza-form');
const $customToppingsList = document.querySelector('#custom-toppings-list');
debugger
// Adds toppings to toppings-list
const handleAddTopping = event => {
  // prevents default activity of event(refresh page)
  event.preventDefault();
  // toppingValue is the value of whatever is added to #new-topping input
  const toppingValue = document.querySelector('#new-topping').value;
  // if theres no value return false
  if (!toppingValue) {
    return false;
  }
  // creates the checkbox from input field
  const checkbox = document.createElement('input');
  // gives it a type of checkbox
  checkbox.type = 'checkbox';
  // name of topping
  checkbox.name = 'topping';
  // value of toppingValue from input
  checkbox.value = toppingValue;
  // value of toppingValue from input
  checkbox.id = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');
  // create label for the checkbox
  const label = document.createElement('label');
  // html and text content of toppingValue
  label.textContent = toppingValue;
  label.htmlFor = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');
  // creates div around checkbox
  const divWrapper = document.createElement('div');

  // appends checkbox to div then label to div
  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customToppingsList.appendChild(divWrapper);
  // toppingValue input field set as empty
  toppingValue.value = '';
};

// does what it says
const handlePizzaSubmit = event => {
  event.preventDefault();
  // pulls value from Pizza name field
  const pizzaName = $pizzaForm.querySelector('#pizza-name').value;
  // pulls value created by Pizza name field
  const createdBy = $pizzaForm.querySelector('#created-by').value;
  const size = $pizzaForm.querySelector('#pizza-size').value;
  // this selects checked topping on the piza form and mapping choices to the value of toppings
  const toppings = [...$pizzaForm.querySelectorAll('[name=topping]:checked')].map(topping => {
    return topping.value;
  });

  if (!pizzaName || !createdBy || !toppings.length) {
    return;
  }
  // creates an object made of the pizz data
  const formData = { pizzaName, createdBy, size, toppings };

 fetch('/api/pizzas', {
   method: 'POST',
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(formData)
 })
  .then(response => response.json())
  .then(postResponse => {
    alert('PIZZA MADE BABY!');
    console.log(postResponse);
  })
  .catch(err => {
    console.log(err);
  });
};

// event listeners
$pizzaForm.addEventListener('submit', handlePizzaSubmit);
$addToppingBtn.addEventListener('click', handleAddTopping);
