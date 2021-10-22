import { Table, Button } from 'reactstrap'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

const DataTable = ({ todos, loading, viewTodo, editTodo, deleteTodo } ) => {
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <Table striped>
            <thead>
                <tr>
                    <td>Todo ID</td>
                    <td>User ID</td>
                    <td>Title</td>
                    <td>Completed</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {todos && todos.map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.userId}</td>
                        <td>{todo.title}</td>
                        <td>{todo.completed.toString()}</td>
                        <td>
                        <Button color="info" onClick={() => viewTodo(todo.id)}>View</Button> 
                        <EditModal buttonTitle="Edit" editTodo={editTodo} todoId={todo.id}/>
                        <DeleteModal buttonTitle="Delete" deleteTodo={deleteTodo} todoId={todo.id}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default DataTable