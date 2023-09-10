/* eslint-disable jsx-a11y/alt-text */
"use client"
import useSWR from 'swr';
import React from "react";
import photo from "../../../public/fatin.PNG"
import Image from 'next/image';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import Suggestions from "@/components/HomePage/RighSidebar/Suggestions";
import Navbar from '@/components/Navbar/Navbar';
const SearchPage =  ({ searchParams }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR('/api/users', fetcher)
  console.log(data);
  const searchText = searchParams.userSearch;

  const filteredResults = data?.filter((user) =>
    user.name.replace(/\s+/g, "").toLowerCase().includes(searchText)
  );
  console.log(searchText);
 
  console.log(filteredResults);
  return (
    <>
    <Navbar/>
    <div className="flex justify-evenly mt-28">
      {filteredResults?.length === 0 ? (
        "No User Found"
      ) : (
        <div className="flex flex-col w-2/5 gap-4  content-center">
          <p className="text-3xl font-semibold">People</p>
          
          {
            filteredResults?.map((user) =>{
              console.log(user);
            })
          }
          {filteredResults?.map((user, index) => (
            <div key={index} className="border hover:bg-light-gray border-gray justify-evenly rounded-xl flex items-center px-5 py-2 gap-5">
              <Image src={user?.profile_picture} height={50} width={50} className="rounded-full w-10 h-10"></Image>
             <div className="flex flex-col">
             <h2 className='font-bold'> {user?.name}</h2>
             
             </div>
             <div className="flex gap-5">
              <button className="flex items-center border-1 gap-2 border-1 border  px-2 py-1 rounded-md text-primary-color  border-primary-color hover:bg-primary-color hover:text-white">Follow <AiOutlinePlusCircle size={22}/></button>
              <button className="flex items-center border-1 gap-2 border-1 border  px-2 py-1 rounded-md text-primary-color  border-primary-color hover:bg-primary-color hover:text-white">Message <HiOutlineChatAlt2 size={22}/></button>
             </div>
              {/* {user.profile_picture && (
      <Image src={user.profile_picture} width={40} height={40} />
    )} */}
            </div>
          ))}
        </div>
      )}
     
      <div className="mt-2">
        <Suggestions/>
      </div>
    </div>
    </>
  );
};

export default SearchPage;