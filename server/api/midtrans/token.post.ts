import midtransClient from 'midtrans-client'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const { grossAmount } = await readBody(event)

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
  }

  try {
    const result = await snap.createTransaction(data)

    return result
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed generate token',
    })
  }
})
