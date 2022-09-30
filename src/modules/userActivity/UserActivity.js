import {useSelector, useDispatch} from 'react-redux'
import {tabSelected, selectAllTabs, fetchActivityData, userMap} from './userActivitySlice'
import React, {useEffect} from "react";
import {useParams, useLocation} from 'react-router-dom'
import TodoItem from '../todo/TodoItem'
import {Spinner} from "../../common/spinner/Spinner"
import { Link  } from 'react-router-dom'

import {PostExcerpt} from '../posts/PostsList'


import "./style.scss"

export const UserActivity = () => {

    return (<TabPanel>
            <div title="Tab 1">
                <p>this is tab 1 content</p>
            </div>
            <div title="Tab 2">
                <h1>this is tab 2 content</h1>
            </div>
            <div title="Tab 3">
                <h1>this is tab 3 content</h1>
            </div>
        </TabPanel>);
}

const TabPanel = () => {

    const AlbumsExcerpt = ({album}) => {
        return (<article className="post-excerpt" key={album.id}>
                    <p>UserID: {album.userId}</p>
                    <p>Title: {album.title}</p>
            </article>)
    }

    let tabs = useSelector(selectAllTabs)

    let userTabs = tabs.map((tab) => (<Tab
            key={tab.id}
            tab={tab}
        />))

    let tabIndex = useSelector(state => state.tabs.currentTab.id)
    let tabName = useSelector(state => state.tabs.currentTab.name)
    let {userId} = useParams()
    let {userLocation} = useParams()
    const dispatch = useDispatch()
    let activityStatus = useSelector((state) => state.tabs.status)
    console.log(activityStatus)
    let content
    let args = [tabIndex, userId]
    const activityContent = useSelector((state) => state.tabs.content)

   function userMaps (userLocation) {
        dispatch(userMap(userLocation));
    }

    userMaps (userLocation)

    useEffect(() => {
        if (activityStatus === 'idle') {
            dispatch(fetchActivityData(args))
        }
    }, [activityStatus, dispatch])


    if (activityStatus == 'succeeded') {
        if (activityContent[0] && tabIndex == 3) {
            content = activityContent[0].map((activity) => (<PostExcerpt key={activity.id} post={activity}/>))
        } else if (activityContent[0] && tabIndex == 1) {
            content = activityContent[0].map((activity) => (<AlbumsExcerpt key={activity.id} album={activity}/>))
        } else if (activityContent[0]&&tabIndex == 2){
            content = activityContent[0].map((activity) => (
                console.log(activity),
                <TodoItem key={activity.id} id={activity.id} title={activity.title} completed={activity.completed} mixin={'hidden'} />
            ))
            content=                <div className="todoapp">
                <ul className="todo-list">
                    {content}
                </ul>
            </div>
        }
    } else if (activityStatus == 'pending') {
        content = <Spinner text="Loading..."/>
    } else if (activityStatus == 'failed') {
        content = <div>{error}</div>
    }

    return (<div className="tab-panel">
            <div className="tab-panel__header">
                {userTabs}
            </div>
            <div className="tab-panel__content">
                {content}
            </div>
        </div>);

}

const Tab = ({tab}) => {
    let {userId} = useParams()
    const stateL = useSelector(state => state.tabs.currentTab.id)
    const dispatch = useDispatch()
    const handleClickActivity = () => {
        dispatch(tabSelected(tab));
    }

    let tabClassName = tab.id == stateL ? 'tab tab--selected' : 'tab tab--unselected'

    return (
        <Link className={tabClassName} to={`/users/${userId}/${tab.name}`} state={{cur: `${userId}`}} onClick={handleClickActivity}>
        <span className="tab__label">{tab.name}</span></Link>
     );
}

