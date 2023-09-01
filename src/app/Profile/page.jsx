"use client"

import React from 'react';
import cover from "/public/catCover.PNG";
import dp from "/public/jahid.PNG";
// import fb from "/public/fb.PNG";
// import linkDin from "/public/linkDin.PNG";
// import github from "/public/github.PNG";

import { AiFillLinkedin } from 'react-icons/ai';
import { FaGraduationCap, FaSchool, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import Image from 'next/image';
import { TbSend } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { LuEdit } from 'react-icons/lu';
import PostCards from '@/components/HomePage/Feed/postCard/PostCards';
import useAuth from "@/hooks/useAuth";

const ProfilePage = () => {

    const { user } = useAuth()
    return (
        <>

            <div className='profile-container '>
            <div className='w-[1550px] h-[450px] mx-auto mt-1 mb-8'>
               <Image src={cover} alt='Profile Cover' className=' h-full w-full object-cover mx-auto rounded-[14px] mb-4  '  />
               </div>
                <div className="profile-details bg-white rounded-[4px] flex justify-between">
                    <div className="pd-left mx-auto">
                        <div className="pd-row flex mx-auto">
                            <div className="avatar mr-5">
                                <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <Image src={dp} alt='Profile Picture' className='pd-image w-full' />
                                </div>
                            </div>
                            <div className='mx-auto'>
                               {!user ?  <h3 className='text-25 font-semibold text-2xl'>Jahid Howladar</h3> : <><h3 className='text-25 font-semibold text-2xl'>{user?.displayName}</h3></>}
                                <p className='text-30 '>120+ Friend</p>
                                <div className='flex justify-start space-x-2 w-full pt-3 cursor-pointer'>
                                    <BsFacebook size={24} />
                                    <AiFillLinkedin size={24} />
                                    <BsGithub size={24} />
                                    {/* <Image src={fb} alt='facebook' />
                                    <Image src={linkDin} alt='facebook' />
                                    <Image src={github} alt='facebook' /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pd-right mx-auto">

                        <button className='btn btn-outline inline-flex border-spacing-0 outline-0 pt-1 items-center ml-3 mb-2' type='button'>Contact <TbSend /></button>
                        <button className='btn btn-outline inline-flex border-spacing-0 outline-0 pt-1 items-center ml-3 mb-2' type='button'>Follow <AiOutlinePlus /></button>
                        <a className='btn btn-outline inline-flex border-spacing-0 outline-0 pt-1 items-center ml-3' ><LuEdit /></a>

                    </div>
                </div>
                <hr className='mt-10' />

                <div className='profile-info'>
                    <div className="post-col grid lg:grid-cols-12">
                        <div className='col-span-5'>

                            {/* Education Section Code  */}

                            <div className='mt-6 mx-auto ml-8'>
                                <p className='text-center font-semibold text-2xl'>Education</p>
                                <hr className="h-1 w-28 bg-blue-color mx-auto mt-4 mb-3"></hr>
                                <div className='flex ml-28'>
                                    <FaGraduationCap size={36} />
                                    <h1 className='text-1xl ml-2 mt-1'>Studies at <span className='font-semibold'>Govt. Bangabandhu College</span></h1>
                                </div>
                                <div className='flex ml-28'>
                                    <FaSchool size={36} />
                                    <h1 className='text-1xl ml-2 mt-1'>Went to <span className='font-semibold'>Alim Uddin High School</span></h1>
                                </div>
                            </div>

                            {/* Skills Section Code */}

                            <div className='mt-6 mx-auto ml-8'>
                                <p className='text-center font-semibold text-2xl'>Skills</p>
                                <hr className="h-1 w-28 bg-blue-color mx-auto mt-4 mb-3"></hr>
                                <div className='flex ml-28 mt-2'>
                                    <FaReact size={36} />
                                    <h1 className='text-1xl ml-2 mt-1'>Comfortable in <span className='font-semibold'>React</span></h1>
                                </div>
                                <div className='flex ml-28 mt-2'>
                                    <SiNextdotjs size={36} />
                                    <h1 className='text-1xl ml-2 mt-1'>Comfortable in <span className='font-semibold'>Next JS</span></h1>
                                </div>
                                <div className='flex ml-28 mt-2'>
                                    <FaNodeJs size={36} />
                                    <h1 className='text-1xl ml-2 mt-1'>Comfortable in <span className='font-semibold'>Node JS</span></h1>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-7'>
                            <PostCards />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProfilePage;