import { useEffect, useState, useContext } from "react";
import { UserContext } from './App';
import JoblyApi from "./api";
import './Jobs.css'
import Job from "./Job";
import './UserForm.css'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


const Profile = () => {
    const { currUser, setCurrUser } = useContext(UserContext);
    const [formData, setFormData] = useState(currUser);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        setFormData(formdata => currUser);
    },[])

    useEffect(() => {
        const requestJob = async (jobId) => {
            let job = await JoblyApi.getJob(jobId);
            setJobs(applied => [...applied, job]);
        }

        for (let jobId of currUser.applications) {
            requestJob(jobId);
        }
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}));
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        const requestUpdate = async () => {
            const userUpdate = await JoblyApi.updateUser(formData);
            setCurrUser(currUser => ({...currUser, ...userUpdate}));
        }
        requestUpdate();
    }

    return (
        <>
        
        <form className="user-form" onSubmit={handleSumbit}>
            <input 
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled
                />
            <input 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                />
            <input 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                />
            <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                />
            <button>Update</button>
        </form>
        <h1 style={{color: 'white', textAlign: 'center'}}>Your Applications</h1>
        <div id="jobs">
            {jobs.map(job => (
                <Job key={job.id} job={job} apply={false}/>
            ))}
        </div>
        </>
    )
}

export default Profile;
