import { BsJournalText, BsJournalCheck, BsFillHouseFill } from 'react-icons/bs'
import { FaUser, FaChartPie } from 'react-icons/fa'

import { ReactComponent as User } from '../../assets/user.svg'
export const dashboard = {
  label: (
    <>
      <div className="icon">
        <BsFillHouseFill />
      </div>

      <span className="text">Início</span>
    </>
  ),
  path: '/home'
}
export const personalization = [
  {
    label: (
      <>
        <div className="icon">
          <FaUser />
        </div>
        <span className="text">Usuários</span>
      </>
    ),
    path: '/users'
  },

  {
    label: (
      <>
        <div className="icon">
          <BsJournalText />
        </div>

        <span className="text">Checkin</span>
      </>
    ),
    path: '/checkin'
  },

  {
    label: (
      <>
        <div className="icon">
          <BsJournalCheck />
        </div>

        <span className="text">CheckOut</span>
      </>
    ),
    path: '/checkOut'
  }
]
export const others = {
  label: (
    <>
      <div className="icon">
        <FaChartPie />
      </div>

      <span className="text">Relatórios</span>
    </>
  ),
  path: '/plans'
}
