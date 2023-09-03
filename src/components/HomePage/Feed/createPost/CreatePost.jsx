"use client";

import "./CreatePost.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BsImageFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import useAuth from "@/hooks/useAuth";

const CreatePost = () => {
  const router = useRouter();
  const { user } = useAuth();
  console.log(user?.photoURL);
  const [imageURL, setImageURL] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [loading, setLoading] = useState(false);
  // console.log(privacy);

  const textareaRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (textareaRef.current && !textareaRef.current.contains(event.target)) {
      // Clicked outside the textarea, collapse it to 2 rows
      setExpanded(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the textarea
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    // Toggle the expanded state when clicked
    setExpanded(!expanded);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const url =
      "https://api.imgbb.com/1/upload?expiration=600&key=f3218173624c8aebe56d3c415677e482";

    setLoading(true);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setImageURL(data.data.url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { text } = data;

    const newPost = {
      author: {
        email: user?.email,
        name: user?.displayName,
        profile_picture:user?.photoURL,
      },
      content: text,
      image: imageURL,
      privacy,
    };

    const url = "http://localhost:3000/api/posts";

    if (loading) {
      return;
    }

    try {
      const res = await fetch(url, {
        cache: "no-cache",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (res.ok) {
        router.refresh();
        setImageURL("")
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
        <section className="relative bg-[#D2D2D2] p-4 bg-opacity-75 shadow-sm w-[90%] mx-auto mt-10">
          <div className="">
            <h1 className="text-center font-semibold text-lg py-2">Create a Post</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-5">
              <textarea
                ref={textareaRef}
                id="text"
                name="text"
                cols="30"
                rows={expanded ? 8 : 2}
                onClick={handleClick}
                defaultValue=""
                className="w-full resize-none p-3 text-md rounded-md focus:outline-none focus:shadow-lg"
                placeholder="What's Your Mind"
                {...register("text")}
              ></textarea>

              <div className="mt-5">
                {loading && (
                  <BeatLoader color="#36d7b7" loading margin={4} size={10} speedMultiplier={1} />
                )}
                {imageURL && (
                  <Image
                    src={imageURL}
                    width={150}
                    height={80}
                    objectPosition="center"
                    className="w-36 h-20"
                    alt=""
                  />
                )}
              </div>

              <div className="flex justify-between mt-6 items-center">
                <div className="flex gap-x-2">
                  <label className="custom-file-upload">
                    <input
                      className="h-auto"
                      type="file"
                      id="image-input"
                      accept="image/*"
                      onChange={handleImage}
                    />
                    <BsImageFill color="" size={22} />
                  </label>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="flex items-center justify-end">
                    <label for="inputTag">
                      <input id="inputTag" type="file" />
                    </label>

                    <div className="form-control w-full ">
                      <select
                        className="select select-bordered rounded-none"
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <button className="btn btn-info rounded-none font-semibold lg:ml-5">
                      Create Post
                    </button>
                    <div className="form-control w-full max-w-xs flex "></div>
                  </div>
                  {/* <BsEmojiSmile size={22} className="mt-5" /> */}
                </div>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default CreatePost;
