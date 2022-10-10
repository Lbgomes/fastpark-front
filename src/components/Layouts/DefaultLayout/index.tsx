import SideBar from '../../SideBar'

import { Container, Content, LeftContent, RightContent } from './style'

export default function DefaultLayout({ children }: any) {
  return (
    <Container>
      <LeftContent>
        <SideBar />
      </LeftContent>
      <RightContent>
        <Content>{children}</Content>
      </RightContent>
    </Container>
  )
}
