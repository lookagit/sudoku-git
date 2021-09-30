import { Action, Store } from 'redux';

export type AppProps = {
  setSolved: Function,
  setError: Function,
  initialArray: Array<Array<number>>,
  isSolved: boolean,
  errorLabel: null | string
}

export interface IReduxAction extends Action {
  errorLabel: string, 
  solved: boolean,
  row: number,
  column: number,
  value: number,
  type: string
}

export interface IReduxInputAction extends Action {
  row: number,
  column: number,
  value: number,
  type: string
}

export interface IInitialState {
  solved: boolean,
	errorLabel: null | string,
	initArray: Array<Array<number>>
}

export type BoxProps = {
  column: number,
  value: number,
  row: number,
  isSolved: boolean,
  addInputValue: Function
}

export type InputProps = {
  isFixed: boolean,
  isSolved: boolean,
  handleChange: Function,
  value: number
}