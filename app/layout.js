import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'York Courses',
  description: 'A website to help York University students find the prerequisites for their courses.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='main-bg'>
          <div className='gradient'/>
        </div>
        <div className='app'>
          <Nav/>
          {children}
        </div>
        
      </body>
    </html>
  )
}
