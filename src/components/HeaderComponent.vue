<script setup>
import { ref } from 'vue'

const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})

// Состояние для открытия/закрытия меню
const isNavOpen = ref(false)

// Функции управления состоянием
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeNav = () => {
  isNavOpen.value = false
}
</script>

<template>
  <header
    class="flex item-center justify-between px-10 py-8 border-b border-state-300 sticky top-0 bg-white z-10"
  >
    <router-link to="/">
      <div class="flex items-center justify-between gap-[16px]">
        <img src="/logo.png" alt="Logo" class="w-7" />
        <div class="flex flex-col">
          <h2 class="text-black font-bold text-xs  sm:text-sm md:text-xl font-[Inter ] font-serif uppercase">
            Vue Sneakers
          </h2>
          <p class="text-[#9D9D9D] font-normal text-[8px] sm:text-sm font-[Inter ] font-serif">
            Магазин луще всех
          </p>
        </div>
      </div>
    </router-link>

    <div>
      <!-- Мобильное меню -->
      <section class="MOBILE-MENU flex md:hidden gap-6">
        <ul class="hidden sm:flex md:hidden">
          <li
            @click="() => emit('openDrawer')"
            class=" flex items-center cursor-pointer gap-2.5 text-gray-500 hover:text-black"
          >
            <img src="/cart.svg" alt="Cart" class=""/>
            <b class="">{{ totalPrice }} руб</b>
          </li>
        </ul>
        <div class="HAMBURGER-ICON space-y-2" @click="toggleNav">
          <span class="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span class="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span class="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        </div>

        <div :class="isNavOpen ? 'showMenuNav' : 'hideMenuNav'">
          <!-- Кнопка закрытия меню -->
          <div class="CROSS-ICON absolute top-0 right-0 px-8 py-8" @click="closeNav">
            <svg
              class="h-8 w-8 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <ul
            class="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-center gap-6 h-[80%] max-h-[50%]  min-w-[300px] bg-slate-700 px-4 py-4 "
          >
          <li
            @click="() => emit('openDrawer')"
            class=" flex items-center cursor-pointer gap-2.5 text-gray-500 hover:text-black"
          >
            <img src="/cart.svg" alt="Cart" class=""/>
            <b class="">{{ totalPrice }} руб</b>
          </li>
          
            <router-link to="/favorites" class=""  @click="closeNav">
              <li class=" flex items-center cursor-pointer gap-2.5 text-gray-500 hover:text-black ">
                <img src="/heart.svg" alt="Heart" />
                <b>Закладки</b>
              </li>
            </router-link>

            <li class="flex items-center cursor-pointer gap-2.5 text-gray-500 hover:text-black">
              <img src="/profile.svg" alt="Profile" />
              <b>Профиль</b>
            </li>
          
          </ul>
        </div>
      </section>

      <ul class="hidden space-x-8 md:flex justify-between items-center gap-[32px]">
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
    </div>
  </header>
</template>

<style scoped>
.hideMenuNav {
  display: none;
}
.showMenuNav {
  display: block;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: white;
  z-index: 30;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
