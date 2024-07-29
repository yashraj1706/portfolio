import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn,textVariant,fadeIn } from '../utils/motion';




const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [copied, setcopied] = useState(false);

  const handleCopy=()=>{
    navigator.clipboard.writeText("yashsng7@gmail.com");
    setcopied(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const service=import.meta.env.VITE_EMAILJS_SERVICE_KEY;
  const user=import.meta.env.VITE_EMAILJS_USER_KEY;
  const template=import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    emailjs
     .send(
        service,
        template,
        {
          from_name: form.name,
          to_name: 'Yash',
          from_email: form.email,
          to_email: 'yashsng7@gmail.com',
          message: form.message,
        },
        user
      )
     .then(() => {
        setLoading(false);
        toast.success('Thank you, I will get back to you as soon as possible!');
        setForm({
          name: '',
          email: '',
          message: '',
        });
      })
     .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error('Something went wrong!');
      });
  };

  return (
    <>
    <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Get in touch</p>
        <h2 className={`${styles.sectionHeadText}`}>Contact.</h2>
    </motion.div>
    <motion.p
       variants={fadeIn("","",0.1,1)}
       className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
       >
        Thank you for visiting my portfolio.<br/>If you have any questions, opportunities or just want to chat, please feel free to contact me!
       </motion.p>
    <div className='xl:mt-12 relative xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <span className='hash-span text-[1px]' id='contactform'>&nbsp;</span>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white'>Your Name</span>
            <input
              type='text'
              placeholder='What is your name?'
              name='name'
              value={form.name}
              onChange={handleChange}
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <span className='text-red-500'>{errors.name}</span>}
          </label>
          <label className='flex flex-col'>
            <span className='text-white'>Your Email</span>
            <input
              type='email'
              placeholder='What is your email?'
              name='email'
              value={form.email}
              onChange={handleChange}
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <span className='text-red-500'>{errors.email}</span>}
          </label>
          <label className='flex flex-col'>
            <span className='text-white'>Your Message</span>
            <textarea
              rows='4'
              placeholder='What do you want to say?'
              name='message'
              value={form.message}
              onChange={handleChange}
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ${errors.message ? 'border-red-500' : ''}`}
            />
            {errors.message && <span className='text-red-500'>{errors.message}</span>}
          </label>
          <button
            className='bg-tertiary py-3 px-8 border-[1.5px] w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
            type='submit'
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 self-center xl:h-[650px] md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
      <div className="absolute md:hidden xs:bottom-10 top-72 w-full flex justify-center items-center">
        <a href="#contactform">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: '4rem', // Adjust this value to the height of your navbar
          },
        }}
      />
    </div>
    
  </>);
};

export default SectionWrapper(Contact, 'contact');
