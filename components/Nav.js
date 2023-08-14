import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className='nav'>
        <div className='nav-left'>
            <Link href='/'>
            <img src="/logo1.png" alt='York Courses Logo' className='logo'/>
            </Link>
        </div>
        <div className='nav-right'>
            <ul className='nav-links'>
                <Link href='/'>
                <li className='nav-link'>Courses</li>
                </Link>
                <Link href='/about'>
                <li className='nav-link'>About</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Nav
