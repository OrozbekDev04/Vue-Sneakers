<script setup>
import axios from 'axios'
import { computed, inject, ref } from 'vue'
import DrawerHead from './CartDrawerHead.vue'
import CartItemsList from './CartItemListCart.vue'
import InfoBlock from './InfoBlockComponent.vue'
const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
  // disabledButton: Boolean
})
const { closeDrawer, cart } = inject('cart')
const isCreating = ref(false);
const orderId = ref(null);

const cartIsEmpty = computed(() => cart.value.length === 0)

const createOrder = async () => {
  try {
    isCreating.value = true

    const { data } = await axios.post(`https://3d8c5b1a1c7563a9.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })
    cart.value = [];

    return orderId.value = data.id
  } catch (error) {
    console.log(error)
  } finally {
    isCreating.value = false
  }
}
const ButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>
<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-20 opacity-70"></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
      <DrawerHead />

      <CartItemsList />
      <div v-if="!totalPrice || orderId" class="flex flex-col justify-center h-full items-center">
        <InfoBlock
          v-if="!totalPrice && !orderId"
          title="Корзина пустая"
          description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
          imageUrl="/package-icon.png"
        />

        <InfoBlock
          v-if="orderId"
          title="Заказ оформлен!"
          :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке.`"
          imageUrl="/order-success-icon.png"
        />
        <button
          @click="closeDrawer"
          class="flex items-center justify-evenly mt-4 transiton mx-auto bg-lime-500 w-[80%] rounded-xl py-2 text-white hover:bg-lime-600 font-sans font-semibold active:bg-lime-700 cursor-pointer group"
        >
          <img
            class="opacity-30 group-hover:opacity-100 transition group-hover:-translate-x-3"
            src="/closeArrow.svg"
            alt="close.svg"
          />
          Вернуться назад
        </button>
      </div>


      <div v-else>
        <div class="flex flex-col gap-4 my-7">
          <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-gray-300 border-b border-dashed mb-1"></div>
            <b> {{ totalPrice }} руб.</b>
          </div>

          <div class="flex gap-2">
            <span>Налог 5% :</span>
            <div class="flex-1 border-gray-300 border-b border-dashed mb-1"></div>
            <b> {{ vatPrice }} руб.</b>
          </div>
          <button
            :disabled="ButtonDisabled"
            @click="createOrder"
            class="mt-4 transiton bg-lime-500 w-full rounded-xl py-2 text-white hover:bg-lime-600 font-sans font-semibold active:bg-lime-700 cursor-pointer disabled:bg-slate-300"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
