import '../styles.css'
import { Link } from 'react-router-dom'


const TodoPage = (props) => {

    const title = props.location.propsSearch.title

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <Link to='/'><i className="fas fa-chevron-left nav-backarrow"></i></Link>
            <div className="card" style={{width: 18 + 'rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{title}<hr/></h5>
                    <p className="card-text">lorem ipsum text</p>
                </div>
            </div>
        </div>
    )
}

export default TodoPage