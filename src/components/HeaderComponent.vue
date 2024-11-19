<script setup>
const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})
</script>

<template>
  <header
    class="flex item-center justify-between px-10 py-8 border-b border-state-300 sticky top-0 bg-white z-10"
  >
    <router-link to="/">
      <div class="flex items-center justify-between gap-[16px]">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div class="flex flex-col">
          <h2 class="text-black font-bold text-xl font-[Inter ] font-serif uppercase">
            Vue Sneakers
          </h2>
          <p class="text-[#9D9D9D] font-normal text-sm font-[Inter ] font-serif">
            Магазин луще всех
          </p>
        </div>
      </div>
    </router-link>

    <ul class="flex justify-between items-center gap-[32px]">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-2.5 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-2.5 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Heart" />
          <b>Закладки</b>
        </li>
      </router-link>

      <li class="flex items-center cursor-pointer gap-2.5 text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="Profile" />
        <b>Профиль</b>
      </li>
    </ul>
  </header>
</template>
