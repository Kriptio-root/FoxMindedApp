import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useLocation} from 'react-router-dom'
import {selectUserById} from '../users/usersSlice'
import {fetchUsers} from "../users/usersSlice";
import {Spinner} from "../../common/spinner/Spinner";

import {AiOutlineMail, AiFillPhone, AiFillHome, AiFillInstagram, AiOutlineSisternode} from "react-icons/ai"

import '../users/styles.scss'

export const SingleUserPage = () => {

    const dispatch = useDispatch()

    const userStatus = useSelector((state) => state.users.status)

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [userStatus, dispatch])

    const {userId} = useParams();
    const user = useSelector(state => selectUserById(state, userId))

    if (userStatus === 'loading') {
       return <Spinner text="Loading..."/>
    } else if (userStatus === 'succeeded'&&user) {
        return (
            <section className="user__article-wrapper">
                <article className="user__article">
                    <p className="user__article-content"><span className="user__article-content--icon"><AiOutlineMail/></span><span
                        className="user__article-content-text"><span>{user.email}</span><span
                        className="user__article-content-text--disabled">Email</span></span></p>
                    <p className="user__article-content"><span
                        className="user__article-content--icon"><AiFillPhone/></span><span
                        className="user__article-content-text"><span>{user.phone.substring(0, user.phone.indexOf(' '))}</span><span
                        className="user__article-content-text--disabled">Mobile</span></span></p>
                    <p className="user__article-content"><span
                        className="user__article-content--icon"><AiFillHome/></span><span
                        className="user__article-content-text"><span>{user.address.suite} {user.address.street}</span><span>{user.address.city},{user.address.zipcode}</span><span
                        className="user__article-content-text--disabled">Work</span></span></p>
                    <p className="user__article-content"><span
                        className="user__article-content--icon"><AiFillInstagram/></span><span
                        className="user__article-content-text"><span>{user.website}</span><span
                        className="user__article-content-text--disabled">Social Channels</span></span></p>
                    <p className="user__article-content"><span
                        className="user__article-content--icon"><AiOutlineSisternode/></span><span
                        className="user__article-content-text"><span>{user.company.name}</span><span>{user.company.catchPhrase}</span><span
                        className="user__article-content-text--disabled">Segments</span></span></p>
                </article>
            </section>
        )
    }
    else  if (!user) {
        return (
            <section>
                <h2>User not found!</h2>
            </section>
        )
    }
    else if (userStatus === 'failed') {
    return (
        <section>
            <h2>User not found!</h2>
        </section>
    )
}
}
