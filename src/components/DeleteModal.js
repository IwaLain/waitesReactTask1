import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

const DeleteModal = ({ buttonTitle, deleteTodo, todoId }) => {
    const [modal, setModal] = useState(false)
    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('')

    const toggle = () => setModal(!modal)

    return (
        <div>
            <Button color="danger" onClick={() => toggle()}>{buttonTitle}</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete Todo</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="todoDelete-username">Name</Label>
                            <Input id="todoDelete-username" placeholder="Write your name" onChange={(e) => setUsername(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="todoDelete-comment">Comment</Label>
                            <Input id="todoDelete-comment" placeholder="Write a delete comment" onChange={(e) => setComment(e.target.value)}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { deleteTodo(todoId, username, comment); toggle() }}>Delete</Button>
                    <Button color="secondary" onClick={() => toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default DeleteModal