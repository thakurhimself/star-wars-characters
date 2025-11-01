'use client';

import { motion } from "motion/react";
import { ReactNode } from "react";

export default function AnimationWrapper(
    {children, index}: 
    {children: ReactNode, index: number}
) {
    return (
         <motion.div 
        initial={{opacity: 0, y: 100}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.2*(index+1)}}
        >
            {children}
        </motion.div>
    )
}