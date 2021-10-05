// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const REDUCER_TYPES = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
}

function reducerCount(state, action) {
  // console.log({state, action})
  //add suport to accept a function to our dispatcher
  if (typeof action === 'function') {
    action = action(state)
  }

  const {type, payload} = action

  const currentCount = state.count
  switch (type) {
    case REDUCER_TYPES.INCREMENT:
      return {count: currentCount + payload}

    case REDUCER_TYPES.DECREMENT:
      return {count: currentCount - payload}
    default:
      throw new Error(`Unsupported action type: ${type}`)
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [state, stateDispatcher] = React.useReducer(reducerCount, {
    count: initialCount,
  })
  const {count} = state

  const increment = () =>
    stateDispatcher({type: REDUCER_TYPES.INCREMENT, payload: step})

  const decrement = () =>
    stateDispatcher({type: REDUCER_TYPES.DECREMENT, payload: step})

  return (
    <div style={containerStyles}>
      <p>useReducer Counter</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button onClick={increment} style={buttonStyles}>
          +
        </button>
        <p style={childrenStyles}>{count}</p>
        <button onClick={decrement} style={buttonStyles}>
          -
        </button>
      </div>
    </div>
  )
}

function App() {
  return <Counter />
}

const containerStyles = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
  flexDirection: 'column',
}

const childrenStyles = {
  margin: '12px',
}

const buttonStyles = {
  ...childrenStyles,
  height: '48px',
  width: '48px',
  borderRadius: '50%',
  border: 'none',
  boxShadow: '0px 0px 1px #032248f7',
  backgroundColor: '#004cabe3',
  color: '#ffffff',
}

export default App
