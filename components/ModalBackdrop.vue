<script setup lang="ts">
const emit = defineEmits(['close'])

const handleClickClose = () => {
  emit('close')
}

onMounted(() => {
  const body = document.querySelector('body') as HTMLBodyElement

  body.style.overflowY = 'hidden'
})

onUnmounted(() => {
  const body = document.querySelector('body') as HTMLBodyElement

  body.style.overflowY = 'auto'
})
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
    @click.self="handleClickClose"
  >
    <div
      class="fixed inset-x-0 bottom-0 top-auto z-[100] flex h-auto w-full items-center justify-center md:top-0 md:h-screen"
      @click.self="handleClickClose"
    >
      <slot />
    </div>
  </div>
</template>
