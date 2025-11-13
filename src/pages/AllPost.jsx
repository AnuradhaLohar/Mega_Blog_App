import React, { useState } from 'react'
import appwriteService from '../appwrite/DBConfig'
import { Container, PostCard } from '../component'
import { useEffect } from 'react'

function AllPost() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.listPost([]).then(post => {
            if (post) {
                setPosts(post.documents)
            }
        })
    }, []);


    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) => (

                            console.log(post)
                            
                        ))
                    }
                    {
                        posts.map((post) => (

                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPost