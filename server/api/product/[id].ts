import { IProduct } from '~/types'

export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, 'id')

  try {
    const product = await $fetch<IProduct>(
      `https://fakestoreapi.com/products/${productId}`
    )

    product.price = Math.round(product.price) * 10000

    return product
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product not found',
    })
  }
})
