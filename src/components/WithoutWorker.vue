<template>
    <div class="prime-calc-page">
      <div class="overlay">
        <button @click="goToMainMenu" class="back-button">
          <i class="pi pi-arrow-left"></i> <!-- PrimeVue icon for the back arrow -->
        </button>
        <h1>Calculate Prime Numbers Without Web Worker</h1>
        <p>Enter a number to calculate prime numbers up to that value:</p>
        <input v-model.number="maxNumber" type="number" placeholder="Enter a number" class="input-number" />
        <button @click="calculatePrimes" class="calculate-button">Calculate Primes</button>
        
        <div class="result-section" v-if="primeNumbers.length > 0">
          <h2>Congrats! You just wasted {{ calculationTime }} milliseconds of your life.</h2>
          <div class="result-list">
            <div v-for="prime in primeNumbers" :key="prime" class="result-item">{{ prime }}</div>
          </div>
        </div>
  
        <div class="register-section" v-if="showRegister">
          <h3>Register Here</h3>
          <form @submit.prevent="submitForm">
            <input type="text" v-model="name" placeholder="Name" class="form-input" />
            <input type="email" v-model="email" placeholder="Email" class="form-input" />
            <button type="submit" class="register-button">Register</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        maxNumber: 10000000, // Large enough to demonstrate the unresponsiveness
        primeNumbers: [],
        calculationTime: 0,
        showRegister: false,
        name: '',
        email: '',
      };
    },
    methods: {
      calculatePrimes() {
        this.showRegister = true; // Show the register section first
  
        const startTime = performance.now();
        this.primeNumbers = []; // Clear previous results
  
        for (let i = 2; i <= this.maxNumber; i++) {
          if (this.isPrime(i)) {
            this.primeNumbers.push(i);
          }
        }
  
        const endTime = performance.now();
        this.calculationTime = Math.round(endTime - startTime);
      },
      isPrime(n) {
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) {
            return false;
          }
        }
        return true;
      },
      submitForm() {
        alert(`Registered ${this.name} with email ${this.email}`);
        this.name = '';
        this.email = '';
      },
      goToMainMenu() {
        this.$router.push('/'); // Navigate back to the main menu (replace '/' with the correct route if necessary)
      },
    },
  };
  </script>
  
  <style scoped>
  .prime-calc-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
    background-color: rgba(123, 104, 238, 0.85); /* Medium Slate Blue, fun and more transparent */
    color: #ffffff;
    overflow-y: auto;
  }
  
  .overlay {
    background-color: rgba(34, 34, 34, 0.7); /* Slightly lighter dark overlay */
    padding: 60px;
    border-radius: 20px;
    width: 100%;
    max-width: 1000px; /* Increase max-width for bigger content area */
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);
    position: relative;
  }
  
  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 2em;
    margin-bottom: 20px;
    color: #FFDD57; /* Warm yellow for the title */
    text-align: center;
  }
  
  p {
    font-family: 'Roboto', sans-serif;
    font-size: 1.2em;
    margin-bottom: 20px;
    color: #ffffff;
  }
  
  .input-number {
    padding: 10px;
    font-size: 1.1em;
    border-radius: 5px;
    border: none;
    width: 100%;
    margin-bottom: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  }
  
  .calculate-button {
    background-color: #007AFF; /* Vibrant blue button */
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    font-size: 1.2em;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
    width: 100%;
  }
  
  .result-section {
    background-color: rgba(255, 255, 255, 0.1); /* Light transparent background */
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    width: 100%;
    max-height: 150px; /* Limited height */
    overflow-y: auto; /* Scrollable content */
  }
  
  .result-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .result-item {
    flex: 1 1 calc(25% - 10px); /* Four columns */
    background-color: rgba(255, 255, 255, 0.2);
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    color: #ffffff;
  }
  
  .register-section {
    background-color: rgba(34, 34, 34, 0.9); /* Darker background to stand out */
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin-top: 30px;
  }
  
  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #FFDD57; /* Warm yellow for the subtitle */
  }
  
  .form-input {
    padding: 10px;
    font-size: 1.1em;
    border-radius: 5px;
    border: none;
    width: calc(100% - 22px);
    margin-bottom: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  }
  
  .register-button {
    background-color: #34C759; /* Vibrant green button */
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    font-size: 1.2em;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    width: 100%;
  }
  
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: transparent;
    color: #FFDD57;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
  }
  </style>
  