import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from './components/DataTable'
import axios from 'axios'
import TodosPagination from './components/TodosPagination';
import { FormGroup, Label, Input } from 'reactstrap';

const App = () => {
    const [ todos, setTodos ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ todosPerPage, setTodosPerPage ] = useState(10)
    const [ sortType, setSortType ] = useState('By Todo ID')

    useEffect(() => {
        const getTodos = async () => {
            setLoading(true)

            const res = await axios('https://jsonplaceholder.typicode.com/todos')
            setTodos(res.data)

            setLoading(false)
        }

        getTodos()
    }, [])

    useEffect(() => {
        const sortArray = (type) => {
            const types = {
                "By Todo ID": "id",
                "By User ID": "userId",
                "By Title": "title",
                "By Completed": "completed"
            }

            const sortProp = types[type]

            let sorted = []

            if (sortProp === 'id' || sortProp === 'userId')
            sorted = [...todos].sort((a ,b) => {
                return a[sortProp] - b[sortProp]
            })
            else if (sortProp === 'title') {
                sorted = [...todos].sort((a ,b) => {
                    let fa = a[sortProp].toLowerCase(),
                    fb = b[sortProp].toLowerCase();
            
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                })
            }
            else if (sortProp === 'completed') {
                sorted = [...todos].sort((a ,b) => {
                    let fa = a[sortProp].toString().toLowerCase(),
                    fb = b[sortProp].toString().toLowerCase();
            
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                })
            }
            setTodos(sorted)
        }

        sortArray(sortType)
    }, [sortType])

    const lastTodoIndex = currentPage * todosPerPage
    const firstTodoIndex = lastTodoIndex - todosPerPage
    const currentTodos = todos.slice(firstTodoIndex, lastTodoIndex)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const viewTodo = (todoId) => {
        
    }

    const editTodo = (todoId, text) => {
        setTodos(todos.map((el) => el.id === todoId ? {...el, title: el.title + text} : el))
    }

    const deleteTodo = (todoId, userName, comment) => {
        setTodos(todos.map((el) => el.id === todoId ? {...el, title: el.title + ` DELETED BY ${userName}`} : el))
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <FormGroup style={{marginRight: 20 + 'px'}}>
                    <Label for="todosPerPageSelect">Records per page</Label>
                    <Input type="select" id="todosPerPageSelect" onChange={(e) => setTodosPerPage(e.target.value)}>
                        <option>5</option>
                        <option defaultValue>10</option>
                        <option>20</option>
                        <option>50</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="todosPerPageSelect">Sort by</Label>
                    <Input 
                    type="select" 
                    id="todosPerPageSelect" 
                    onChange={ (e) => setSortType(e.target.value) }>
                        <option defaultValue>By Todo ID</option>
                        <option>By User ID</option>
                        <option>By Title</option>
                        <option>By Completed</option>
                    </Input>
                </FormGroup>
            </div>
            <DataTable todos={currentTodos} loading={loading} viewTodo={viewTodo} editTodo={editTodo} deleteTodo={deleteTodo}/>
            <TodosPagination 
            todosPerPage={todosPerPage} 
            totalTodos={todos.length}
            paginate={paginate}
            />
        </>
    )
}

export default App