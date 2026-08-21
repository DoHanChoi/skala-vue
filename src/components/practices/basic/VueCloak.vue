<script setup>
import { ref } from 'vue'

const message = ref('느린 네트워크에서도 안전하게 출력되는 메시지!')
</script>

<template>
    <div v-cloak class="practice-section">
        <h2>v-cloak 디렉티브 학습</h2>
        <p>{{ message }}</p>
    </div>
</template>

<style scoped>
/* Vue 로딩 완료 전까지 미완성 템플릿 노출 방지 */
[v-cloak] {
    display: none !important;
}
</style>