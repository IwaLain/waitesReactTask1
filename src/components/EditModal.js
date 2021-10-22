import { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import validator from 'validator'
import '../styles.css'

const EditModal = ({ buttonTitle, editTodo, todoId }) => {
    const [modal, setModal] = useState(false)
    const [textToAdd, setTextToAdd] = useState('')
    const [textError, setTextError] = useState('Обязательное поле.')
    const [textDirty, setTextDirty] = useState(false)
    const [formValid, setFormValid] = useState(true)

    useEffect(()=> {
        if (textError) {
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    },[textError])

    const toggle = () => setModal(!modal)

    const blurHandler = (e) => {
        switch (e.target.id) {
            case 'todoEdit-text':
                setTextDirty(true)
                break
        }
    }

    const textValidation = (e) => {
        setTextToAdd(e.target.value)

        const found = e.target.value.match(/[0-9]/g)

        if (found) {
            setTextError('Поле не может содержать цифры.')
        }
        else if (!validator.isLength(e.target.value, { min: 3 })) {
            setTextError('Поле должно содержать не менее 3 символов.')
        }
        else {
            setTextError('')
        }
    }

    return (
        <div>
            <Button color="secondary" onClick={() => toggle()}>{buttonTitle}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Todo</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="todoEdit-text">Text to add</Label>
                            {(textError && textDirty) && (
                                <div className="validation-error">{textError}</div>
                            )}
                            <Input id="todoEdit-text" placeholder="Write a text to add" onBlur={blurHandler} onChange={(e) => textValidation(e)}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { editTodo(todoId, textToAdd); toggle() }} disabled={!formValid}>Save</Button>
                    <Button color="secondary" onClick={() => toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditModal