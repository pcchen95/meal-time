import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider } from 'react-redux'
import store from './redux/store'
const debug = process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine()

// 1. Create a client engine instance
const engine = new Styletron()

// 2. Provide the engine to the app
// debug engine needs inlined source maps
ReactDOM.render(
  <StyletronProvider value={engine} debug={debug} debugAfterHydration>
    <Provider store={store}>
      <App />
    </Provider>
  </StyletronProvider>,
  document.getElementById('root')
)
