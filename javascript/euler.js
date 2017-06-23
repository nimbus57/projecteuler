/*
 If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.
*/
function problem001() {
  var start = 1;
  var end = 1000;
  var sum = 0;

  for (var i = start; i < 1000; i++) {
    if (i % 3 == 0 || i % 5 == 0) {
      sum += i;
    }
  }
  console.log("Problem 001: " + sum);
}

/*
Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:

1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.
*/

function problem002() {

  var sum = fibonaccis(4000000).reduce(function (a, v) { return v % 2 == 0 ? a + v : a }, 0)
  console.log("Problem 002: " + sum);
}

function fibonaccis(stopWhen = 2) {
  var fib1 = 1;
  var fib2 = 2;
  var currentFib = fib2;
  var nextFib = fib1 + fib2;
  var fibs = [fib1, fib2];

  while (nextFib < stopWhen) {
    fibs.push(nextFib);
    var nextFibTemp = nextFib;
    nextFib = currentFib + nextFibTemp;
    currentFib = nextFibTemp;
  }
  return fibs;
}

/*
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?
*/

function problem003() {
  var num = 600851475143;
  var primes = primesUpTo(Math.floor(Math.sqrt(num)));
  var factor = 1;
  for (var i = 0; i < primes.length; i++) {
    if (num % primes[i] === 0 && primes[i] > factor) {
      factor = primes[i]
    }
  }
  console.log("Problem 003: " + factor);
}

function isPrime(num) {
  if (num === 1) {
    return false;
  } else if (num === 2) {
    return true;
  } else if (num % 2 === 0) {
    return false;
  } else {
    var start = 3;
    var limit = Math.floor(Math.sqrt(num));
    var end = limit < num ? num : limit;
    for (var i = start; i < end; i += 2) {
      if (num % i == 0) {
        return false;
      }
    }
  }
  return true;
}

function primesUpTo(num) {
  var wheel = [2]
  for (var i = 3; i <= num; i += 2) {
    wheel.push(i);
  }
  for (var index = 1; index < wheel.length; index++) {
    var nextVal = wheel[index];
    var indicesToRemove = [];
    for (var i = index + 1; i < wheel.length; i++) {
      if (wheel[i] % nextVal === 0) {
        indicesToRemove.push(i)
      }
    }
    for (var i = indicesToRemove.length - 1; i >= 0; i--) {
      wheel.splice(indicesToRemove[i], 1);
    }
  }
  return wheel;
}

/*
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.
*/
function problem004() {
  var start = 100;
  var end = 999;
  var largest = 0;
  for (var i = start; i <= end; i++) {
    for (var j = i + 1; j <= end; j++) {
      var product = i * j;
      if (isPalindromeNumber(product) && product > largest) {
        largest = product;
      }
    }
  }
  console.log("Problem 004: " + largest);
}

function isPalindromeNumber(num) {
  return num === parseInt(num.toString().split("").reverse().join(""));
}

/*
2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
*/
function problem005() {
  var primes = primesUpTo(20);
  var primeFactors = {};
  primes.map(function(p) {
    primeFactors[p] = 0;
  });
  const START = 2;
  const END = 20;
  for (var num = START; num <= END; num++) {
    for (var primesIndex = 0; primesIndex < primes.length; primesIndex++) {
      var prime = primes[primesIndex];
      var count = factorCount(num, prime);
      if(count > 0 && primeFactors[prime] < count) {
        primeFactors[prime] = count;
      }
    }
  }
  var lcm = primes.reduce(function(acc, prime) {
    console.log(prime, primeFactors[prime]);
    return acc * prime ** primeFactors[prime]
  }, 1);
  console.log("Problem 005: " + lcm);
}

function factorCount(number, factor) {
  var count = 0;
  if(number % factor === 0) {
    count++;
    var result = number / factor;
    while(result % factor === 0) {
      count++;
      result = result / factor;
    }
  }
  return count;
}

/*
The sum of the squares of the first ten natural numbers is,

12 + 22 + ... + 102 = 385
The square of the sum of the first ten natural numbers is,

(1 + 2 + ... + 10)2 = 552 = 3025
Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
*/
function problem006() {
  var l = [];
  for(var n = 1; n <= 100; n++) {
    l.push(n);
  }
  var sumOfSquares = l.reduce(function(acc, n) {
    return acc + n * n
  }, 0);
  var squareOfSums = l.reduce(function(acc, n) {
    return acc + n;
  }, 0) ** 2;
  console.log("Problem 006: " + (squareOfSums - sumOfSquares));
}
/*
By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

What is the 10 001st prime number?
*/
function problem007() {
  var prime = primesUpTo(200000)[10000];
  console.log("Problem 007: " + prime);
}

/*
Find the thirteen adjacent digits in the 1000-digit number that have the greatest product. What is the value of this product?
*/
function problem008() {
  const numberAsString = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";
  var numbers = numberAsString.split('').map(function(n) { return parseInt(n) });
  const windowSize = 13;
  var greatestProduct = 0;
  for(var index = 0; index < numbers.length - windowSize; index++) {
    var window = numbers.slice(index, index + windowSize);
    var product = window.reduce(function(acc, n) {
      return acc * n;
    }, 1);
    if(product > greatestProduct) {
      greatestProduct = product;
    }
  }
  console.log("Problem 008: " + greatestProduct);
}