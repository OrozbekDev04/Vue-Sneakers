<script setup>
import { inject, onMounted, ref } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'
import {useRouter} from 'vue-router';
const favorites = ref([])
const { addToCart, removeFromCart } = inject('cart')
const router = useRouter()

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const goToHome = () => {
  router.push('/')
}

const removeFromFavorite = (item) => {
  const index = favorites.value.indexOf(item)
  if (index !== -1) {
    favorites.value.splice(index, 1)
    item.isFavorite = false
  }
}

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://3d8c5b1a1c7563a9.mokky.dev/favorites?_relations=items`
    )
    favorites.value = data.map(obj => obj.item)
  } catch (error) {
    console.error('Error fetching favorites:', error)
  }
})


</script>
<template>
  <div>
    <div class="flex items-center justify-start gap-5 mb-10">
      <img src="/closePage.svg" alt="" @click="goToHome" class="cursor-pointer hover:opacity-100 transition hover:-translate-x-1"/>
      <h2 class="font-bold text-[#000] text-2xl">Мои закладки</h2>

    </div>
    <CardList :itemsData="favorites" is-favorites @add-to-favorite="removeFromFavorite" @add-to-cart="onClickAddPlus" />
  </div>
</template>
