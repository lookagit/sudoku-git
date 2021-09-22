/* Action Creators */

const inputValue = (row, col, val) => ({
		type: 'INPUT_VALUE',
		row,
		col,
		val
	}
)

const setError = (errorLabel) => ({
	type: 'SET_ERROR',
	errorLabel,
	solved: false
})

const setSolved = (solved) => ({
	type: 'SET_SOLVED',
	solved,
	errorLabel: null,
})

export {
	setSolved,
	inputValue,
	setError
}
