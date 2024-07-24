import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { github,link } from '../assets'
import { SectionWrapper } from '../hoc'
import { projects } from '../constants'
import { fadeIn,textVariant } from '../utils/motion'
import {  WebRTCSvg,ReactSvg,ReduxSvg,TailwindSvg, AppwriteSvg, NodeJsSvg } from './svgcomponents/SvgComps'
import useIntersectionObserver from '../hooks/useIntersectionObserver'



import '../index.css'
const ProjectCard=({index,name,description,tags,image,source_code_link,website_link })=>{
  return (
    <motion.div variants={fadeIn("up","spring",index*0.5,0.75) }>
      <Tilt 
      options={{
          scale:1,
          max:45,
          speed:450
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[400px] w-full"
      >
        <div className='relative w-full h-[200px]'>
          <img src={image} alt={name} className='w-full h-full  object-cover rounded-2xl' />
          <div className='rounded-full absolute inset-0 flex justify-end m-3 gap-2 card-img_hover'>
          <div
              onClick={()=> window.open(website_link,"_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img src={link} alt="project-link"
              className='w-[60%] h-[60%] hover:w-[90%] hover:h-[90%] duration-500'
              />
            </div>
            <div
              onClick={()=> window.open(source_code_link,"_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img src={github} alt="github"
              className='w-[60%] h-[60%] hover:w-[100%] hover:h-[100%] duration-500 flex items-center'
              />
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <h3 className={`text-white text-bold text-[24px]`}>
              {name}
          </h3>
          <p className='mt-2 max-h-[100px] text-secondary text-[14px]'>{description}</p>
        </div>
        <div className='mt-8 rounded-xl p-1 flex items-center justify-evenly flex-wrap gap-2'>
          {tags.map((tag)=>{
            if(tag.name==="react"){
              return (<ReactSvg />)
            }else if(tag.name==="redux"){
              return (<ReduxSvg />)
            }else if(tag.name==="appwrite"){
              return (<AppwriteSvg />)
            }else if(tag.name==="tailwind"){
              return (<TailwindSvg />)
            }else if(tag.name==="rtc"){
              return (<WebRTCSvg />)
            }else if(tag.name==="node"){
              return (<NodeJsSvg />)
            }else{
              return (<></>)
            }
          })}
        </div>
      </Tilt>
    </motion.div>
  );
}



const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>
          My work
        </p>
        <h2 className={`${styles.sectionHeadText}`}>
          Projects.
        </h2>
      </motion.div>
      <div className='w-full flex '>
        <motion.p variant={fadeIn("","",0.1,1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Here are some of the key projects I’ve developed, showcasing my skills in full-stack development, real-time communication, and game development. Each project highlights my ability to deliver robust, user-friendly applications.

        </motion.p>
      </div>

      <div className='mt-20 max-h-fit flex flex-wrap justify-evenly gap-7'>
        {projects.map((project,index)=>(
          <ProjectCard key={`project-${index}`}
          index={index}
          {...project}
          />
        ))}
      </div>

    </>
  )
}

export default SectionWrapper(Works,"");