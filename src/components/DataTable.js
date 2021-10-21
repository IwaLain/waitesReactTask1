import { Table } from 'reactstrap'

const DataTable = ({ todos, loading }) => {
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
                </tr>
            </thead>
            <tbody>
                {todos && todos.map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.userId}</td>
                        <td>{todo.title}</td>
                        <td>{todo.completed.toString()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default DataTable