<script setup>
const welcomMessage = 'Welcome to Skala-Vue'
</script>

<template>
  <div class="practice-section">
    <h2>{{ welcomMessage }}</h2>
    <p>{{ welcomMessage.toUpperCase() }}</p>
    <p>{{  'Random number: ' + Math.ceil(Math.random() * 100) }}</p>
  </div>
</template>