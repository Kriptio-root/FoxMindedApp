import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from "./TodoSlice";

export const AddTodoForm = () => {
	const [value, setTodoTitle] = useState('');
	const dispatch = useDispatch();

	const onTodoChanged = e => setTodoTitle(e.target.value)

	const onSubmit = (event) => {
		event.preventDefault();
		if (value) {
			setTodoTitle('');
			dispatch(
				addTodoAsync({
					title: value,
				})
			);
		}
	};



	return (
		<form onSubmit={onSubmit} className="addNewPost-form">
			<input
				id="todo"
				type='text'
				className="new-todo"
				placeholder='Add todo...'
				value={value}
				onChange={onTodoChanged}
			>
			</input>

			<button type='submit' className="button">
				Submit
			</button>
		</form>
	);
};

