import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

const EditModal = ({ buttonTitle, editTodo, todoId }) => {
    const [modal, setModal] = useState(false)
    const [textToAdd, setTextToAdd] = useState('')

    const toggle = () => setModal(!modal)

    return (
        <div>
            <Button color="secondary" onClick={() => toggle()}>{buttonTitle}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Todo</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="new-title">Text to add</Label>
                            <Input id="new-title" placeholder="Write a text to add" onChange={(e) => setTextToAdd(e.target.value)}/>
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