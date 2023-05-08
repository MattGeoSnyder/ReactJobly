import { useState, useEffect } from 'react';
import JoblyApi from './api';
import Job from './Job'
import './Jobs.css'

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getJobs = async () => {
            let jobsRes = await JoblyApi.getJobs();
            setJobs(() => jobsRes);
        }
        getJobs();
    }, [])

    return (
        <>
        <h1 style={{color: 'white', textAlign: 'center'}}>Jobs for you!</h1>
        <div id='jobs'>
            {jobs.map((job => (
                <Job key={job.id} job={job} apply={true}/>
                )))}
        </div>
        </>
    )

}

export default Jobs;