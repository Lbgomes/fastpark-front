import axios from "axios"
import Checkin from "../models/checkin"

export const getAllCheckin = async (): Promise<Checkin> => {
    const checkin = (await axios.get('http://localhost:6060/parking/listarCheckIn')).data
    console.log(checkin)
   return checkin
  }