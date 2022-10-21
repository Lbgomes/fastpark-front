import React from 'react'
import { useUserStore } from '../../GlobalState'
import { ProfileContainer } from './styles'


const Profile: React.FC = () => {
  const userStore = useUserStore()

  return (
    <ProfileContainer>
      <h2>Seja Bem Vindo, {userStore.userEmail}!</h2>
    </ProfileContainer>
  )
}

export default Profile