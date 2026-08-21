<script setup>
import { ref } from 'vue'

// 일반 변수: 값이 바뀌어도 화면은 갱신되지 않는다
let normalCount = 0
// 반응형 변수: 값이 바뀌면 화면이 다시 그려진다
const vueCount = ref(0)
</script>

<template>
    <div class="practice-section">
        <h2>hello Skala-Vue</h2>
        <h3>일반 변수 클릭: {{ normalCount }}</h3>
        <button @click="normalCount++">일반 변수 증가</button>
        <br />
        <h3>Vue 반응형 변수 클릭: {{ vueCount }}</h3>
        <button @click="vueCount++">Vue 변수 증가</button>
    </div>
</template>