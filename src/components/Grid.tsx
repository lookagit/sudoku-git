import React from 'react';
import { Dispatch } from 'redux';
import { IInitialState } from '../types';
import { inputValue } from '../redux/actions';
import Box from './Box';
import { connect } from 'react-redux';

const Grid = ({ grid, addInputValue, isSolved }: { grid: Array<Array<number>>, addInputValue: Function, isSolved: boolean }) => (
  <table>
    <tbody>
      {
        grid && grid.length && grid.map((colItem: Array<number>, row: number) => (
          <tr key={row}>
            {
              colItem && colItem.length && colItem.map((value: number, column: number) => (
                <Box
                  row={row}
                  value={value}
                  column={column}
                  isSolved={isSolved}
                  addInputValue={addInputValue}
                />
              ))
            }
          </tr>
        ))
      }
    </tbody>
  </table>
)

const mapStateToProps = (state: IInitialState) => ({
  isSolved: state.solved
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addInputValue: (row: number, column: number, value: number) => dispatch(inputValue(row, column, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Grid);