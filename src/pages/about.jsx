import React from 'react';
import Skills from '@/components/Skills';
import Head from 'next/head';

export default function AboutPage() {
return (
  <div>
     <Head>
        <title>About Us</title>
        <meta name="description" content="This is the about page" />
      </Head>
    <div className='h-screen  max-h-96 overflow-hidden'>
      <Skills />
    </div>
    </div>
);
}