export interface IStyledProps {
	value: string
	index: number
	width?: number
	height?: number
}

export interface IVerificationFieldProps {
	type?: ValidType
	length?: number
	autoFocus?: boolean
	inputElements?: InputElements
	onKeyDown?: KeyEvent
	onChange?: ChangeEvent
	onPaste?: PasteEvent
	checkValidity?: (v: string) => void
}

export type ValidType = 'numeric' | 'alphabetical' | 'alphanumeric' | 'any'
export type FieldValues = string[]
export type InputElements = Array<HTMLInputElement | null>
export type KeyType = React.KeyboardEvent<HTMLInputElement>
export type KeyEvent = (e: KeyType) => void
export type ChangeType = React.FormEvent<HTMLInputElement>
export type ChangeEvent = (e: ChangeType) => void
export type PasteType = React.ClipboardEvent<HTMLInputElement>
export type PasteEvent = (e: PasteType) => void
