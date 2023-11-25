import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const payload = await req.body || {}
      const params = {
        line_items: payload.map((item: any) => {
          const img = item.image[0].asset._ref
          const newImage = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/6ipvdhma/production/',
            )
            .replace('-webp', '.webp')

          return {
            price_data: {
              currency: 'sek',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          }
        }),
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [{ shipping_rate: 'shr_1OG6TKCDDTyH4CHB1VmscaeF' }],
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/canceled`,
        line_items: params.line_items,
      })

      res.status(200).json(session)
    } catch (error) {
      console.error('Error creating payment intent:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
