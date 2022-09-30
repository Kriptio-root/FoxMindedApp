import React, { useEffect } from 'react'
import TodoItem from './TodoItem'
import { useSelector, useDispatch } from 'react-redux'

import { getTodosAsync,selectAllTodos} from "./TodoSlice"
import { AddTodoForm }  from "./AddTodoForm"
import { Spinner} from "../../common/spinner/Spinner";


export const TodoList = () => {
	const dispatch = useDispatch()
	const todos = useSelector(selectAllTodos)

	const todosStatus=useSelector((state) => state.todos.status)
	const error= useSelector((state) => state.todos.error)

	useEffect(() => {
		if (todosStatus === 'idle') {
			dispatch(getTodosAsync())
		}
	}, [todosStatus,dispatch])


	let content

	if (todosStatus === 'loading') {
		content = <Spinner text="Loading..." />
	} else if (todosStatus === 'succeeded') {
		//console.log(todos)
		content = todos.map((todo) => (
			<TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
		))
	} else if (todosStatus === 'failed') {
		content = <div>{error}</div>
	}

	return (
		<section className="medium-container">
			<h2>Todos</h2>
			<AddTodoForm/>
			<div className="todoapp">
			<ul className="todo-list">
				{content}
			</ul>
			</div>
		</section>

	);
};

