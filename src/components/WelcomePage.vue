<template>
  <div class="welcome-page">
    <div class="overlay">
      <div class="content">
        <h1>Welcome to Prime Number Fun!</h1>
        <p>Select how you want to calculate prime numbers:</p>
        <div class="button-group">
          <PrimeButton label="Without Web Workers" icon="pi pi-times" class="custom-button custom-button-danger" @click="navigateTo('without-workers')" />
          <PrimeButton label="With a Web Worker" icon="pi pi-cog" class="custom-button custom-button-info" @click="navigateTo('with-worker')" />
          <PrimeButton label="With Multiple Web Workers" icon="pi pi-sitemap" class="custom-button custom-button-success" @click="navigateTo('with-multiple-workers')" />
        </div>
        <div class="fun-fact">
          <p>Fun Fact: The largest known prime number has over 24 million digits!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(option) {
      this.$router.push({ name: option });
    }
  }
};
</script>

<style scoped>
.welcome-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/background.jpg'); /* Ensure this image exists */
  background-size: cover;
  background-position: center;
  color: #ffffff;
}

.overlay {
  background-color: rgba(34, 34, 34, 0.8); /* Return to the dark, neutral overlay */
  padding: 60px; /* Keep the increased padding for a larger content area */
  border-radius: 20px; /* Rounded corners for a softer look */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);
}

.content {
  text-align: center;
}

h1 {
  font-family: 'Roboto', sans-serif;
  font-size: 3em; /* Keep the increased font size for the title */
  margin-bottom: 20px;
  color: #FF6F61; /* Vibrant coral color for the title */
}

p {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #ffffff;
}

.button-group {
  display: flex;
  justify-content: center; /* Center the buttons horizontally */
  gap: 20px; /* Space between buttons */
  margin-top: 20px;
}

.custom-button {
  background-color: rgba(255, 255, 255, 0.2); /* Transparent background */
  color: #ffffff;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1.1em;
  text-transform: uppercase;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
}

.custom-button .p-button-icon {
  margin-right: 10px !important; /* Force margin to apply */
}

.custom-button-danger {
  background-color: rgba(255, 69, 58, 0.8); /* Vibrant red with transparency */
}

.custom-button-info {
  background-color: rgba(0, 122, 255, 0.8); /* Vibrant blue with transparency */
}

.custom-button-success {
  background-color: rgba(52, 199, 89, 0.8); /* Vibrant green with transparency */
}

.custom-button:hover {
  background-color: rgba(255, 255, 255, 0.3); /* Slightly lighter on hover */
}

.fun-fact {
  margin-top: 30px;
  font-style: italic;
  color: #ffffff; /* White color for the fun fact text */
}
</style>
