import React from 'react'
import {Html,useProgress} from '@react-three/drei'
import { progress } from 'framer-motion'


const Loader = () => {
  const {progress}=useProgress();
  return (
    <Html>
      <span className='canvas-load'>
        <p
          style={{
            fontSize:14,
            color:'#f1f1f1',
            fontWeight:800,
            marginTop:40
          }}
        >
          {progress.toFixed(0)}%
        </p>
      </span>
    </Html>
  )
}

export default Loader