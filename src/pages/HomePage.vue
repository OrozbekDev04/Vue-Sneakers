<script setup>
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import debounce  from 'lodash.debounce';
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')
const items = ref([])

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
}

const onChangeSearchInput = debounce ((e) => {
  filters.searchQuery = e.target.value
},200)

const addToFavorite = async (item) => {
  // item.isFavorite = !item.isFavorite;
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id:item.id,
        // item,
      }
      const { data } = await axios.post('https://3d8c5b1a1c7563a9.mokky.dev/favorites', obj)
      console.log(data)
      item.isFavorite = true
      item.favoriteId = data.id
      toast.success(`Успешно добавлено в избранные ${item.title}`, {
        autoClose: 1000
      })
    } else {
      try {
        await axios.delete(`https://3d8c5b1a1c7563a9.mokky.dev/favorites/${item.favoriteId}`)
        item.isFavorite = false
        item.favoriteId = null
        toast.success(`Успешно удалено в избранные ${item.title}`, {
          autoClose: 1000
        })
      } catch (error) {
        console.log(error)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://3d8c5b1a1c7563a9.mokky.dev/favorites')

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get('https://3d8c5b1a1c7563a9.mokky.dev/items', {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row  items-center justify-between mb-4 md:mb-8">
    <h2 class="text-xl sm:text-2xl md:text-3xl font-bold">Все Кроссовки</h2>
    <div class="flex gap-4 flex-col md:flex-row w-4/5 md:w-full">
      <select @change="onChangeSelect" class="w-4/9 md:w-full py-2 px-3 border rounded-md outline-none">
        <option value="name">По названиям</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative w-5/3  md:w-full mx-auto flex justify-center"  >
        <img
          src="/search.svg"
          alt="search-icon"
          class=" w-3 transition absolute top-3 left-3 sm:top-4 sm:left-3 cursor-pointer "
        />
        <input
          @change="onChangeSearchInput"
          type="text"
          class=" border rounded-md  py-1 pl-4 pr-1 sm:py-2  sm:pl-11 sm:pr-4 outline-none focus:border-gray-400 w-4/6   md:w-full"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <CardList :itemsData="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
</template>

<style scoped></style>

