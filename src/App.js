import React from 'react'
import {BrowserRouter as Router, Route, Routes, Redirect} from "react-router-dom";

import './resources/styles/commonStyles.scss';

import Nav from "./modules/nav/Nav";
import { PostsList } from "./modules/posts/PostsList";
import { SingleUserPage } from './modules/singleUser/SingleUserPage'
import {UsersList} from "./modules/users/UsersList";
import  { TodoList } from './modules/todo/TodoList'
import { UserActivity } from './modules/userActivity/UserActivity'
function App() {
    console.log('test')
    return (
        <Router>
            <Nav />
            <div className="App">
                <main>
                    <Routes>
                        <Route exact path="/FoxMindedApp/" element={<PostsList />} />
                       <Route exact path="/FoxMindedApp//users" element={<UsersList />} />
                        <Route exact path="/FoxMindedApp//users/:userId" element={<SingleUserPage />} />
                       <Route exact path="/FoxMindedApp//users/:userId/:userLocation" element={<UserActivity />} />
                       {/*<Route exact path="/users/:userId/:todos" element={<UserActivity />} />*/}
                       {/*<Route exact path="/users/:userId/:posts" element={<UserActivity />} />*/}
                        <Route exact path="/FoxMindedApp//todo" element={<TodoList />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
