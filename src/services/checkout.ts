import axios from 'axios'

import CheckOutForList from '../models/checkout'

export const getAllCheckOut = async (): Promise<CheckOutForList> => {
  const CheckOut = (
    await axios.get('http://localhost:6060/parking/listarCheckOut')
  ).data
  return CheckOut
}

export const createCheckOut = async (id: string) => {
  const checkOut = (
    await axios.post(`http://localhost:6060/parking/checkOut/${id}`)
  ).data
  return checkOut
}
