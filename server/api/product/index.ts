import { IProduct } from '~/types'

export default defineEventHandler(async () => {
  const products = await $fetch<IProduct[]>('https://fakestoreapi.com/products')

  const filteredProducts = products
    .filter(
      (product) =>
        product.category === "men's clothing" ||
        product.category === "women's clothing"
    )
    .map((product) => ({
      ...product,
      price: Math.round(product.price) * 10000,
    }))

  return filteredProducts
})
