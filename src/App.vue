<script setup>
import Drawer from './components/CartDrawer.vue'
import { computed, provide , ref, watch } from 'vue'
import Header from './components/HeaderComponent.vue'
import { toast } from 'vue3-toastify'
// import 'vue3-toastify/dist/index.css'
/* Корзина (START))*/
const cart = ref([])
const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const drawerOpen = ref(false)


// const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
  toast.success('Item added to cart!', {
    autoClose: 1200
  })
}
const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  toast.success('Item removed from cart!', {
    autoClose: 1200
  })
  item.isAdded = false
}



watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
})

/* Корзина (END))*/

</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
  />
  <div class="bg-[#FFF] w-full lg:w-4/5 m-auto h-auto rounded-xl shadow-xl ">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="py-10 px-[80px]">
       <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
