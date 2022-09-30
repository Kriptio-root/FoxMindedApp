import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link  } from 'react-router-dom'

import "./style.scss"

import { AddPostForm } from  './AddPostFormik'
import { selectAllPosts, fetchPosts } from './postsSlice'
import {Spinner} from "../../common/spinner/Spinner";

export const PostExcerpt = ({ post }) => {
    console.log(post)
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <p>Post Author: {post.userId}</p>
            </div>
            <p className="post-content">{post.body.substring(0, 100)}</p>
        </article>
    )
}

export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)

    const postStatus = useSelector((state) => state.posts.status)
    const error = useSelector((state) => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content

    if (postStatus === 'loading') {
        content = <Spinner text="Loading..." />
    } else if (postStatus === 'succeeded') {
        content = posts.map((post) => (
            <PostExcerpt key={post.id} post={post} />
        ))
    } else if (postStatus === 'failed') {
        content = <div>{error}</div>
    }
    return (
        <section className="posts-list">
            <AddPostForm />
            <h2 className="posts-list__header">Posts</h2>
            {content}
        </section>
    )
}
