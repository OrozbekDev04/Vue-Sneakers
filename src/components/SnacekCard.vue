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
    class="w-[80px] h-full rounded-[10px] md:px-1 py-1 flex flex-col items-center gap-3.5 sm:w-[210px] sm:h-[270px]
     cursor-pointer sm:rounded-[40px] bg-white border border-[#F3F3F3] relative 
     pt-[20px] transition hover:-translate-y-2 hover:shadow-xl
     
     "
     
  >
    <img
      
      :src="isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like"
      class="w-5 sm:w-8 absolute top-1 sm:top-6 right-1 sm:left-10"
      @click="onClickFavorites"
    />
    <img :src="imageUrl" :alt="title" class="w-10  sm:w-[120px]" />
    <p class="text-black text-xs text-center sm:text-sm ">{{ title }}</p>
    <div class="flex justify-between gap-2 sm:gap-[39px]">
      <div class="flex flex-col">
        <span class="text-state-400 text-[8px] sm:text-sm">Цена:</span>
        <b class="text-[8px] sm:text-sm">{{ price }} руб.</b>
      </div>
      <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="plus" @click="onClickAdd" class="w-5 sm:w-8"/>
    </div>
  </div>
</template>
