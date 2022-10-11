import React from 'react'

import { BreadCrumbContainer } from './style'

interface BreadCrumbProps {
  crumbs: React.ReactElement[]
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ crumbs }) => (
  <BreadCrumbContainer>
    {crumbs && crumbs.length ? (
      crumbs.map((crumb, index) => ({ ...crumb, key: index }))
    ) : (
      <></>
    )}
  </BreadCrumbContainer>
)

export default BreadCrumb
