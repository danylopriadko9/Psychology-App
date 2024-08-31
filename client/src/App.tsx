import './App.css';
import React from 'react';
import type { RootState } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
// } from './redux/slices/counterSlice';

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  //const dispatch = useDispatch();
  //const [incrementalValue, setIncrementalValue] = React.useState<number>(0);

  React.useEffect(() => {
    console.log('The counter was changed!');
  }, [count]);

  return (
    <>
      {/* <button onClick={() => dispatch(increment())}>Increase</button>
      <input type='text' value={count} onChange={() => {}} />
      <button onClick={() => dispatch(decrement())}>Decrease</button>

      <button onClick={() => dispatch(incrementByAmount(incrementalValue))}>
        Increase by value
      </button>
      <input
        type='number'
        name=''
        id=''
        placeholder='by amount'
        onChange={(e) => setIncrementalValue(parseInt(e.target.value, 10))}
        value={incrementalValue}
      /> */}
    </>
  );
}

export default App;
