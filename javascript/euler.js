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
  var ps = primes(Math.floor(Math.sqrt(num)));
  var factor = 1;
  for (var i = 0; i < ps.length; i++) {
    if (num % ps[i] === 0 && ps[i] > factor) {
      factor = ps[i]
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

function primes(n = 2) {
  // Iterate through natural numbers
  // If number is prime, mark its mutiples
  // Auto mark all even numbers
  const LIMIT = n;
  const wheel = [2, 3, 5, 7, 11];
  var numbersAndMarks = [
    [1, true],
    [2, false],
    [3, false],
    [4, true],
    [5, false],
    [6, true],
    [7, false],
    [8, true],
    [9, true],
    [10, true],
    [11, false],
    ];
  // setup all numbers
  // mark all wheel-based intervals
  for (var i = 12; i <= LIMIT; i++) {
    if (wheel.some(function(prime) { return i % prime === 0 })) {
      numbersAndMarks.push([i, true]);
    } else {
      numbersAndMarks.push([i, false]);
    }
  }
  // iterate over odd numbers using the index (index even for odd numbers)
  for (var i = 2; i < numbersAndMarks.length; i += 2) {
    var [number, marked] = numbersAndMarks[i];
    if (!marked) {
      // iterate over multiples
      for (var j = number + number; j < numbersAndMarks.length; j += number) {
        numbersAndMarks[j-1] = [j, true];
      }
    }
  }
  var primes = [];
  var markedPrimes = numbersAndMarks.forEach(function (nm) {
    var [number, marked] = nm;
    if(!marked) {
      primes.push(number);
    }
  });

  return primes;
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
  var ps = primes(20);
  var primeFactors = {};
  ps.map(function(p) {
    primeFactors[p] = 0;
  });
  const START = 2;
  const END = 20;
  for (var num = START; num <= END; num++) {
    for (var psIndex = 0; psIndex < ps.length; psIndex++) {
      var prime = ps[psIndex];
      var count = factorCount(num, prime);
      if(count > 0 && primeFactors[prime] < count) {
        primeFactors[prime] = count;
      }
    }
  }
  var lcm = ps.reduce(function(acc, prime) {
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
  var prime = primes(200000)[10000];
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

/*
A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

a2 + b2 = c2
For example, 32 + 42 = 9 + 16 = 25 = 52.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.
*/
function problem009() {
  var isTriplet = function isTriplet(a, b, c) {
    return a * a + b * b == c * c;
  };
  const LIMIT = 500;
  var done = false;
  var result = 0;
  for (var a = 1; a < LIMIT; a++) {
    for (var b = a; b < LIMIT; b++) {
      for (var c = b; c < LIMIT; c++) {
        if (a + b + c === 1000 && isTriplet(a, b, c)) {
          result = a * b * c;
          break;
        }
      }
    }
  }
  console.log("Problem 009: " + result);
}

/*
The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.
*/
function problem010() {
  var sum = primes(2000000).reduce(function(acc, n) { return acc + n });
  console.log("Problem 010: " + sum);
}