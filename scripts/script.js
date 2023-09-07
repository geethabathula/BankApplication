'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/*
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
*/

//Data for Dates and Times
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];
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
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['INR', 'Indian Rupee'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Generating Username and adding to the object 
function computeUserName(account) {
  account.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (element) {
        return element[0];
      })
      .join("");
    return acc.username;
  })
  /* Regular Method
    let letterArr = [];
    let nameSplit = name.split(" ");
    for(name of nameSplit){
        let firstLetter = name[0].toLowerCase(); 
        letterArr.push(firstLetter);
    }
    return letterArr.join("");
    */
}
computeUserName(accounts);

//Creating Deposits Withdrawals and Balance for Accounts
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
  accounts.forEach((account) => {
    account.balance = account.movements.reduce((accumulator, currentVal, index, arr) => {
      return accumulator + currentVal;
    }, 0)
  });
}

const totalBalanceInUSD = (accounts) => {
  accounts.forEach((account) => {
    account.balanceInUSD = account.movements
      .filter(mov => mov > 0)
      .map(mov => (mov * 1.09))
      .reduce((accumulator, currentMov) => accumulator + currentMov, 0)
  });
}

deposits(accounts);
withdrawals(accounts);
totalBalanceCalculator(accounts);
totalBalanceInUSD(accounts);

//DOM Manipulations 
const displayMovements = function (movement, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movement.slice().sort((a, b) => a - b) : movement;
  movs.forEach(function (movement, i) {
    let trnType = movement > 0 ? `deposit` : `withdrawal`;
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${trnType}">${i + 1} ${trnType}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value"><strong>INR </strong>${movement}</div>  
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

//Total Balance Calculation DOM
const displayCurrentBalance = function (account) {
  labelBalance.innerHTML = `<strong>INR </strong>${account.balance}`;
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
  labelSumIn.innerHTML = `<strong>INR </strong>${depositValue.toFixed(2)}`;
  labelSumOut.innerHTML = `<strong>INR </strong>${Math.abs(withdrawalValue.toFixed(2))}`;
  labelSumInterest.innerHTML = `<strong>INR </strong>${interest.toFixed(2)}`;
}

const updateUI = function (acc) {
  //Display Movements
  displayMovements(acc.movements);
  //Display Balance
  displayCurrentBalance(acc);
  //Display Summary Labels
  calculateSummary(acc);
}

//Login Functionality Event Handler
let currentAccount;

function login(event) {
  //prevents the form from submitting

  event.preventDefault();
  containerApp.style.opacity = 100;
  currentAccount = accounts.find(account => account.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("Login By", currentAccount.owner);
    //Display UI Message 
    labelWelcome.textContent = `Hello ${currentAccount.owner.split(" ")[0]} `;
    updateUI(currentAccount);
    //Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
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
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    totalBalanceCalculator(accounts);
    updateUI(currentAccount);
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
    //Add movement
    currentAccount.movements.push(loanAmount);
    totalBalanceCalculator(accounts);
    updateUI(currentAccount);
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
    console.log(account1);
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
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//On click of balance we are logging movements to the console 
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('INR', ''))
  );
  console.log(movementsUI);
  //another way to get an array
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

/*
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

//Dates and Time
const now = new Date(); //creates a new date 
console.log(now);
console.log(new Date('Sept 01, 2023'));// not recommended but js can parse it.
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(0)); //Date Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)
//creating date after 5days of Jan011970 remember date and month always begins withzero
//so 4 days a day consists of 1 day = 24hrs 1hr = 60 mins 1 min = 60 sec 1 sec = 1000ms 
console.log(new Date(4 * 24 * 60 * 60 * 1000));
//To create a timestamp
//The Date.now() static method returns the number of milliseconds elapsed since the epoch, 
//which is defined as the midnight at the beginning of January 1, 1970, UTC.
console.log(Date.now());//1693743085503
console.log(new Date(1693743085503));