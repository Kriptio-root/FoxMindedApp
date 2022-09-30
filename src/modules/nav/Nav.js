import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss"

export function Nav() {
    return (
        <header className="navHeader">
            <h1 className="navTitle">Navigation Bar</h1>
    <nav className="nav">
        <section>
            <ul className="navList">
                <li>
                    <NavLink
                        className="navLink"
                        end
                        style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}
                        to="/FoxMindedApp/">Posts</NavLink>
                </li>
                <li>
                    <NavLink
                        className="navLink"
                        end
                        style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}
                        to="/FoxMindedApp/users">Users</NavLink>
                </li>
                <li>
                    <NavLink
                        className="navLink"
                        end
                        style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}
                        to="/FoxMindedApp/todo">Todo</NavLink>
                </li>
            </ul>
        </section>
    </nav>
        </header>
    )
}

export  default  Nav;