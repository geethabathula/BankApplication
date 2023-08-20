'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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
  ['GBP', 'Pound sterling'],
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
const displayMovements = function (movement) {
  containerMovements.innerHTML = "";
  movement.forEach(function (movement, i) {
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
const displayCurrentBalance = function (accounts) {
  labelBalance.innerHTML = `<strong>INR </strong>${accounts.balance}`;
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
  labelSumIn.innerHTML = `<strong>INR </strong>${depositValue}`;
  labelSumOut.innerHTML = `<strong>INR </strong>${Math.abs(withdrawalValue)}`;
  labelSumInterest.innerHTML = `<strong>INR </strong>${interest}`;
}

console.log(accounts);

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
    //Display Movements
    displayMovements(currentAccount.movements);
    //Display Balance
    displayCurrentBalance(currentAccount);
    //Display Summary Labels
    calculateSummary(currentAccount);
    //Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  }
}
btnLogin.addEventListener('click', function (e) {
  login(e);
});

/**
const accountUsernames = [];
accountUsernames.push(account1.owner);
accountUsernames.push(account2.owner);
accountUsernames.push(account3.owner);
accountUsernames.push(account4.owner);
function generateUser(...accountUsernames) {
  let splittedArray = accountUsernames.toLowerCase().split(" ");
  let [f, l] = splittedArray;
  let username = f[0] + l[0];
  console.log(username);
}


/* Generating Password
const pwds = [];
const passwordGenerator = function () {
  for (let i = 1; i <= users.length; i++) {
    pwds.push(`${i}`.repeat(4));
  }
}*/

/*
Calculating max value using reduce
Actually reduce acts as sum=0 while we are calculating
sum of the array

const arr = [1, 2, 10, 9, 15, 30];
const maxVal = arr.reduce(function (val, acc) {
  if (val > acc) return val;
  else return acc;
}, arr[0]);//30
*/
