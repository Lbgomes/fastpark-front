import { BsJournalText, BsPerson } from 'react-icons/bs'
import { ReactComponent as User } from '../../assets/user.svg'
import {FaUser, FaChartPie} from 'react-icons/fa'
export const dashboard = {
  label: (
    <>
      <div className="icon">
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
