<script setup>
defineProps({
  title: String,
  imageUrl: String,
  description: String
})
</script>

<template>
  <div class="flex flex-col item-center text-center w-72 mx-auto">
    <img width="70" height="70" :src="imageUrl" :alt="title" class="mx-auto" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>
