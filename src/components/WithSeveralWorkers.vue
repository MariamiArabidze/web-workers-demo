<template>
    <div class="prime-calc-page">
      <div class="overlay">
        <button @click="goToMainMenu" class="back-button">
          <i class="pi pi-arrow-left"></i> <!-- PrimeVue icon for the back arrow -->
        </button>
        <h1>Calculate Prime Numbers using Multiple Web Workers</h1>
        <p>Enter the upper limit for prime number calculation:</p>
        <input v-model.number="maxNumber" type="number" placeholder="Enter upper limit" class="input-number" />
        <p>Enter the number of workers to use:</p>
        <input v-model.number="workerCount" type="number" placeholder="Enter number of workers" class="input-number" />
        <button @click="prepareCalculation" class="calculate-button">Calculate Primes</button>
        
        <div class="result-section" v-if="hasCompleted">
          <h2>Calculation completed in {{ calculationTime }} milliseconds.</h2>
          <!-- <div class="result-list">
            <div v-for="prime in primeNumbers" :key="prime" class="result-item">{{ prime }}</div>
          </div> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        maxNumber: 100000000, // Default to 100 million
        primeNumbers: [], // Array to store prime numbers
        calculationTime: 0, // Time taken for calculation
        workerCount: 4, // Default number of workers (chunks)
        workers: [], // Array to store workers
        hasCompleted: false
      };
    },
    methods: {
      prepareCalculation() {
        // Clear previous results and eset calculation time

        console.log('prepareCalculation')
        this.primeNumbers = [];
        this.calculationTime = 0;
  
        // Validation for input values
        if (this.workerCount < 1 || this.maxNumber < 2) {
          alert("Please enter a valid number of workers and a limit greater than 1.");
          return;
        }
  
        // Start the worker processing
        this.startWorkers();
      },
      startWorkers() {
        const chunkSize = Math.ceil(this.maxNumber / this.workerCount);
        let completedWorkers = 0;
        const startTime = performance.now();
  
        for (let i = 0; i < this.workerCount; i++) {
          const start = i * chunkSize + 1;
          const end = Math.min((i + 1) * chunkSize, this.maxNumber);
          const worker = new Worker(new URL('@/workers/severalWorkers.js', import.meta.url));
  console.log(start, end)
          worker.onmessage = (event) => {
            // Collect results from each worker
            // this.primeNumbers = this.primeNumbers.concat(event.data);
            console.log(event)
            completedWorkers += 1;
  
            // Terminate the worker once done
            worker.terminate();
  
            // Check if all workers are done
            if (completedWorkers === this.workerCount) {
              // Sort the collected prime numbers
            //   this.primeNumbers.sort((a, b) => a - b);
  this.hasCompleted = true
              // Calculate the total time taken
              const endTime = performance.now();
              this.calculationTime = Math.round(endTime - startTime);
            }
          };
  
          // Post the range to the worker
          worker.postMessage({ start, end });
          this.workers.push(worker);
        }
      },
      goToMainMenu() {
        this.$router.push('/'); // Navigate back to the main menu (replace '/' with the correct route if necessary)
      },
    },
    beforeUnmount() {
      // Terminate all workers if component is destroyed
      this.workers.forEach(worker => worker.terminate());
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
    background-color: rgba(0, 128, 128, 0.85); /* Teal background to differentiate */
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
  