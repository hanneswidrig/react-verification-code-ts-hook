import { ValidType } from './types'

export const getRegExp = (t: ValidType) =>
	t === 'numeric' ? /\d+/g : t === 'alphabetical' ? /[A-Za-z]+/g : t === 'alphanumeric' ? /[A-Za-z\d]+/g : /.+/g

export const getIndexes = (currentIndex: number, numberOfElements: number) => {
	const firstElement = currentIndex === 0
	const lastElement = currentIndex === numberOfElements - 1
	const prevIndex = firstElement ? 0 : currentIndex - 1
	const nextIndex = lastElement ? 0 : currentIndex + 1
	return { firstElement, lastElement, prevIndex, nextIndex }
}
