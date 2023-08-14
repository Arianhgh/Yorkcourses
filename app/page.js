"use client"
import Image from 'next/image'
import {motion} from 'framer-motion'
import Courselist from './components/Courselist'



export default function Home() {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0 , y: -100}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="w-full flex flex-col justify-center items-center"
      >
        <h1>
          York Courses
        </h1>
        <h2>
          A Comprehensive Course Directory
        </h2>
      </motion.div>
      <Courselist />
     

      
    </section>
    
  )
}
