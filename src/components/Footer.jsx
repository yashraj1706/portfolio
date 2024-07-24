import React,{useState} from 'react'
import Lottie from 'react-lottie';
import animationData from './data/confetti.json'
import { IoCopyOutline } from 'react-icons/io5';
import { LinkedinSvg } from './svgcomponents/SvgComps';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { FaLocationArrow } from 'react-icons/fa';
import linkedin from '../assets/socialsSvgs/linkedin.png'
import { github } from '../assets';


const Footer=()=>{
    const [copied, setcopied] = useState(false);

    const handleCopy=()=>{
      navigator.clipboard.writeText("yashsng7@gmail.com");
      setcopied(true);
    }

    const MagicButton = ({
        title,
        icon,
        position,
        handleClick,
        otherClasses
      }) => {
        return (
          <button
            className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none"
            onClick={handleClick}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span
              className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
                   bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
            >
              {position === "left" && icon}
              {title}
              {position === "right" && icon}
            </span>
          </button>
        );
      };
    
      const MagicIcon = ({
        title,
        icon,
        img,   
        position,
        handleClick,
        otherClasses
      }) => {
        return (
          <button
            className="relative  cursor-pointer inline-flex h-12 w-fit md:w-fit md:mt-10 overflow-clip rounded-lg p-[1px] hover:p-[2px] duration-300 focus:outline-none"
            onClick={handleClick}
          >
            <span className="absolute text-center inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span
              className={`inline-flex h-full w-full cursor-default items-center justify-center rounded-lg
                   bg-slate-950 px-0  text-sm font-medium text-white backdrop-blur-3xl  ${otherClasses}`}
            >
                  <div>
                    <img src={img} alt="icons" className='w-12' />
                  </div>
            </span>
          </button>
        );
      };


  return (
    <footer className='w-full flex items-center justify-center border-t-2 border-white p-0 m-0'>
        <div className=" w-full flex flex-col md:flex-row justify-center md:items-end items-center md:gap- mb-10 gap-6">
                <p className="md:text-base
                md:
                text-center
                inline-flex   w-full mt-7 text-sm md:font-normal font-light">
                Copyright © 2024 Yash Raj Singh
                </p>
                <div className='w-full gap-3 mr-3 md:justify-end
                justify-center items center flex flex-col md:flex-row'>
                <div className='w-fit flex relative justify-center mx-auto 
               md:m-0 items-center p-0 m-0'>
                <div
                 className={`absolute  -bottom-5 right-0 ${copied ? "block" : "block"
                   }`}
                >
                 <Lottie options={{
                     loop: copied,
                     autoplay: copied,
                     animationData: animationData,
                     rendererSettings: {
                     preserveAspectRatio: "xMidYMid slice",
                     },
                 }} height={200} width={400} />
             </div>

               <MagicButton
                 title={copied ? "Email is Copied!" : "Copy my email address"}
                 icon={<IoCopyOutline />}
                 position="left"
                 handleClick={handleCopy}
                 otherClasses="!bg-[#161A31]"
               />
                </div>
                <div className='w-fit mx-auto md:m-0 flex justify-center gap-3 m-0 p-0'>
                <a href="https://www.linkedin.com/in/yash-raj-singh-b48756256/" target="_blank" rel="noreferrer"><MagicIcon img={linkedin} /></a>
                <a href="https://github.com/yashraj1706" target="_blank" rel="noreferrer"><MagicIcon img={github} {...`w-10`}   /></a>    
                </div>
                </div>
        </div>
    </footer>
  )
}

export default Footer;

// handleClick={()=> window.open("https://www.linkedin.com/in/yash-raj-singh-b48756256/","_blank")}

//handleClick={()=> window.open("https://github.com/yashraj1706","_blank")}