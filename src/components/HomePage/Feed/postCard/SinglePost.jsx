'use client';
import Image from 'next/image';
import { useState } from 'react';
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { BsSave, BsThreeDots } from 'react-icons/bs';
import { PiShareFat } from 'react-icons/pi';
import CommentSection from './CommentSection';
import EditOption from './EditOption';
import SingleComment from './SingleComment';

const SinglePost = ({ post }) => {
	const [react, setReact] = useState(false);
	const [open, setOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { _id } = post;

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleReact = () => {
		setReact(!react);
		const reaction = {
			_id,
			author: {
				name: '',
				profile_picture: '',
			},
			reaction: 1 
		};
		// console.log(reaction);
		
		fetch('http://localhost:3000/api/posts', {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(reaction),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Network response was not ok');
				}

				return res.json();
			})
			.then((data) => {
				console.log('Received data:', data);
			})
			.catch((error) => {
				console.error('Fetch error:', error);
			});
	};

	return (
		<div data-aos="fade-up" className="lg:px-0 border-2 rounded-md mb-3">
			<div className="w-full flex items-center justify-between p-2">
				<div className="flex items-center">
					<Image
						src={post?.author?.profile_picture}
						width={50}
						height={50}
						alt="Picture of the author"
						className="rounded-full h-12 w-12 object-cover border p-1 mr-3"
					/>
					<p className="font-bold capitalize">{post?.author?.name}</p>
				</div>
				<button onClick={openModal}>
					<BsThreeDots
						size={28}
						className="hover:scale-125 duration-300 hover:text-gray-400 hover:cursor-pointer"
					/>
				</button>
				<EditOption
					closeModal={closeModal}
					openModal={openModal}
					isOpen={isOpen}
				></EditOption>
			</div>
			<h1 className="min-h-64 px-5 py-3">{post?.content}</h1>
			<Image
				src={post?.image}
				width={815}
				height={400}
				alt="Posted Image"
				className="object-contain border"
			/>
			<div className="flex justify-between px-5 py-3 ">
				{post.comments.length > 0 && (
					<div>
						{post?.comments?.map((comment, i) => (
							<SingleComment
								key={i}
								comment={comment}
								id={post._id}
							></SingleComment>
						))}
					</div>
				)}
				<div className="flex gap-3">
					<BsSave
						size={26}
						className="hover:scale-125 duration-300 hover:text-gray-400 hover:cursor-pointer"
					/>
					<AiOutlineComment
						onClick={() => setOpen(!open)}
						size={28}
						className="hover:scale-125 duration-300 hover:text-gray-400 hover:cursor-pointer"
					/>
					<PiShareFat
						size={26}
						className="hover:scale-125 duration-300 hover:text-gray-400 hover:cursor-pointer"
					/>
					{react ? (
						<AiFillHeart
							// onClick={handleReact}
							// onClick={() => setReact(!react)}
							size={28}
							className="hover:scale-125 duration-300 hover:text-red-400 hover:cursor-pointer text-red-500"
						/>
					) : (
						<AiOutlineHeart
							// onClick={() => setReact(!react)}
							onClick={handleReact}
							size={28}
							className="hover:scale-125 duration-300 hover:text-gray-400 hover:cursor-pointer"
						/>
					)}
					<p className="font-semibold text-lg">
						{post?.likes && post?.likes.length}
					</p>
				</div>
			</div>
			<div className="px-5 pb-5 ">
				<div>
					{/* <p>
						{likes && (
							<>
								Liked by
								{likes.length > 1 ? (
									<>
										<Link className="font-bold" href={`/user/${likes[0]}`}>
											{likes[0]}
										</Link>
										and <span className="font-bold"> others</span>
									</>
								) : (
									<Link href={`/user/${likes[0]}`}>{likes[0]}</Link>
								)}
							</>
						)}
					</p> */}
				</div>
				{/* <p className="text-neutral-400 text-base">Add a comment...</p> */}
				<CommentSection id={post._id} open={open}></CommentSection>
			</div>
		</div>
	);
};

export default SinglePost;