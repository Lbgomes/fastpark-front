import axios from 'axios'

import Checkin from '../models/checkin'
import CheckOutForList from '../models/checkout'
import CheckinForCreate from '../models/forCreate/checkinForCreate'

export const getAllCheckin = async (): Promise<Checkin> => {
  const checkin = (
    await axios.get('http://localhost:6060/parking/listarCheckIn')
  ).data
  return checkin
}

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

export const createCheckin = async (newCheckin: CheckinForCreate) => {
  const checkin = (
    await axios.post('http://localhost:6060/parking/checkIn', newCheckin)
  ).data
  return checkin
}
