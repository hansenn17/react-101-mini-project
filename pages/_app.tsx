import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthProvider from '../context/AuthContext'
import axios from 'axios'

axios.defaults.baseURL = 'https://631096c136e6a2a04ef23ca2.mockapi.io/api/v1'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
