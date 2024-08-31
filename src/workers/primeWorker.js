
self.onmessage = function(e) {
    const maxNumber = e.data;
    const primes = [];

    function isPrime(n) {
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    for (let i = 2; i <= maxNumber; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }

    self.postMessage(primes);
};
