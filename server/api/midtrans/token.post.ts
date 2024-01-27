import midtransClient from 'midtrans-client'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const { productId, price, name, category, quantity, grossAmount } =
    await readBody(event)

  const brand = 'NUXT SHOP'

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: runtimeConfig.MIDTRANS_SERVER_KEY,
    clientKey: runtimeConfig.MIDTRANS_CLIENT_KEY,
  })

  const data = {
    transaction_details: {
      order_id: `ORDER-${uuidv4()}`,
      gross_amount: grossAmount as number,
    },
    item_details: [
      {
        id: productId,
        price: price,
        quantity,
        name: name.length >= 40 ? name.slice(0, 40) : name,
        brand,
        category,
      },
    ],
    customer_details: {
      first_name: 'TEST',
      last_name: 'MIDTRANSER',
      email: 'test@midtrans.com',
      phone: '+628123456',
      billing_address: {
        first_name: 'TEST',
        last_name: 'MIDTRANSER',
        email: 'test@midtrans.com',
        phone: '081 2233 44-55',
        address: 'Sudirman',
        city: 'Jakarta',
        postal_code: '12190',
        country_code: 'IDN',
      },
      shipping_address: {
        first_name: 'TEST',
        last_name: 'MIDTRANSER',
        email: 'test@midtrans.com',
        phone: '0 8128-75 7-9338',
        address: 'Sudirman',
        city: 'Jakarta',
        postal_code: '12190',
        country_code: 'IDN',
      },
    },
  }

  try {
    const result = await snap.createTransaction(data)

    return result
  } catch (err) {
    console.log(err)
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed generate token',
    })
  }
})
