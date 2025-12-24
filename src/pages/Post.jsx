import React, { useState } from 'react'
import appwriteService from '../appwrite/DBConfig'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Container } from '../component'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { useEffect } from 'react'

function Post() {

    const [post, setPost] = React.useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)
    const authStatus = useSelector(state => state.auth.status)

    const isAuthor = post && userData ? post.userId === userData.$id : false
    console.log(post);
    console.log(userData);

    console.log(isAuthor);



    useEffect(() => {
        if (!authStatus) {
            setPost(null)
            navigate('/')
            return
        }
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate('/')
            })
        } else navigate("/")
    }, [navigate, slug , authStatus]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate("/")
            }
        })
    }
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='rounded-xl'
                    />

                    {
                        isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button className="mr-3" bgColor="bg-green-500" >
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post