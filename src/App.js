import React from 'react';
import Grid from './components/Grid';
import { isSolvable, isComplete } from './utils/sudoku';
import { setError, setSolved } from './actions/grid';

/* Application Container Component */
const App = React.createClass({
	componentDidMount(){
		this.unsubscribe = this.props.store.subscribe(() => {
			this.forceUpdate();
		})
	},
	componentWillUnmount() {
		this.unsubscribe();
	},
	render() {
		const { store } = this.props;
		const { grid: { initArray, solved, errorLabel }, status } = store.getState();
		const { isSolved } = status;
		return (
			<div>
				<Grid grid={initArray} status={status} {...this.props} />
				<div style={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					{errorLabel ? <p style={{ color: 'red' }}>{errorLabel}</p> : null}
					{solved ? <p>SOLVED</p> : null}
				</div>
				<button
					className='check'
					disabled={isSolved}
					onClick={() => {
						if (isSolvable(initArray)) {
							if (isComplete(initArray)) {
								store.dispatch(setSolved(true));
								return;
							}
							store.dispatch(setError(null))
						} else {
							store.dispatch(setError("This Sudoku is NOT solvable"));
						}					
					}}
				>
					Check
				</button>		
			</div>

		);
	}
});

export default App;
