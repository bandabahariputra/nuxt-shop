<script setup lang="ts">
import type { IFilter } from '~/types'

const productStore = useProductStore()

const { filters } = productStore
const { selectedFilter } = storeToRefs(productStore)

const target = ref(null)
const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const handleClickFilter = (key: keyof IFilter) => {
  selectedFilter.value = key
  showMenu.value = false
}

watch(showMenu, () => {
  const body = document.querySelector('body') as HTMLBodyElement

  if (showMenu.value) {
    body.style.overflowY = 'hidden'
  } else {
    body.style.overflowY = 'auto'
  }
})

onClickOutside(target, (event) => {
  showMenu.value = false
})
</script>

<template>
  <div
    ref="target"
    class="relative"
  >
    <div
      class="cursor-pointer"
      @click="toggleMenu"
    >
      <MenuIcon />
    </div>
    <div
      v-if="showMenu"
      class="absolute top-full left-0 w-48 bg-white border border-gray-300"
    >
      <div class="flex flex-col">
        <p
          v-for="(value, key) in filters"
          :key="key"
          class="uppercase cursor-pointer px-4 py-1"
          :class="{ underline: key === selectedFilter }"
          @click="handleClickFilter(key)"
        >
          {{ key }}
        </p>
      </div>
    </div>
  </div>
</template>
