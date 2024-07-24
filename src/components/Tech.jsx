import React from 'react'
import { BallCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { technologies } from '../constants'
import { motion } from 'framer-motion'
import { textVariant } from '../utils/motion'
import { styles } from '../styles'


const Tech = () => {
  const width=window.innerWidth
  console.log(width)
  return (
    <div className='flex min-h-fit flex-row flex-wrap justify-center gap-16'>
      <motion.div className='w-full' variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>my tools</p>
        <h2 className={`${styles.sectionHeadText}`}>Tech Stack.</h2>
      </motion.div>
      {
        technologies.map((tech,index)=>{
          if(index<4 || width>500){
            return <div className='w-28 h-28' key={tech.name}>
            <BallCanvas icon={tech.icon} />
            </div> 
          }else{
            return <div className='w-0 h-0'></div>
          }
        })
      }
    </div>
  )
}

export default SectionWrapper(Tech,"");