import React from 'react'
import appwriteService from '../appwrite/DBConfig'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    const imageUrl = appwriteService.getFilePreview(featuredImage);
    // console.log(featuredImage);
    
    // console.log("Preview URL:", imageUrl);
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img
                        src={imageUrl}
                        alt={title}
                        className='rounded-xl  '
                    // style={{ width: "200px", height: "200px", objectFit: "cover" }} 
                    />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard