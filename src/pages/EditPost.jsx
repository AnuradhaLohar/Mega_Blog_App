import React, { useState } from 'react'
import { Container, PostForm } from '../component'
import appwriteService from '../appwrite/DBConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function EditPost() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then(post => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost