/* Action Creators */
import { ActionCreator } from 'redux';
import { IReduxInputAction } from '../types';


const inputValue: ActionCreator<IReduxInputAction> = (row: number, column: number, value: number) => ({
  type: 'INPUT_VALUE',
  row,
  column,
  value
}
)

const setError = (errorLabel: string | null) => ({
type: 'SET_ERROR',
errorLabel,
solved: false
})

const setSolved = (solved: boolean) => ({
type: 'SET_SOLVED',
solved,
errorLabel: null,
})

export {
  setSolved,
  inputValue,
  setError
}
