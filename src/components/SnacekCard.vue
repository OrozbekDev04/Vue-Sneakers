<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorites: Function
})
</script>

<template>
  <div
    class=" px-1 py-1 flex flex-col items-center gap-3.5 w-[210px] h-[270px]
     cursor-pointer rounded-[40px] bg-white border border-[#F3F3F3] relative 
     pt-[20px] transition hover:-translate-y-2 hover:shadow-xl
     
     "
     
  >
    <img
      
      :src="isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like"
      class="w-8 absolute top-6 left-10"
      @click="onClickFavorites"
    />
    <img :src="imageUrl" :alt="title" class="w-[120px]" />
    <p class="text-black text-center">{{ title }}</p>
    <div class="flex justify-between gap-[39px]">
      <div class="flex flex-col">
        <span class="text-state-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>
      <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="plus" @click="onClickAdd" />
    </div>
  </div>
</template>
