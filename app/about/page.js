'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import {motion} from 'framer-motion'

const page = () => {
  return (
    <motion.div className='wrapperabout'
    initial={{ opacity: 0 , x: -100}}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}

    
    >
        <h1>About</h1>
        <p className='aboutp'>
            I have always seen me and my friends struggle to find the right prerequisites for our courses or to find the details of a course we want to take in the future.
            This is why I created this website, to help gather all the information in one place. It is still a work in progress and I am still adding more courses and features.
            for now, I have only added EECS courses.
            
        </p>
        <p className='aboutp'>
        I hope you find this website useful.
        </p>
        <p className='aboutp2'>
        I am not affiliated with York University and this website is not official.
        </p>
        <p className='aboutp'>
            If you want to contact me, you can reach me at <a href="mailto:arian22181424@gmail.com">arian22181424@Gmail.com</a>
        </p>
        
      
    </motion.div>
  )
}

export default page
