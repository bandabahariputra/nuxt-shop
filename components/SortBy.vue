<script setup lang="ts">
import type { ISort } from '~/types'

const emit = defineEmits(['close'])

const productStore = useProductStore()

const { sorts } = productStore
const { selectedSort } = storeToRefs(productStore)

const tempSortBy = ref<keyof ISort>(selectedSort.value)

const handleClickShowResult = () => {
  selectedSort.value = tempSortBy.value

  emit('close')
}
</script>

<template>
  <div class="w-[32rem] bg-white px-2 md:px-4 py-4">
    <p class="font-bold mb-2">Sort By</p>
    <div>
      <div
        v-for="(value, key) in sorts"
        :key="key"
        class="flex items-center justify-between py-1"
      >
        <p>{{ value }}</p>
        <button
          class="w-4 h-4 rounded-full ring-1 ring-inset ring-gray-500 p-0.5"
          @click="tempSortBy = key"
        >
          <span
            v-if="tempSortBy === key"
            class="block w-full h-full rounded-full bg-gray-500"
          ></span>
        </button>
      </div>
      <button
        class="bg-black text-white w-full py-1 mt-4"
        @click="handleClickShowResult"
      >
        Show Result
      </button>
    </div>
  </div>
</template>
