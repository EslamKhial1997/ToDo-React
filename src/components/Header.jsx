import { Alert } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink} from "react-router-dom";
const Header = () => {
  const {  ReportReducer } = useSelector((state) => {
    return state;
  });
  return (
<nav className=' navbar-dark bg-dark justify-content-between'>
{Object.values(ReportReducer.UserName) < 1 ? (
  ""
) : (
  <Alert className="col-sm-12 col-md-6 col-lg-6 justify-content-center m-auto fixed-top" severity="success">
  <span className='fs-5 text-info'>Welcome:</span> {ReportReducer.UserName.UserName}
  </Alert>
)}
<ul className='d-flex justify-content-between p-2'>
<li><NavLink to="/home" className='btn btn-outline-primary' end>MyBooks</NavLink></li>
<li><NavLink to="book/addbooks" href='/' className='btn btn-outline-primary'>Add Books</NavLink></li>
<li><NavLink to="/login" href='/' className='btn btn-outline-primary'>LogOut</NavLink></li>
</ul>
    
    </nav>
  
  );
};

export default Header;
