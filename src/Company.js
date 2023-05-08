import { Link } from 'react-router-dom';
import './Company.css'

const Company = ({id, name, description}) => {
    return (
        <div className='company'>
            <Link to={`/companies/${id}`}>
                <h3>{name}</h3>
            </Link>
            <p>{description}</p>
        </div>
    )
}

export default Company;