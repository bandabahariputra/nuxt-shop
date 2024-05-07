<script setup lang="ts">
import type { IProduct } from '~/types'

const router = useRouter()
const productStore = useProductStore()

const { filteredProducts } = storeToRefs(productStore)

await productStore.fetchProducts()
const selectedProduct = ref()
const showSortModal = ref(false)

const handleClickProduct = (product: IProduct) => {
  selectedProduct.value = product
}

const handleCloseModal = () => {
  selectedProduct.value = null
}

const handleCheckout = (product: IProduct) => {
  router.push(`/cart/shipment/${product.id}`)
}
</script>

<template>
  <div
    v-if="filteredProducts"
    class="container flex items-center justify-end py-4"
  >
    <div class="flex items-center gap-6">
      <p class="text-gray-500">{{ filteredProducts.length }} Products</p>
      <p
        class="font-medium cursor-pointer hover:underline"
        @click="showSortModal = true"
      >
        SORT
      </p>
    </div>
  </div>

  <div class="pt-4">
    <div class="container">
      <div
        v-if="filteredProducts"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="cursor-pointer"
          @click="handleClickProduct(product)"
        >
          <div class="h-72 border border-gray-100 grid place-items-center">
            <img
              :src="product.image"
              alt=""
              class="w-1/3"
            />
          </div>
          <div class="w-full flex items-start justify-between text-sm">
            <div>
              <p class="font-medium line-clamp-1">{{ product.title }}</p>
              <p class="text-xs text-gray-500 capitalize">
                {{ product.category }}
              </p>
            </div>
            <div class="w-1/3 flex justify-end">
              <p class="font-medium">
                Rp{{ product.price.toLocaleString('id-ID') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalBackdrop
    v-if="selectedProduct"
    @close="handleCloseModal"
  >
    <ProductDetail
      :product="selectedProduct"
      @checkout="handleCheckout"
    />
  </ModalBackdrop>

  <ModalBackdrop
    v-if="showSortModal"
    @close="showSortModal = false"
  >
    <SortBy @close="showSortModal = false" />
  </ModalBackdrop>
</template>
