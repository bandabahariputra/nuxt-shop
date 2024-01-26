<script setup lang="ts">
const route = useRoute()
const productStore = useProductStore()

const { filters } = productStore
const { selectedFilter } = storeToRefs(productStore)
</script>

<template>
  <div>
    <nav class="h-12 flex relative">
      <div
        class="container flex items-center"
        :class="{
          'justify-between': route.fullPath === '/',
          'justify-end': route.fullPath !== '/',
        }"
      >
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <NuxtLink
            to="/"
            class="font-bold tracking-widest"
            >NUXT SHOP</NuxtLink
          >
        </div>
        <MobileFilter
          v-if="route.fullPath === '/'"
          class="md:hidden"
        />
        <div
          v-if="route.fullPath === '/'"
          class="hidden md:flex gap-6"
        >
          <p
            v-for="(value, key) in filters"
            :key="key"
            class="uppercase cursor-pointer"
            :class="{ underline: key === selectedFilter }"
            @click="selectedFilter = key"
          >
            {{ key }}
          </p>
        </div>
        <div class="flex gap-6">
          <p>LOGIN</p>
        </div>
      </div>
    </nav>

    <slot />
  </div>
</template>
