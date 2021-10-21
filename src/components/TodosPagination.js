import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

const TodosPagination = ({ todosPerPage, totalTodos, paginate }) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <Pagination className="d-flex justify-content-center">
            {pageNumbers.map((number) => (
                <PaginationItem key={number}>
                    <PaginationLink onClick={() => paginate(number)}>{number}</PaginationLink>
                </PaginationItem>
            ))}
        </Pagination>
    )
}

export default TodosPagination