import {createBrowserRouter, createRoutesFromElements, Route, useOutletContext, redirect} from 'react-router-dom';
import Home from "./Home";
import App from './App';
import Companies from './Companies';
import Jobs from './Jobs';
import Form from './Form';
import CompanyDetail from './CompanyDetail';
import Profile from './Profile';
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute';
import JoblyApi from './api';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<App />} >
                <Route path='/' element={<Home />}/>
                <Route 
                    path='/companies' 
                    element={
                    <ProtectedRoute>
                        <Companies />
                    </ProtectedRoute>}
                />
                <Route 
                    path='/companies/:id' 
                    element={
                    <ProtectedRoute>
                        <CompanyDetail />
                    </ProtectedRoute>
                    }
                    loader={async ({params}) => {
                        const company = await JoblyApi.getCompany(params.id);
                        return company;
                    }}
                />
                <Route 
                    path='/jobs' 
                    element={
                    <ProtectedRoute>
                        <Jobs />
                    </ProtectedRoute>}
                />
                <Route path='/signup' element={<Form type='signup' />} />
                <Route path='/login' element={<Form type='login' />} />
                <Route path='/profile' element={<Profile />}/>
                <Route path='/logout' element={<Logout />}/>
            </Route>
        </>
    )
  );
  

export default router;