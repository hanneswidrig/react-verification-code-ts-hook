import * as React from 'react'
import { produce } from 'immer'
import { KEY_CODE } from './keyCode'
import { Container } from './Container'
import { InputField } from './InputField'
import { validChar, getIndexes } from './utils'
import {
	IVerificationFieldProps,
	FieldValues,
	InputElements,
	ValidType,
	ChangeType,
	KeyType,
	PasteType,
} from './types'

export const VerificationCode = (props: IVerificationFieldProps) => {
	const { type = 'numeric', length = 6, autoFocus = true } = props
	const [values, setValues] = React.useState<FieldValues>(
		Array(length).fill(''),
	)
	const inputElements: InputElements = Array(length).fill(null)

	const handleNavigation = (
		currentIndex: number,
		elements: InputElements,
		e: KeyType,
	) => {
		const { firstElement, lastElement, prevIndex, nextIndex } = getIndexes(
			currentIndex,
			elements.length,
		)

		switch (e.keyCode) {
			case KEY_CODE.backspace:
				e.preventDefault()
				const nextState = produce(values, draftState => {
					draftState[currentIndex] = ''
					if (!firstElement) {
						if (
							elements[prevIndex]!.value.length === 1 &&
							elements[currentIndex]!.value.length === 0
						) {
							draftState[prevIndex] = ''
						}
						elements[prevIndex]!.select()
					}
				})
				setValues(nextState)
				break
			case KEY_CODE.left:
				if (!firstElement) {
					elements[prevIndex]!.select()
				}
				break
			case KEY_CODE.right:
				if (!lastElement) {
					elements[nextIndex]!.select()
				}
				break
			case KEY_CODE.up:
			case KEY_CODE.down:
				e.preventDefault()
				break
			default:
				break
		}
	}

	const onChange = (
		index: number,
		prevState: FieldValues,
		elements: InputElements,
		e: ChangeType,
		t: ValidType,
	) => {
		let isValid = true
		const value = e.currentTarget.value.toUpperCase()

		const nextState = produce(prevState, draftState => {
			if (value.length === 1) {
				const newChar = validChar(value, t)
				if (!newChar) {
					isValid = false
				} else {
					draftState[index] = newChar
				}
			} else {
				const newChar = validChar(value.replace(prevState[index], ''), t)
				if (!newChar) {
					draftState[index] = prevState[index]
					isValid = false
				} else {
					draftState[index] = newChar
				}
			}
		})
		setValues(nextState)

		const { lastElement, nextIndex } = getIndexes(index, elements.length)
		if (!lastElement && isValid) {
			elements[nextIndex]!.select()
		}
	}

	const onPaste = (
		prevState: FieldValues,
		i: InputElements,
		e: PasteType,
		t: ValidType,
	) => {
		const pasted = e.clipboardData
			.getData('Text')
			.split('')
			.map(v => {
				return validChar(v, t)
			})
			.filter(v => v.length !== 0)
		setValues(
			produce(prevState, draftState => draftState.map((_, idx) => pasted[idx])),
		)
		i[pasted.length < i.length ? pasted.length : i.length - 1]!.select()
	}

	React.useEffect(() => {
		if (autoFocus) {
			inputElements[0]!.select()
		}
	}, [autoFocus])

	React.useEffect(() => {
		if (props.checkValidity) {
			props.checkValidity(values.join(''))
		}
	}, [props, values])

	return (
		<Container>
			{values.map((value, index) => (
				<InputField
					length={length}
					autoFocus={autoFocus}
					value={value}
					key={index}
					index={index}
					inputElements={inputElements}
					onKeyDown={(e: KeyType) => handleNavigation(index, inputElements, e)}
					onChange={(e: ChangeType) =>
						onChange(index, values, inputElements, e, type)
					}
					onPaste={(e: PasteType) => onPaste(values, inputElements, e, type)}
				/>
			))}
		</Container>
	)
}
