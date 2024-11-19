<script setup>
import SneakerCard from './SnacekCard.vue'

defineProps({
  itemsData: Array,
})  

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <SneakerCard
      v-for="item in itemsData"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickFavorites="() => emit('addToFavorite', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>

<style scoped>
/* Ваши стили */
</style>
