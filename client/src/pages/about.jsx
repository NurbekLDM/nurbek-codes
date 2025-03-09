'use client'
import React, {useState} from 'react';
import Skills from '@/components/Skills';
import Head from 'next/head';
import { TerminalDemo } from '@/components/Terminal';

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    
    setTimeout(() => {
        setLoading(false);
    }, 1000);

    if (loading) {
      return (
        <div className="flex justify-center mt-8 sm:pt-64 items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

return (
  <div>
    <Html>
     <Head>
        <title>About me</title>
        <meta name="description" content="This is the about page" />
      </Head>

    <div className='flex sm:justify-evenly flex-col sm:flex-row'>
 
    <TerminalDemo />
    <div className='h-screen max-h-80'>
      <Skills />
    </div>

    </div>
    </Html>

    </div>
);
}