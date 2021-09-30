import React from 'react';
import Grid from '../components/Grid';
import { isSolvable, isComplete } from '../utils/index';
import { setError, setSolved } from '../redux/actions';
import { connect } from 'react-redux';
import { AppProps, IInitialState } from '../types';
import { Dispatch } from 'redux';

const App = ({
  initialArray,
  isSolved,
  errorLabel,
  setSolved,
  setError
}: AppProps) => {
  return (
    <div>
				<Grid grid={initialArray} />
				<div style={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					{errorLabel ? <p style={{ color: 'red' }}>{errorLabel}</p> : null}
					{isSolved ? <p>SOLVED</p> : null}
				</div>
				<button
					className='check'
					disabled={isSolved}
					onClick={() => {
						if (isSolvable(initialArray)) {
							if (isComplete(initialArray)) {
								setSolved(true);
								return;
							}
							setError(null);
              return;
						} 
						setError("This Sudoku is NOT solvable");				
					}}
				>
					Check
				</button>		
			</div>
  )
}

const mapStateToProps = (state: IInitialState) => ({
  isSolved: state.solved,
  initialArray: state.initArray,
  errorLabel: state.errorLabel
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setError: (value: string | null) => dispatch(setError(value)),
  setSolved: (isSolved: boolean) => dispatch(setSolved(isSolved))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
