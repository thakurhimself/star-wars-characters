'use client';

import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { ReactNode } from "react";

export default function Portal(
    { children, onClosePortal }: 
    { children?: ReactNode, onClosePortal: () => void }
) {
  return createPortal(
    <section 
    className="fixed z-[3500] inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: 150 }}
        className="w-[95%] md:w-3/4 lg:w-1/3 bg-white p-3 rounded-lg"
      >
        <section>
            <section className="flex justify-end">
                <button 
                onClick={() => {
                  onClosePortal()
                }}
                className="text-black text-2xl cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </section>
            {children}
        </section>
        
      </motion.div>
    </section>,
    document.body
  );
}