'use strict'


// BANKIST APP

// Data
const account1 = {
    owner: 'Sahadat Hossain',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3100, -1000, 8500, 30],
    interestRate: 1.5,
    pin: 2222,
};
const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 1111
};
const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, -543, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// nev
const labelWelcome = document.querySelector('.welcome');
const login_form = document.querySelector('.login');
const login__input__user = document.querySelector('.login__input__user');
const login__input__pin = document.querySelector('.login__input__pin');
const login__btn = document.querySelector('.login__btn');


//Main
const containerApp = document.querySelector('.app');
const labelDate = document.querySelector('.date');
const balance__value = document.querySelector('.balance__value');
const container_Movements = document.querySelector('.movements');

//Summary value
const summary__value__in = document.querySelector('.summary__value__in');
const summary__value__out = document.querySelector('.summary__value__out');
const summary__value__interest = document.querySelector('.summary__value__interest');
const form_page_sort = document.querySelector('.form_page_sort');

//Transform page
const form_input_to = document.querySelector('.form_input_to');
const form_input_amount = document.querySelector('.form_input_amount');
const form_btn_transfer = document.querySelector('.form_btn_transfer');

//Request page
const Request_Loan_text = document.querySelector('.Request_Loan_text');
const form_input_loan = document.querySelector('.form_input_loan');
const form_btn_request = document.querySelector('.form_btn_request');

//btn-close
const form_input_username = document.querySelector('.form_input_username');
const form_input_pin = document.querySelector('.form_input_pin');
const form_btn_close = document.querySelector('.form_btn_close');


const labelTimer = document.querySelector('.timer');

const inputLoanAmount = document.querySelector('.form__input--loan--amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const calcDisplayBalance =function(acc){
   acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
balance__value.textContent= `${acc.balance.toFixed(2)} €`;
}



const calcdisplayMovements = function(movements, sort = false) {
    container_Movements.innerHTML = ' ';
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
    movs.forEach((mov, i) => {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">
                ${i + 1} ${type}</div>
                <div class="movements__value">
                ${mov.toFixed(2) }</div>
            </div>`;
    container_Movements.insertAdjacentHTML('afterbegin',html);
    });
};



const calcDisplaySummary =function(movement){
    const income = movement
    .filter(mov=> mov > 0)
    .reduce((acc, mov)=> acc + mov , 0);
    summary__value__in.textContent= ` ${income.toFixed(2)} €`;
    const out = movement
    .filter(mov=> mov < 0)
    .reduce((acc, mov)=> acc + mov , 0) ;
    summary__value__out.textContent = ` ${out.toFixed(2)} €`    
    const interest = movement
    .filter(mov=> mov > 0)
    .map(acc => acc * 1.2/100)
    .reduce((acc, int)=> acc + int , 0) ;
    summary__value__interest.textContent = ` ${interest.toFixed(2)} €`
 };


 
// Creat username
const creatUserName = function(accs){
   accs.forEach(function(acc){
    acc.userName = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join("");
        return acc.userName;        
 })};
creatUserName(accounts);

//Event Handeler Login btn


let currentAccount;
login__btn.addEventListener('click', function(e){
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.userName === login__input__user.value);

    if(currentAccount?.pin === Number(login__input__pin.value)) {   
    labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner}`;
    containerApp.style.opacity = 100;
    login__input__user.value = '';
    login__input__pin.value = '';
    login__input__user.blur();
        login__input__pin.blur();
        UpdateUI(currentAccount);
}else{
    alert("UserName & Password worng");
}
});

const UpdateUI = function(acc){
    calcDisplayBalance(acc);
    calcdisplayMovements(acc.movements);
    calcDisplaySummary(acc.movements);
}

//Transform money
form_btn_transfer.addEventListener('click',function(e){
    e.preventDefault();
    const amount = Number(form_input_amount.value);
    const receverAcc = accounts.find(
        acc => acc.userName === form_input_to.value
    );
    form_input_amount.value = form_input_to.value = '';
    if (amount > 0 &&
        // receverAcc &&
        currentAccount.balance >= amount &&
        receverAcc.userName !== currentAccount.userName){
        currentAccount.movements.push(-amount);
        receverAcc.movements.push(amount);
        UpdateUI(currentAccount);
    }
})

form_btn_request.addEventListener('click',function(e){
    e.preventDefault();
    const amount = Number(form_input_loan.value);

    const findMov_loan = currentAccount.movements
        .reduce((mov, acc) => mov + acc )/ 10;
        console.log(findMov_loan);
    if(amount > 0 && amount <= findMov_loan ){
        currentAccount.movements.push(amount);
        UpdateUI(currentAccount);
    }
})

form_btn_close.addEventListener('click', function(e){
    e.preventDefault();
    if (currentAccount.userName === form_input_username.value &&
        currentAccount.pin === Number(form_input_pin.value)){
            const index = accounts.findIndex
            (acc => acc.userName === currentAccount.userName);
        accounts.splice(index, 1)
        containerApp.style.opacity = 0;
}
    form_input_pin.value = form_input_username.value = " ";
});

let sorted = false;
form_page_sort.addEventListener('click', function(e){
    e.preventDefault();
    calcdisplayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});














// Deposite and Withdrow
// const movements = [5000, 3400, -150, -790, -3100, -1000, 8500, 30];

// var allMov = 0;
// for (const i of movements) {
//     allMov += i;
// }
//     console.log(allMov);

// const deposite = movements.filter(function(mov){
//     return mov > 0;
// })
// console.log(deposite);

// const withdraw = movements.filter(function(mov){
//     return mov < 0;
// })
// console.log(withdraw);

// const depositeAll = movements.reduce(function(acc, mov){
//     return acc + mov;
// }, 0)
// console.log(depositeAll);

// const withdrawAll = withdraw.reduce(function(acc, mov){
//     return acc + mov;
// }, 0)
// console.log(withdrawAll);
// console.log(depositeAll + withdrawAll);

//Map mathod
// const calcAverageHumanAge = ages => { 
// const humanAges =
//     ages.map(age => (age <=2 ? 2 * age : 16 + age * 4));
// const adults = humanAges.filter(age => age>=18);
// console.log(humanAges);
// console.log(adults);
// const average = adults.reduce(
//     (acc, age) => acc + age, 0)/adults.length;
//     console.log(average) ;
// }

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])



// const overalBalance = accounts
//     .flatMap(mov => mov.movements)
    // .flat()
    // .reduce((mov, acc) => mov + acc );
// console.log(overalBalance);

// overalBalance.sort((a, b) => {
//     if (a < b) return -1;
//     if (a > b) return 1;
// })
// overalBalance.sort((a, b) => {return b - a });
// console.log(overalBalance);



// 152 The Magic of Chaining Methods

//161
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// //Emprty arrays + fill method
// const x = new Array (7);
// console.log(x);
// console.log(x.map (() => 5));
// x.fill(1, 3, 5);
// // x.fill(1);
// console.log(x);

// arr.fill(23, 2, 5);
// console.log(arr);

// Array.form
// const y = Array.from({ length: 7}, () => 1);
// console.log(y);
// const z = Array.from({ length: 7}, (cur, i) => i + 1);
// console.log(z);


// balance__value.addEventListener('click', function(){
//     const movementsUI = document.querySelectorAll('.movements__value');

//     console.log(movementsUI);
// })

// 163
// const dogs = [
//     { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//     { weight: 8, curFood: 200, owners: ['Matilda'] },
//     { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//     { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// console.log(dogs);

// dogs.forEach(dog => dog.recFood = Math.trunc(dog.weight ** 0.75 * 28));

// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah')
// ); 
// console.log(dogSarah); 
// console.log(`Sarah's dog is eating ${
//     dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
// }`
// );

// const ownersEatTooMuch = dogs
//     .filter(dog => dog.curFood > dog.recFood)
//     .map(dog => dog.owners)
//     .flat();
//     console.log(ownersEatTooMuch);



// const ownersEatTooLittle = dogs
//     .filter(dog => dog.curFood < dog.recFood)
//     .map(dog => dog.owners)
//     .flat();
// console.log(ownersEatTooLittle);

// console.log(`${ownersEatTooMuch.join(' and ')}'s 
// dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s 
// dogs eat too little!`);

// console.log(dogs.some( dog => dog.curFood === dog.recFood));

// const dogAnaliz = dog => 
//     dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
//     console.log(dogs.some(dogAnaliz));

// console.log(dogs.filter(dogAnaliz));

// const dogSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// console.log(dogSorted);
// console.log(dogs);

// 166
// console.log(23 === 23.0);

// // Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// //Binary base 2 - 0 1

// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// //Conversion
// console.log(Number('23'));
// console.log(+'23');

// //Parsing
// console.log(Number.parseInt('20px', 10));
// console.log(Number.parseInt('px20', 10));

// //167
// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// console.log(23.3);
// console.log(23.9);

// console.log(Math.floor(23.3));
// console.log(Math.floor('23.9'));

// console.log(Math.trunc(23.3));
// console.log(Math.trunc(23.9));

// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));

// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log((2.345).toFixed(2));
// console.log(+(2.345).toFixed(2));