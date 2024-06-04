<template>
  <div>
    <n-button @click="updateMessage">Click me</n-button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from './store/index.js';

const mainStore = useMainStore();

const updateMessage = () => {
  mainStore.fetchMessage();
};

const message = computed(() => mainStore.message);
</script>