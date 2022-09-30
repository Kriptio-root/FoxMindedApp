import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link  } from 'react-router-dom'

import {fetchUsers} from "./usersSlice";
import {Spinner} from "../../common/spinner/Spinner";
import {selectAllUsers} from "./usersSlice";

const UsersExcerpt = ({ user }) => {
    return (
        <article className="post-excerpt" key={user.id}>
            <div>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
            </div>
            <Link to={`/users/${user.id}`} state={{cur: `${user.id}`}} className="button button--user muted-button">
                View User Info
            </Link>
            <Link to={`/users/${user.id}/albums`} state={{cur: `${user.id}`}} className="button button--user muted-button">
                View User Activity
            </Link>
        </article>
    )
}

export const UsersList = () => {
    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)

    const userStatus = useSelector((state) => state.users.status)
    const error = useSelector((state) => state.users.error)

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [userStatus, dispatch])

    let userdata

    if (userStatus === 'loading') {
        userdata = <Spinner text="Loading..." />
    } else if (userStatus === 'succeeded') {
        userdata = users.map((user) => (
            <UsersExcerpt key={user.id} user={user} />
        ))
    } else if (userStatus === 'failed') {
        userdata = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Users</h2>
            {userdata}
        </section>
    )
}
