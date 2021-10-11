import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react'
import { Client as Styletron } from 'styletron-engine-atomic'

const debug = process.env.NODE_ENV === '' ? void 0 : new DebugEngine()

// 1. Create a client engine instance
const engine = new Styletron()

// 2. Provide the engine to the app
// debug engine needs inlined source maps
ReactDOM.render(
  <Provider store={store}>
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <App />
    </StyletronProvider>
  </Provider>,
  document.getElementById('root')
)
