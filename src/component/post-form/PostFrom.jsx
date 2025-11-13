import React from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import appWriteService from '../../appwrite/DBConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostFrom({ post }) {
    // console.log("1", post);

    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })
    // console.log("2", post);


    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    // console.log("3", post);


    

    const submit = async (data) => {
       
        console.log("Submit clicked");

        if (post) {
            const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null
            console.log('clicked',file);


            if (file) {
                appWriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appWriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
             console.log(dbPost);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            const file = await appWriteService.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId

                const dbPost = await appWriteService.createPost({ ...data, userId: userData.$id })
                console.log(dbPost);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

        console.log("submit end");
        
    }

    const slugTrasformation = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return ""
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue("slug", slugTrasformation(value.title), { shouldValidate: true })
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTrasformation, setValue]);

    return (



        <form onSubmit={handleSubmit(submit) } className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTrasformation(value.slug), { shouldValidate: true })
                    }}
                />
                <RTE
                    label="content:"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}

                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className='w-full mb-4'>
                        <img
                            src={appWriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type='submit'
                    className='w-full'
                    bgColor={post ? "bg-green-500" : undefined} >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostFrom