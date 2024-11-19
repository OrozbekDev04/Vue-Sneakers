<script setup>

const emit = defineEmits(['onClickRemove']);

defineProps({
  id: Number,
  title: String,
  price: Number,
  imageUrl: String,
})
</script>

<template>
  <div class="flex items-center justify-around gap-5 border border-slate-200 p-4 rounded-xl mb-5">
    <img :src="imageUrl" :alt="title" class="w-16 h-16" />
    <div class="flex flex-col flex-1">
      <p>{{title}}</p>
      <div class="flex item-center justify-between mt-2">
        <b class="flex-1">{{price}} руб.</b>
        <img
        @click="emit('onClickRemove')"
          src="/close.svg"
          alt=""
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
        />
      </div>
    </div>
  </div>
</template>
