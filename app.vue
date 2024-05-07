<script setup lang="ts">
useHead({
  titleTemplate: (template) => {
    return template ? `Nuxt Shop - ${template}` : 'Nuxt Shop'
  },
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
