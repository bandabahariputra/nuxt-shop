<script setup lang="ts">
const props = defineProps({
  allowClickBackdrop: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const emit = defineEmits(['close'])

const showBackdrop = ref(false)
const showContent = ref(false)

const handleCloseContent = () => {
  showContent.value = false
}

const handleBackdropClick = () => {
  if (props.allowClickBackdrop) {
    handleCloseContent()
  }
}

onMounted(() => {
  setTimeout(() => {
    showBackdrop.value = true

    const body = document.querySelector('body') as HTMLBodyElement

    body.style.overflowY = 'hidden'
  }, 300)
})

onUnmounted(() => {
  const body = document.querySelector('body') as HTMLBodyElement

  body.style.overflowY = 'auto'
})
</script>

<template>
  <Transition
    name="fade"
    @after-enter="showContent = true"
  >
    <div
      v-if="showBackdrop"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      @click.self="handleBackdropClick"
    >
      <div
        class="fixed inset-x-0 bottom-0 top-auto z-[100] flex h-auto w-full items-center justify-center md:top-0 md:h-screen"
        @click.self="handleBackdropClick"
      >
        <Transition
          name="slide-up"
          @after-leave="$emit('close')"
        >
          <slot
            v-if="showContent"
            :close="handleCloseContent"
          />
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
