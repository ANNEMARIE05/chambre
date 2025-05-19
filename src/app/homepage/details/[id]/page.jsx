'use client'

import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function Detais({ params }) {
  const router = useRouter();
  const { id } = use(params);
  return(
    <>
        <h1>{id}</h1>
    </>
  )
}
