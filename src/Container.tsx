import * as React from 'react'
import { css } from 'emotion'

export const Container = ({ children, ...rest }: any) => {
	return (
		<div
			className={css`
				display: inline-flex;
				flex-wrap: nowrap;
			`}
			{...rest}
		>
			{children}
		</div>
	)
}
