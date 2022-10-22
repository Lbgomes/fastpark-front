import React, { useCallback, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'

import Logo from '../../assets/LogoFastPark.svg'
import { dashboard, personalization, others } from './data/menus'
import { LogoContainer, LogoutButton, Menus, SideBarContainer } from './style'

const SideBar: React.FC = () => {
  const location = useLocation()

  const [menuChildrenToBeShown, setMenuChildrenToBeShown] = useState<number[]>(
    []
  )
  const showOrHideMenuChildren = (index: number) => {
    if (menuChildrenToBeShown.includes(index)) {
      const indexOfMenu = menuChildrenToBeShown.indexOf(index)
      if (indexOfMenu > -1 && indexOfMenu < menuChildrenToBeShown.length) {
        menuChildrenToBeShown.splice(indexOfMenu, 1)
      }
    } else {
      menuChildrenToBeShown.push(index)
    }

    setMenuChildrenToBeShown([...menuChildrenToBeShown])
  }

  const checkShouldShowMenuChildren = useCallback(
    (index: number) => {
      return menuChildrenToBeShown.includes(index)
    },
    [menuChildrenToBeShown]
  )

  return (
    <SideBarContainer>
      <Menus>
        <div>
          <LogoContainer>
            <img src={Logo} alt="logo" />
          </LogoContainer>
          <div className="options">
            {dashboard.path ? (
              <Link
                className={location.pathname === dashboard.path ? 'active' : ''}
                key={dashboard.path}
                to={dashboard.path}
              >
                {dashboard.label}
              </Link>
            ) : (
              <></>
            )}
          </div>

          <hr />
          <h2>Personalização</h2>
          <div className="options">
            {personalization && personalization.length ? (
              personalization.map((menu, index) => (
                <Link key={menu.path} to={menu.path}>
                  <div key={index}>
                    <button
                      className={`${
                        location.pathname.includes(menu.path) ? 'active' : ''
                      }`}
                      onClick={() => showOrHideMenuChildren(index)}
                    >
                      {menu.label}
                      <span></span>
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <></>
            )}
          </div>

          <hr />

          <h2>Outros</h2>

          <div className="options">
            {others.path ? (
              <Link
                className={location.pathname === others.path ? 'active' : ''}
                key={others.path}
                to={others.path}
              >
                {others.label}
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>

        <LogoutButton>
          <span className="icon">
            <BiLogOut />
          </span>

          <span className="text">Sair da conta</span>
        </LogoutButton>
      </Menus>
    </SideBarContainer>
  )
}

export default SideBar
