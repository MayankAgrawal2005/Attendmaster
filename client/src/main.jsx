import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.js';
import {persistor} from './redux/store.js';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/globle.css';
import './index.css'
import {Toaster } from 'react-hot-toast';


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor} >
  <BrowserRouter>
   <App />
   {/* <Toaster
  position="top-center"
  
  reverseOrder={false}
  toastOptions={{
    duration: 2000,
    className: "custom-toast",
  }}
/> */}
<Toaster
  position="top-center"
  reverseOrder={false}
  gutter={12}
  containerStyle={{
    top: 20,
  }}
  toastOptions={{
    duration: 2500,
    className: "premium-toast",
  }}
/>
 </BrowserRouter>
  </PersistGate>

  </Provider>

    
 
)
