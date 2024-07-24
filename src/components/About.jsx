import React,{useEffect,useRef} from 'react'
import {Tilt} from 'react-tilt'
import {motion} from 'framer-motion'

import { styles } from '../styles'
import { services } from '../constants'
import {fadeIn,textVariant} from '../utils/motion'
import { SectionWrapper } from '../hoc'
import '../index.css'

const ServiceCard=({index,title,icon})=>{
  return(
    <Tilt className='xs:w-[250px] w-full card select-none '>
      <motion.div
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
        variants={fadeIn("right","spring",0.5*index,0.75)}
      >
        <div
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
          options={{
            max:45,
            scale:1,
            speed:450
          }}
        >
          <img 
            src={icon} 
            alt={title}
            className='w-16 h-16 object-contain'
          />
          <h3 className='text-white font-bold text-center text-[20px]'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  )
}


const About = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = cardsRef.current.getElementsByClassName('card');
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const cardsElement = cardsRef.current;
    if (cardsElement) {
      cardsElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (cardsElement) {
        cardsElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText}`}>Overview.</h2>
      </motion.div>
      <motion.p
       variants={fadeIn("","",0.1,1)}
       className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
       >
      Hello! I'm Yash Raj Singh, a passionate web developer from Kashipur, Uttarakhand, India. Currently pursuing a B.Tech degree in Computer Science Engineering from KIIT University, I have a strong foundation in Programming, Web development and App development.<br/><br/>

With a diverse skill set that includes React, JavaScript, Java, and more. My experience spans across creating Responsive Designs,Real-Time Communication apps, Database Management, AI integration, Web-Based Games, Mobile Apps and Automation Tools. I have successfully contributed to various projects and hackathons, showcasing my ability to deliver dynamic and user-centric solutions.<br/><br/>
In addition to my technical skills, I bring a deep understanding of operating systems, data structures, algorithms, and computer networks. <br/>
 My goal is to leverage my knowledge and skills to create innovative and efficient digital solutions.</motion.p>
      <div className='mt-20  cards flex flex-wrap gap-10 ' ref={cardsRef}>
        {services.map((service,index)=>{
          return <ServiceCard key={service.title} index={index} {...service} />
        })}
      </div>
    </>
  )
}

export default SectionWrapper(About,"about");