import cloneDeep from 'lodash/cloneDeep';
import flatten from 'lodash/flatten';
import range from 'lodash/range';
import contains from 'lodash/includes';
import * as _ from 'lodash';

const VALUES = range(1, 10);
const DIM = range(0, 9);
const ZERO = 0;

const getRow = (grid, rowNum) => {
	if (!contains(DIM, rowNum)) {
		throw new Error('rowNum not in range');
	}
	return grid[rowNum];
}

const getCol = (grid, colNum) => {
	if (!contains(DIM, colNum)) {
		throw new Error('colNum not in range');
	}
	return grid.map((row) => row[colNum]);
}

const getSquare = (grid, rowNum, colNum) => {
	if (!contains(DIM, rowNum) || !contains(DIM, colNum)) {
		throw new Error('rowNum or colNum are not in range');
	}
	let rowStart = rowNum - (rowNum % 3); // uppermost row index of the box
	let colStart = colNum - (colNum % 3); // leftmost col index of the box
	let result = [];
	for (let i = 0; i < 3; i++) {
		result[i] = result[i] || [];
		for (let j = 0; j < 3; j++) {
			result[i].push(grid[rowStart + i][colStart + j]);
		}
	}
	return flatten(result);
}

/*
	sudoku constraints checker
	- unique in its row
	- unique in its column
	- unique in its box
*/ 
const check = (grid, number, rowNum, colNum) => {
	if (!contains(DIM, rowNum) || !contains(DIM, colNum)) {
		throw new Error('rowNum or colNum are not in range');
	}

	if (!contains(VALUES, number)) {
		throw new Error('number is not in range');
	}

	let row = getRow(grid, rowNum);
	let column = getCol(grid, colNum);
	let square = getSquare(grid, rowNum, colNum);

	if (!contains(row, number) && !contains(column, number) && !contains(square, number)) {
		return true;
	}

	return false;
}

/*
	starts from 0x0 and moves left to right and row by row to 9x9
*/
const getNext = (rowNum = 0, colNum = 0) => {
	return colNum !== 8 ? [rowNum, colNum + 1] :
		rowNum !== 8 ? [rowNum + 1, 0] :
		[0, 0];
}

/*
	Recursive formula that starts from [0, 0] and check
	all the possbile values for empty boxes until it reaches
	the end of the grid and returns true
	or else if the grid is not solvable, it will return false
*/

const checkDuplicates = numbers => {
	const withoutZeros = numbers.filter(item => item !== 0 && item);
	return _.uniq(withoutZeros).length !== withoutZeros.length;
}

const checkRow = (grid) => {
	let duplicate = false;
	for(let i = 0; i <= 8; i++) {
		const row = grid[i];
		if(checkDuplicates(row)) {
			duplicate = true;
			break;
		}
	}
	return duplicate;
}

const checkColumn = (grid) => {
	let duplicate = false;
	for(let i = 0; i <= 8; i++) {
		const column = grid[i].filter(item => item[0]);
		if(checkDuplicates(column))
			duplicate = true;
			break;
	}
	return duplicate;
}

const letsCreateNewArr = (gridState) => {
	const initialForReduce =  {
    numberOfCubes: 3,
    numberInitialCubesGetter: 3,
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: []
	}
	const createArrayForBoxes = gridState && gridState.length && gridState.reduce((accumulator, currentValue, index) => {
			const [first, second, third, four, five, six, seven, eight, nine] = currentValue;
			const { numberOfCubes, numberInitialCubesGetter } = accumulator;
			const indexPlusOne = index + 1;
			accumulator = {
					...accumulator,
					numberOfCubes: indexPlusOne === numberOfCubes ? numberOfCubes + numberInitialCubesGetter : numberOfCubes,
					[numberOfCubes - 3]: [ ...accumulator[numberOfCubes - 3], first, second, third],
					[numberOfCubes - 2]: [ ...accumulator[numberOfCubes - 2], four, five, six],
					[numberOfCubes - 1]: [...accumulator[numberOfCubes - 1], seven, eight, nine]
			}
			return accumulator;
	}, initialForReduce)
	
	return Object.keys(createArrayForBoxes)
			.filter((item) => item && !item.startsWith('number'))
			.map(wantedArrayItem => createArrayForBoxes[wantedArrayItem]);
	
}

const checkBox = (grid) => {
		const createdFromGrid = letsCreateNewArr(grid);
		const [areThereDuplicates] = createdFromGrid.filter((gridItems) => checkDuplicates(gridItems));
		return areThereDuplicates;
}

export const solver2 = (grid) => {
	if(checkRow(grid)) return true;
	if(checkColumn(grid)) return true;
	if(checkBox(grid)) return true;		
	
	return false;	
}

export const solver = (grid, rowNum = 0, colNum = 0) => {
	if (contains(DIM, rowNum) < 0 || contains(DIM, colNum) < 0) {
		throw new Error('rowNum or colNum are not in range');
	}
	let isLast = (rowNum >= 8 && colNum >= 8);

	/* if the box is not empty, run the solver on the next box */
	if (grid[rowNum][colNum] !== ZERO && !isLast) {
		let [nextRowNum, nextColNum] = getNext(rowNum, colNum);
		return solver(grid, nextRowNum, nextColNum);
	}
	/*
		if the box is empty, check to see out of numbers 1 to 9,
		which one satisfies all three sudoko constraints
	*/ 
	for (let i = 1; i <= 9; i++) {
		if (check(grid, i, rowNum, colNum)) {
			grid[rowNum][colNum] = i;
			let [nextRowNum, nextColNum] = getNext(rowNum, colNum);
			/*
				runs the solver recusively until it sucessfully
				reaches to the end of the grid, box 9x9
			*/
			if (!nextRowNum && !nextColNum) { // at index [8, 8], next would be [0, 0]
				return true;
			}
			if (solver(grid, nextRowNum, nextColNum)) {
				return true;
			}
		}
	}

	/*
		if the loop could not solve and return the function,
		false will be retuened which indicates the sudoku is not solvable.
		resets the current state back to 0 allow for further tries
	*/
	grid[rowNum][colNum] = ZERO;
	return false;
}

export const isSolvable = (grid) => {
	let clonedGrid = cloneDeep(grid);
	return !solver2(clonedGrid);
}

/*
	If each of the numbers from 1 to 9 are repeated on the grid 9 times
	indicates the suduko is completed/solved
*/
export const isComplete = (grid) => {
	let values = flatten(grid);
	let list = {};
	values.map((val) => list[val] = list[val] ? list[val] + 1 : 1);
	delete list['0'];
	var total = Object.keys(list).reduce((total, key) => total + list[key], 0);
	return total === 81 ? true : false;
}
