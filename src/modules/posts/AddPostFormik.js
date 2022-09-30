import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Formik, Form, useField, useFormikContext, ErrorMessage} from "formik"
import styled from "@emotion/styled"
import * as Yup from "yup";

import {addNewPost} from './postsSlice'
import {fetchUsers, selectAllUsers} from "../users/usersSlice";


const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;

  &:before {
    content: "❌ ";
    font-size: 10px;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MyTextInput = ({label, ...props}) => {

    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const MySelect = ({label, ...props}) => {

    const [field, meta] = useField(props);
    return (
        <>
            <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
            <StyledSelect {...field} {...props} />
            {meta.touched && meta.error ? (
                <StyledErrorMessage>{meta.error}</StyledErrorMessage>
            ) : null}
        </>
    );
};

export const AddPostForm = () => {


    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    const users = useSelector(selectAllUsers)
    const userStatus = useSelector((state) => state.users.status)
    const error = useSelector((state) => state.users.error)

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [userStatus, dispatch])

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section className="addNewPost-container">
            <h1>Add new post</h1>
            <Formik
                initialValues={{
                    postTitle: "",
                    postContent: "",
                    postAuthor: ""
                }}
                validationSchema={
                    Yup.object({
                        postTitle: Yup.string()
                            .min(5,"Not less then 5")
                            .required("Required"),
                        postAuthor: Yup.string()
                            .required("Required"),
                        postContent: Yup.string()
                            .required("Required")

                    })
                }
                onSubmit={async (values,{resetForm}) => {
                    console.log(values.postTitle)
                    dispatch(addNewPost(values))
                    resetForm({
                        values:{
                        postTitle: "",
                        postContent: "",
                        postAuthor: ""
                        }
                    })
                }}
            >
                <Form className="addNewPost-form">
                    <MyTextInput
                        className="addNewPost-form-postTitle__area"
                        label="Post Title"
                        name="postTitle"
                        type="text"
                        placeholder="Title"
                        id="postTitle"
                    />
                    <MySelect
                        label="Post Author"
                        name="postAuthor"
                        id="postAuthor"
                    >
                        className="addNewPost-form-postTitle__area">
                        <option value="">Select a post author</option>
                        {usersOptions}
                    </MySelect>

                    <MyTextInput
                        className="addNewPost-form-postContent__area"
                        label="Post Content"
                        name="postContent"
                        type="textarea"
                        placeholder="Content"
                        id="postContent"
                    />

                    <button
                        type="submit"
                        className="button"
                        //disabled={!canSave}
                    >
                        Submit
                    </button>

                </Form>
            </Formik>
        </section>
    );
};


