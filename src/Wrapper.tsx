import * as React from 'react'
import { css } from 'emotion'
import { VerificationCode } from './VerificationCode'
import { InputElements, IVerificationFieldProps } from './types'

export const Wrapper = (props: IVerificationFieldProps) => {
  const inputElements: InputElements = Array(props.length).fill(null)
  return (
    <div
      className={css`
        display: inline-flex;
        flex-wrap: nowrap;
      `}
    >
      <VerificationCode inputElements={inputElements} {...props} />
    </div>
  )
}
