import axios from 'axios'

import Checkin from '../models/checkin'
import CheckinForCreate from '../models/forCreate/checkinForCreate'

export const getAllCheckin = async (): Promise<Checkin> => {
  const checkin = (
    await axios.get('http://localhost:6060/parking/listarCheckIn')
  ).data
  return checkin
}

export const createCheckin = async (newCheckin: CheckinForCreate) => {
  const checkin = (
    await axios.post('http://localhost:6060/parking/checkIn', newCheckin)
  ).data
  return checkin
}
