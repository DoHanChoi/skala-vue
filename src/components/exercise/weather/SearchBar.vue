<script setup>
defineProps({
  query: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

// 한글 IME 조합 중에도 즉시 반영하려고 v-model 대신 :value + @input을 쓴다
const handleInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <n-space vertical size="small">
    <!-- n-input은 IME 조합 중 입력을 흘려보내지 않아, 네이티브 input에 스타일만 입혔다 -->
    <input
      class="ime-input"
      type="text"
      placeholder="검색할 도시 이름 입력"
      :value="query"
      @input="handleInput"
    />
    <n-text depth="3" style="font-size: 13px">
      검색 중인 도시: <n-text strong>{{ query || '전체' }}</n-text>
    </n-text>
  </n-space>
</template>

<style scoped>
.ime-input {
  width: 100%;
  padding: 7px 12px;
  font-size: 14px;
  color: #2c3e50;
  background-color: #ffffff;
  border: 1px solid #e0e0e6;
  border-radius: 6px;
  outline: none;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
.ime-input:hover {
  border-color: #7ea6d4;
}
.ime-input:focus {
  border-color: #1971c2;
  box-shadow: 0 0 0 2px rgba(25, 113, 194, 0.2);
}
</style>
