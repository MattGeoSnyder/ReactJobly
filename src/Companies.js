import { useState, useEffect } from 'react';
import JoblyApi from './api';
import Company from './Company';
import './Companies.css'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({name: ''});

    useEffect(() => {
        const getCompanies = async () => {
            let res = await JoblyApi.request('companies', formData)
            setCompanies(res.companies);
        }
        getCompanies();
    },[formData])

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        setFormData({ name });
    }

    return (
        <>
            <div id='search'>
                <form onSubmit={handleSubmit}>
                    <input
                        id='name'
                        name='name'
                        placeholder='Search'
                    />
                    <button>Search</button>
                </form>
            </div>
            <h1 style={{color: 'white', textAlign: 'center'}}>Check out these awesome companies!</h1>
            <div id='companies'>
                {companies.map(company => (
                    <Company key={company.handle} id={company.handle} name={company.name} description={company.description}/>
                ))}
            </div>
        </>
    )
}

export default Companies;