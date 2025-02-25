import React from 'react';
import Skills from '@/components/Skills';
import Head from 'next/head';
import { TerminalDemo } from '@/components/Terminal';

export default function AboutPage() {
return (
  <div>
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

    </div>
);
}