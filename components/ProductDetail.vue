<script setup lang="ts">
import type { PropType } from 'vue'
import type { IProduct } from '~/types'

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true,
  },
})

const emit = defineEmits(['checkout'])

const handleClickCheckout = () => {
  emit('checkout', props.product)
}
</script>

<template>
  <div class="w-[32rem] bg-white px-2 md:px-4 py-4">
    <p>{{ product.title }}</p>
    <p class="text-sm text-gray-500 capitalize mb-4">
      {{ product.category }}
    </p>
    <p class="text-sm text-gray-500 mb-6">{{ product.description }}</p>
    <div class="flex items-center justify-between">
      <p class="font-medium">Rp{{ product.price.toLocaleString('id-ID') }}</p>
      <button
        class="bg-black text-white w-32 py-1"
        @click="handleClickCheckout"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
