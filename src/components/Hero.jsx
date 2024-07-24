import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiosdfghjzxcvbnpaklm1234567890-=!@#$%^&*()";

const Hero = () => {
  useEffect(() => {
    const span = document.querySelector("h1 > span ");

    if (!span) return;

    let interval = null;
    let iteration = 0;
    let isAnimating = false;

    const animateText = (target) => {
      if (isAnimating) return;
      isAnimating = true;
      iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        target.innerText = target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return target.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * 72)];
          })
          .join("");

        if (iteration >= target.dataset.value.length) {
          clearInterval(interval);
          isAnimating = false;
        }

        iteration += 1 / 10;
      }, 30);
    };

    // Run the animation once when the component mounts with a 1-second delay
    // setTimeout(() => animateText(span), 1000);

    // Add hover event listener
    const handleMouseOver = () => {
      if (!isAnimating) {
        animateText(span);
      }
    };

    span.addEventListener("mouseover", handleMouseOver);

    return () => {
      clearInterval(interval);
      span.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <section className={`relative flex flex-col gap-52 w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[80px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex  flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 shine rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="flex flex-col">
          <h1 className={`${styles.heroHeadText} text-white w-full`}>
            Hi, I'm <span data-value="Yash" style={{ zIndex: 10, position: 'relative', pointerEvents: 'auto',userSelect:"none" }} id="hack" className="text-[#915EFF]" >Yash</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          I develop innovative Web/App solutions using <br className='sm:block xs:hidden' />
          <TypeAnimation 
            className={`font-bold text-2xl sm:text-5xl`}
            sequence={[
              'React JS',
              1000,
              'Next JS',
              1000,
              'Tailwind',
              1000,
              'React Native',
              1000,
              'Kotlin',
              1000,
            ]}
            wrapper="span"
            speed={20}
            style={{display: 'inline-block', color:'#915EFF' }}
            repeat={Infinity}
          />
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
