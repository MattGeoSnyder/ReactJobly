import { useLoaderData } from "react-router-dom";
import Job from "./Job";
import './Jobs.css'
import './CompanyDetail.css'

const CompanyDetail = () => {
    const company = useLoaderData();

    return (
        <>
        <div id="company">
            <img src={company.logoUrl} />
            <h2>{company.name}</h2>
            <p>Number of Employees: {company.numEmployees}</p>
            <p>{company.description}</p>
        </div>
        <div id="jobs">
            {company.jobs.map((job) => (
                <Job key={job.id} job={job} apply={true} />
            ))}
        </div>
        </>
    )
}

export default CompanyDetail;