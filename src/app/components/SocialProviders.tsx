"use client";
import { signIn } from 'next-auth/react';
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
 type Provider = "github" | "google"

 const SocialLoginHandler = (provider: Provider) =>{
    signIn(provider, {redirectTo:"/profile"})
 }
const SocialProviders = () => {
  return (
    <div className="flex items-center justify-center gap-6 mt-6">
        <div className="border bg-blue-100 hover:bg-blue-200 rounded px-4 py-2 cursor-pointer w-1/2  flex justify-center items-center">
          <FcGoogle className="text-4xl" />
        </div>
        <div onClick={()=>SocialLoginHandler('github')} className="border bg-slate-100 hover:bg-slate-200 rounded px-4 py-2 cursor-pointer w-1/2  flex justify-center items-center">
          <FaGithub className="text-4xl" />
        </div>
      </div>
  )
}

export default SocialProviders