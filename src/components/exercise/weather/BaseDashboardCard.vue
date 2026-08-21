<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <n-card class="dashboard-card" size="small" :title="title" :bordered="true">
    <slot>
      <p>표시할 내용이 없습니다.</p>
    </slot>
  </n-card>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 16px;
}
</style>
