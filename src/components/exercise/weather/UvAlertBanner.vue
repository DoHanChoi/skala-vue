<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <n-alert class="uv-alert" type="warning" :show-icon="false">{{ message }}</n-alert>
</template>

<style scoped>
.uv-alert {
  margin-bottom: 12px;
}
</style>
