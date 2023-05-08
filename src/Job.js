import { useContext } from 'react';
import { UserContext } from './App';
import JoblyApi from './api';
import { useState, useEffect, useRef } from 'react';
import './Job.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


const Job = ({ job, apply }) => {
    const { currUser, setCurrUser } = useContext(UserContext);
    const {title, salary, equity} = job;
    const [applied, setApplied] = useState(false);
    const applyBtn = useRef();

    useEffect(() => {
        if (currUser.applications.includes(job.id) && apply) {
            setApplied(true);
        } else {
            setApplied(false);
        }
    }, [currUser])

    useEffect(() => {
        if (applied) {
            applyBtn.current.disabled = true;
        }
    }, [applied])

    const handleClick = () => {
        if (!applied) {
            const requestApplication = async () => {
                await JoblyApi.apply(currUser.username, job.id);
            }
            requestApplication();
            setCurrUser(user => ({...user, applications: [...user.applications, job.id]}));
        } 
    }

    return (
        <div className='job'>
            <div className='content-wrapper'>
                <h3>{title}</h3>
                <p>Salary: {salary} {equity ? `Equity: ${equity}` : ""} </p>
            </div>
            {apply && <button onClick={handleClick} ref={applyBtn}>{applied ? 'Applied' : 'Apply'}</button>}
        </div>
    )
}

export default Job;