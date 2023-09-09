'use strict';

// BANKIST
//Data 
const account1 = {
  owner: 'Geetha Supriya Bathula',
  movements: [2000, 4555.23, -306.5, 25000, -6432.21, -133.9, 7569.97, 13000],
  interestRate: 1.2, // %

  movementsDates: [
    '2023-09-06T21:31:17.178Z',
    '2023-09-04T07:42:02.383Z',
    '2022-08-26T09:15:04.904Z',
    '2022-08-03T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2022-07-11T23:36:17.929Z',
    '2021-08-12T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN'
};

const account2 = {
  owner: 'Swetha Bathula',
  movements: [20000, 4555.23, -306.5, 25000],
  interestRate: 1.2, // %

  movementsDates: [
    '2023-09-06T21:31:17.178Z',
    '2023-09-04T07:42:02.383Z',
    '2022-08-26T09:15:04.904Z',
    '2022-08-03T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
  ],
  currency: 'EUR',
  locale: 'en-GB'
};
const account3 = {
  owner: 'Bhagya Lakshmi',
  movements: [43000, 10000, 7000, 500, 990, 6977, -7769],
  interestRate: 1,

  movementsDates: [
    '2023-09-06T21:31:17.178Z',
    '2023-09-04T07:42:02.383Z',
    '2022-08-26T09:15:04.904Z',
    '2022-08-03T10:17:24.185Z',
    '2022-03-08T14:11:59.604Z',
    '2022-02-08T14:11:59.604Z',
    '2022-01-08T14:11:59.604Z',
  ],
  currency: 'USD',
  locale: 'en-US'
};

const account4 = {
  owner: 'Ram Babu Bathula',
  movements: [43000, 10000, 7000, 500, 990, 6977, -7769, 500000, 80000],
  interestRate: 1,

  movementsDates: [
    '2023-09-06T21:31:17.178Z',
    '2023-09-04T07:42:02.383Z',
    '2022-08-26T09:15:04.904Z',
    '2022-08-03T10:17:24.185Z',
    '2022-03-08T14:11:59.604Z',
    '2022-02-08T14:11:59.604Z',
    '2022-01-08T14:11:59.604Z',
    '2022-10-08T14:11:59.604Z',
    '2021-11-08T14:11:59.604Z',
  ],
  currency: 'INR',
  locale: 'en-IN'
};

const account5 = {
  owner: 'Prudhvi Kalepu',
  movements: [500, 990, 6977, -8030, 2000, 800],
  interestRate: 1,

  movementsDates: [
    '2023-09-06T21:31:17.178Z',
    '2023-09-04T07:42:02.383Z',
    '2022-08-26T09:15:04.904Z',
    '2022-01-08T14:11:59.604Z',
    '2022-10-08T14:11:59.604Z',
    '2021-11-08T14:11:59.604Z',
  ],
  currency: 'INR',
  locale: 'en-US'
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
containerApp.style.opacity = "0";

//Generating Username, Pin and adding to the object 

/* Regular Method
    let letterArr = [];
    let nameSplit = name.split(" ");
    for(name of nameSplit){
        let firstLetter = name[0].toLowerCase(); 
        letterArr.push(firstLetter);
    }
    return letterArr.join("");
*/
function computeUserName(account) {
  account.forEach(function (acnt) {
    acnt.username = acnt.owner
      .toLowerCase()
      .split(" ")
      .map(function (element) {
        return element[0];
      })
      .join("");
    return acnt.username;
  })
}
computeUserName(accounts);

const pinGenerator = (account) => {
  account.forEach((acc, i) => {
    acc.pin = Number("".padEnd(4, `${i + 1}`));
    return acc.pin
  });
}
pinGenerator(accounts);

//Formatting Date 

const formatDate = (currentDate, locale) => {
  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  }
  const daysPassed = calcDaysPassed(new Date(), currentDate);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // Instead of formating like this we can use Intl.DateTimeformat
    // const day = `${currentDate.getDate()}`.padStart(2,0);
    // const month = `${currentDate.getMonth() +1}`.padStart(2,0) ;
    // const year = currentDate.getFullYear();
    //`${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(currentDate);
  }
}

//Formating number representation according to locale 

const updateMovementCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(value);
}

//Timer for the

const startLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 300;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};


//Calculating Deposits Withdrawals and Balance for Accounts
const deposits = (accounts) => {
  accounts.forEach((acc) => {
    acc.deposits = acc.movements.filter((mov) => mov > 0);
  });
};
const withdrawals = (accounts) => {
  accounts.forEach((acc) => {
    acc.withdrawals = acc.movements.filter((mov) => mov < 0);
  });
};

//accumulator is like collecting all values and returning it as one
const totalBalanceCalculator = (accounts) => {
  accounts.forEach((acc) => {
    acc.balance = acc.movements.reduce((accumulator, currentVal, index, arr) => {
      return accumulator + currentVal;
    }, 0)
  });
}

const updateOperations = (acc) => {
  acc.deposits = acc.movements.filter((mov) => mov > 0)
  acc.withdrawals = acc.movements.filter((mov) => mov < 0);
}

deposits(accounts);
withdrawals(accounts);
totalBalanceCalculator(accounts);

//DOM Manipulations 
const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;
  movs.forEach(function (movement, i) {
    let trnType = movement > 0 ? `deposit` : `withdrawal`;
    const date = new Date(account.movementsDates[i]);
    const displayDate = formatDate(date, account.locale);
    const formatCurrencyMovement = updateMovementCurrency(movement, account.locale, account.currency);
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${trnType}">${i + 1} ${trnType}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formatCurrencyMovement}</div>  
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

//Total Balance Calculation DOM
const displayCurrentBalance = function (account) {
  const formatCurrencyMovement = updateMovementCurrency(account.balance, account.locale, account.currency);
  labelBalance.innerHTML = `<strong>${formatCurrencyMovement}</strong>`;
}

const calculateSummary = function (accounts) {
  //Label In
  let depositValue = accounts.deposits.reduce(function (acc, c) {
    return acc = acc + c;
  }, 0);
  //Label Out
  let withdrawalValue = accounts.withdrawals.reduce(function (acc, c) {
    return acc = acc + c;
  }, 0);

  //Label Interest
  let depositValueForInterestCalc = accounts.deposits
    .filter((depV) => {
      return depV >= 1;
    })
    .reduce(function (acc, c) {
      return acc = acc + c;
    }, 0);
  let interest = depositValueForInterestCalc * accounts.interestRate / 100;

  labelSumIn.innerHTML = `${updateMovementCurrency(depositValue, accounts.locale, accounts.currency)}`;
  labelSumOut.innerHTML = `${updateMovementCurrency(withdrawalValue, accounts.locale, accounts.currency)}`;
  labelSumInterest.innerHTML = `${updateMovementCurrency(interest, accounts.locale, accounts.currency)}`;
}

const updateUI = function (acc) {
  //Display Movements
  displayMovements(acc);
  //Display Balance
  displayCurrentBalance(acc);
  //Display Summary Labels
  calculateSummary(acc);
  //Updating Operations
  updateOperations(acc)
}

//Login Functionality Event Handler
let currentAccount, timer;

function login(event) {
  //prevents the form from submitting

  event.preventDefault();
  containerApp.style.opacity = 100;
  currentAccount = accounts.find(account => account.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI Message 
    labelWelcome.textContent = `Hello ${currentAccount.owner.split(" ")[0]} `;
    // const now = new Date(); 
    // const day = `${now.getDate()}`.padStart(2,0);
    // const month = `${now.getMonth() +1}`.padStart(2,0) ;
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2,0);
    // const minutes = `${now.getMinutes()}`.padStart(2,0);
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
    // labelDate.textContent = `${day}/${month}/${year}, at ${hour}:${minutes}`; //day/month/year

    //Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Timer 
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }
}
btnLogin.addEventListener('click', function (e) {
  login(e);
});


//Transfers 
function transfer(event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  if (amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username) {
    const transferDate = new Date().toISOString(); //Mon Sep 04 2023 12:34:32 GMT+0700 (Indochina Time)
    currentAccount.movementsDates.push(transferDate);
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    receiverAccount.movementsDates.push(transferDate);

    updateUI(currentAccount);
    totalBalanceCalculator(accounts);
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputTransferAmount.value = inputTransferTo.value = "";
}
btnTransfer.addEventListener('click', function (e) {
  transfer(e);
});

//Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(Number(inputLoanAmount.value));
  if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {
    setTimeout(function () {
      //Add movement
      currentAccount.movements.push(loanAmount);

      currentAccount.movementsDates.push(new Date());

      updateUI(currentAccount);
      totalBalanceCalculator(accounts);
    }, 3500);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();

  }
  inputLoanAmount.value = '';
});

//Close Account
function close(event) {
  event.preventDefault();
  console.log('Account Deleted');
  if (inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    currentAccount.movements.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
}
btnClose.addEventListener('click', function (e) {
  close(e);
});

//Sort Option
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//On click of balance we are logging movements to the console using from method
//array.from method creates a shallow copy without creatig any distubance.
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'), el => el.textContent.replace(`${el.textContent[0]}`, "")
  );
  console.log(movementsUI);
  //another way to get an array
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});


/*
//FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
// Sorting Arrays
 
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners); //sort method mutates the original array
// that means it changes the original array

//Numbers
console.log(movements);
// the sort method first converts numbers to string and then sort it into 
// ascending order 

// return < 0: A, B (keep order)
// return > 0: B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);


//Programatically creating and filling arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Emprty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
// _ denotes that we dont use that parameter 
console.log(z);

*/

/* More on Arrays for practice

let onlyMovements = accounts.map((acc)=> acc.movements);
console.log(onlyMovements);
let allInOneMovementsArray =  onlyMovements.flat(1);
console.log(allInOneMovementsArray);
let totalBalance = allInOneMovementsArray.filter((mov) => mov>0)
                                         .reduce((acc,c) => {return acc+c},0);
console.log(totalBalance);

let numDeposits1000 = allInOneMovementsArray.reduce((count,c) => {
  let p = c >= 1000 ? count+1 : count;
  return p;
},0);
console.log(numDeposits1000);

const { deposits1, withdrawals1 } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits1' : 'withdrawals1'] += cur;
      return sums;
    },
    { deposits1: 0, withdrawals1: 0 } //is same as deposits1 = 0
  );

console.log(deposits1, withdrawals1);

// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');

  return capitzalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

/*
//Numbers 
// Converting and Checking Numbers
console.log(23 === 23.0); //true

// Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// Binary base 2 - 0 1
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); //false

// Conversion
console.log(Number('23')); //23
console.log(+'23'); //23

// Parsing
console.log(Number.parseInt('30px', 10)); //30
console.log(Number.parseInt('e23', 10)); //Nan

console.log(Number.parseInt('  2.5rem  ')); //2
console.log(Number.parseFloat('  2.5rem  ')); //2.5

console.log(parseFloat('  2.5rem  ')); //2.5

// Check if value is NaN
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false
console.log(Number.isNaN(+'20X')); //true
console.log(Number.isNaN(23 / 0)); //false

// Checking if value is number
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(23 / 0)); //false

console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); //false

//Internationalizing of Numbers
const num = 3884764.23;

const options = {
  style: 'currency',
  currency: 'INR',
  // useGrouping: false, used to mention separtion of digits 
};

console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log('India:   ', new Intl.NumberFormat('en-IN', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/

/*
// Timers

// setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

let digitalTimer = function(){
  const current = new Date();
  const hrs = Math.abs(12 - current.getHours());
  const mins = current.getMinutes();
  const secs = current.getSeconds();
  return Intl.DateTimeFormat//`The Time is : ${hrs} Hrs: ${mins} Mins: ${secs} Seconds`;
}

setInterval(() => {
  console.log(digitalTimer());
}, 1000);
*/