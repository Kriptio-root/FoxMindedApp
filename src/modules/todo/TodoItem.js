import React from 'react';
import {useDispatch} from 'react-redux';
import {toggleComplete, deleteTodoAsync} from "./TodoSlice";

const TodoItem = ({id, title, completed,mixin=''}) => {
    const dispatch = useDispatch();
    let labelDec
    const handleCheckboxClick = () => {
        dispatch(toggleComplete({id, title, completed: !completed}));
    };

    const handleDeleteClick = () => {
        dispatch(deleteTodoAsync({id}))
    };

    if (completed){
         labelDec = 'text__decoration'
    } else {
        labelDec=''
    }
    return (
        <li >
            <div className="view">
				<span className="todo-text">
					<input
                        className='check__input'
                        type='checkbox'
                        checked={completed}
                    ></input>
										        <svg
                                                    onClick={handleCheckboxClick}
                                                    className="check__box" viewBox="0 0 20 20" >
            <rect className="check__focus" width="25" height="23" rx="4" />
            <rect className="check__square" x="3" y="3" width="17" height="16" rx="12" />
            <polyline className="check__mark" points="7 11 10 14 16 7"/>
        </svg>
                    <label className={"todo__label "+labelDec}> {title}</label>
				</span>
                <button onClick={handleDeleteClick} className={"destroy " + mixin} >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
