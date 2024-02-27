/* eslint-disable no-console */

import axios from 'axios'

export async function shippingOnWeekends(ctx: Context) {
  const {
    clients: {},
    vtex: { authToken },
  } = ctx

  const { slaId } = ctx.vtex.route.params

  console.log('el ctx: ', ctx)
  //const slaId = ctx.params.slaId; 
  const account = ctx.headers['x-vtex-account']


  const retriveShippingPolicyUrl = `http://${account}.vtexcommercestable.com.br/api/logistics/pvt/shipping-policies/${slaId}`
  //const retriveShippingPolicyUrl = `http://${account}.vtexcommercestable.com.br/api/logistics/pvt/shipping-policies`

  const /* { data: _holidays } */ {data} = await axios.get(retriveShippingPolicyUrl, {
    headers: {
      'VtexIdclientAutCookie': authToken,
      'X-Vtex-Use-Https': 'true'
    },
  })

  ctx.set('Content-Type', 'application/json')
  ctx.set('Cache-Control', 'no-cache, no-store')

  console.log('data: ', JSON.stringify(data.weekendAndHolidays))

  ctx.response.status = 200
  ctx.response.body = data.weekendAndHolidays
}
