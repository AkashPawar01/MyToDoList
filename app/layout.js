import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}
      <ToastContainer/>
      </body>
    </html>
  )
}
