import React, { useState } from 'react'

import * as S from './style'

function Checkbox() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <S.Wrapper>
      <input type="checkbox" onClick={() => setIsChecked(!isChecked)} />

      <S.Container checked={isChecked} />
    </S.Wrapper>
  )
}

export default Checkbox
