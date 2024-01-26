<script setup lang="ts">
import type { IProduct } from '~/types'

const config = useRuntimeConfig()

useHead({
  script: [
    {
      type: 'text/javascript',
      src: 'https://app.sandbox.midtrans.com/snap/snap.js',
      'data-client-key': config.public.MIDTRANS_CLIENT_KEY,
    },
  ],
})

const route = useRoute()

const { id: productId } = route.params

const { data: product } = await useFetch<IProduct>(`/api/product/${productId}`)

const quantity = ref(1)

const totalPrice = computed(
  () => (product.value && product.value.price * quantity.value) ?? 0
)

const handleClickCheckout = async () => {
  try {
    const result = await $fetch('/api/midtrans/token', {
      method: 'POST',
      body: {
        grossAmount: totalPrice.value,
      },
    })

    snap.pay(result.token)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="w-96 mx-auto px-4">
    <div class="py-2 border-b">
      <p class="font-bold">MY BAG</p>
    </div>

    <div class="py-4">
      <div class="flex items-stretch gap-4">
        <div class="w-32 border border-gray-100 grid place-items-center py-4">
          <img
            :src="product?.image"
            alt=""
            class="w-1/2"
          />
        </div>
        <div class="flex flex-col">
          <p class="line-clamp-1">{{ product?.title }}</p>
          <p class="font-medium text-sm text-gray-500">
            Rp{{ product?.price.toLocaleString('id-ID') }}
          </p>
          <div class="mt-auto flex items-center gap-4">
            <button
              class="w-6 grid place-items-center"
              :class="{ 'opacity-50 cursor-not-allowed': quantity === 1 }"
              :disabled="quantity === 1"
              @click="quantity--"
            >
              <MinusIcon size="0.9x" />
            </button>
            <p class="text-sm">{{ quantity }}</p>
            <button
              class="w-6 grid place-items-center"
              @click="quantity++"
            >
              <PlusIcon size="0.9x" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="py-2 border-b flex items-center justify-between">
      <p class="font-bold">TOTAL</p>
      <p class="font-bold">Rp{{ totalPrice.toLocaleString('id-ID') }}</p>
    </div>

    <div class="py-2">
      <button
        class="bg-black text-white w-full py-1"
        @click="handleClickCheckout"
      >
        CHECKOUT
      </button>
    </div>
  </div>
</template>
