import cloneDeep from 'lodash/cloneDeep';

const initialState = {
	solved: false,
	errorLabel: null,
	initArray: [
		[0, 0, 0, 2, 6, 0, 7, 0, 1],
		[6, 8, 0, 0, 7, 0, 0, 9, 0],
		[1, 9, 0, 0, 0, 4, 5, 0, 0],
		[8, 2, 0, 1, 0, 0, 0, 4, 0],
		[0, 0, 4, 6, 0, 2, 9, 0, 0],
		[0, 5, 0, 0, 0, 3, 0, 2, 8],
		[0, 0, 9, 3, 0, 0, 0, 7, 4],
		[0, 4, 0, 0, 5, 0, 0, 3, 6],
		[7, 0, 3, 0, 1, 8, 0, 0, 0]
	]
};

window.gridHistory = window.gridHistory || [];

export function grid(state = cloneDeep(initialState), action) {
	const { errorLabel, solved, row, col, val } = action;
	
	switch (action.type) {
		case 'INPUT_VALUE':
			const { initArray } = state;
			let changedRow = [
				...initArray[row].slice(0, col),
				val,
				...initArray[row].slice(col + 1)
			]; // Omit using splice since it mutates the state
			gridHistory.push(initArray);		
			return {
				...state,
				initArray: [
					...initArray.slice(0, row),
					changedRow,
					...initArray.slice(row + 1)
				]
			};
		case 'SET_ERROR':
			return {
				...state,
				errorLabel,
				solved
			}
		case 'SET_SOLVED':
			return {
				...state,
				solved,
				errorLabel
			}
		default:
			return state;
	}
}
