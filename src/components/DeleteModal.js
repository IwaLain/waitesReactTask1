import { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import validator from 'validator'
import '../styles.css'

const DeleteModal = ({ buttonTitle, deleteTodo, todoId }) => {
    const [modal, setModal] = useState(false)
    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [commentDirty, setCommentDirty] = useState(false)
    const [nameError, setNameError] = useState('Обязательное поле.')
    const [commentError, setCommentError] = useState('Обязательное поле.')
    const [formValid, setFormValid] = useState(true)

    useEffect(()=> {
        if (nameError || commentError) {
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    },[nameError, commentError])

    const toggle = () => setModal(!modal)

    const blurHandler = (e) => {
        switch (e.target.id) {
            case 'todoDelete-username':
                setNameDirty(true)
                break
            case 'todoDelete-comment':
                setCommentDirty(true)
                break
        }
    }

    const nameValidation = (e) => {
        setUsername(e.target.value)

        const found = e.target.value.match(/[0-9]/g)

        if (found) {
            setNameError('Поле не может содержать цифры.')
        }
        else if (!validator.isLength(e.target.value, { min: 3 })) {
            setNameError('Поле должно содержать не менее 3 символов.')
        }
        else {
            setNameError('')
        }
    }

    const commentValidation = (e) => {
        setComment(e.target.value)

        const found = e.target.value.match(/[0-9]/g)

        if (found) {
            setCommentError('Поле не может содержать цифры.')
        }
        else if (!validator.isLength(e.target.value, { min: 3 })) {
            setCommentError('Поле должно содержать не менее 3 символов.')
        }
        else {
            setCommentError('')
        }
    }

    return (
        <div>
            <Button color="danger" onClick={() => toggle()}>{buttonTitle}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete Todo</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="todoDelete-username">Name</Label>
                            {(nameError && nameDirty) && (
                                <div className="validation-error">{nameError}</div>
                            )}
                            <Input id="todoDelete-username" placeholder="Write your name" onBlur={(e) => blurHandler(e)} onChange={(e) => nameValidation(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="todoDelete-comment">Comment</Label>
                            {(commentError && commentDirty) && (
                                <div className="validation-error">{commentError}</div>
                            )}
                            <Input id="todoDelete-comment" placeholder="Write a delete comment" onBlur={(e) => blurHandler(e)} onChange={(e) => commentValidation(e)}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { deleteTodo(todoId, username, comment); toggle() }} disabled={!formValid}>Delete</Button>
                    <Button color="secondary" onClick={() => toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default DeleteModal