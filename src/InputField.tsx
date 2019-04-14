import * as React from 'react'
import { css } from 'emotion'
import { IVerificationFieldProps, IStyledProps } from './types'

export const InputField = ({
	inputElements,
	autoFocus,
	length,
	value,
	index,
	onKeyDown,
	onChange,
	onPaste,
	...rest
}: IVerificationFieldProps & IStyledProps) => {
	return (
		<input
			className={css`
				font-weight: bold;
				font-size: 1.5rem;
				text-align: center;
				box-sizing: border-box;
				width: 48px;
				height: 48px;
				border: solid 2px rgba(111, 110, 141, 1);
				border-radius: 4px;

				&:focus {
					outline: none;
					border: solid 2px rgba(19, 94, 171, 1);
					caret-color: rgba(19, 94, 171, 1);
				}

				& + & {
					margin-left: 4px;
				}
			`}
			type={'text'}
			name={`field-${index}`}
			value={value || ''}
			autoFocus={autoFocus}
			data-id={`${index}`}
			onChange={onChange}
			onKeyDown={onKeyDown}
			onPaste={e => {
				e.preventDefault()
				if (onPaste) {
					onPaste(e)
				}
			}}
			ref={(input: HTMLInputElement) => (inputElements![index] = input)}
			{...rest}
		/>
	)
}

if (!Array.prototype.fill) {
	Object.defineProperty(Array.prototype, 'fill', {
		value: function(value: any) {
			if (this == null) {
				throw new TypeError('this is null or not defined')
			}

			const O = Object(this)
			// tslint:disable-next-line:no-bitwise
			const len = O.length >>> 0
			const start = arguments[1]
			// tslint:disable-next-line:no-bitwise
			const relativeStart = start >> 0

			let k =
				relativeStart < 0
					? Math.max(len + relativeStart, 0)
					: Math.min(relativeStart, len)

			const end = arguments[2]
			// tslint:disable-next-line:no-bitwise
			const relativeEnd = end === undefined ? len : end >> 0

			const final =
				relativeEnd < 0
					? Math.max(len + relativeEnd, 0)
					: Math.min(relativeEnd, len)

			while (k < final) {
				O[k] = value
				k++
			}

			return O
		},
	})
}
