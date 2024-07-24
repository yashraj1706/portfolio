import React from 'react'
import { motion,useScroll,useSpring } from 'framer-motion'
import { experiences } from '../constants'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { slideIn, textVariant } from '../utils/motion'
import "react-vertical-timeline-component/style.min.css"


const ExperienceCard=({experience})=>(
    <VerticalTimelineElement
    intersectionObserverProps={{}}
      contentStyle={{background:'#1d1836',color:'#fff'}}
      contentArrowStyle={{borderRight:'7px solid #232631',}}   
      date={experience.date}
      iconOnClick={()=>{}}
      iconStyle={{background:experience.iconBg}}
      icon={
        <div>
          <img src={experience.icon} alt={experience.company_name}
            className='w-[100%] h-[100%] rounded-full object-cover mx-auto'
          />
        </div>
      }
    >
      <div>
          <h3 
          className=' exp-bg bg-gradient-to-br from-[#00ffe5] via-[#b798fe]  to-[#ff69e3]  text-transparent bg-clip-text text-[24px] font-bold'
        >
          {experience.title}
        </h3>
        <p className='text-[16px] text-secondary font-semibold'>{experience.company_name}</p>
      </div>
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point,index)=>(
          <li className='text-white-100 text-[14px] pl-1 tracking-wider'
            key={`experience-point-${index}`}
          >{point}</li>
        ))}
      </ul>
    </VerticalTimelineElement>
  )


const Experience = () => {
  const ref = React.createRef();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "start start"] });
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
    });
  return (
    <div className='' ref={ref}>
      <motion.div 
       animate={{ x: 0, opacity: 1, }}
      transition={{ duration: 1, ease: "easeInOut" }}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center `}>
          Work Experience.
        </h2>
      </motion.div>
      <div className=" bg-transparent sticky top-9 left-0 p-10 z-[100]">
          <motion.div
            className="progressBar opacity-90 h-[5px] exp-bg bg-gradient-to-r from-[#00ffe5] via-[#b798fe]  to-[#ff69e3] rounded-full"
            style={{ scaleX }}
          />
      </div>
          
      <div className='mt-20 flex flex-col'>
        <VerticalTimeline 
          lineColor='linear-gradient(to top, rgba(255, 105, 227, 0.9) 0%, rgba(183, 152, 254, 0.9) 50%, rgba(0, 255, 229, 0.9) 100%)'
        >
          {experiences.map((exp,index)=>(
          
            <ExperienceCard key={index} experience={exp}/>
         
          ))}
         </VerticalTimeline>
      </div>
    </div>
  )
}

export default SectionWrapper(Experience,"work");