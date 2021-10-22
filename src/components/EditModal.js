import { useState, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import validator from 'validator'
import '../styles.css'

const EditModal = ({ buttonTitle, editTodo, todoId }) => {
    const [modal, setModal] = useState(false)
    const [textToAdd, setTextToAdd] = useState('')
    const [textError, setTextError] = useState('')

    const toggle = () => setModal(!modal)

    const validation = (value) => {
        if (!validator.isAlpha(value)) {
            setTextError('Поле не должно содержать цифр.')
        }
        else if (!validator.isLength(value, { min: 3 })) {
            setTextError('Поле должно состоять не менее чем из 3 символов.')
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
                            <Label for="new-title">Text to add</Label>
                            {textError && (
                                <div className="validation-error">{textError}</div>
                            )}
                            <Input id="new-title" placeholder="Write a text to add" onChange={(e) => { setTextToAdd(e.target.value); validation(e.target.value) }}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { editTodo(todoId, textToAdd); toggle() }}>Save</Button>
                    <Button color="secondary" onClick={() => toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditModal