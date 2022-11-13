
import { Alert, Box, LinearProgress } from "@mui/material";
import { collection, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useParams } from "react-router-dom";
import { deleteBooks, toggle } from "../../AthunkSore/AthunkStore";
import { ReportEdit } from "../../AthunkSore/Report";

import { db } from "../../Database/Firebase";

const FirestoreColl = collection(db, "books");

const BookEdit = () => {
  const prams = useParams()
  const Initialize = {
    title:"" ,
    Subtitle:"",
    description:"",
  }
  const   [EditDatas ,setEditData] = useState(Initialize)
  const {  ReportReducer ,Store} = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch()
  const title = useRef(null);
  const Subtitle = useRef(null);
  const description = useRef(null);
  const Edits = async(data)=>{
    try {
      const EditUser = doc(FirestoreColl ,prams.id);
      await updateDoc(EditUser , data);
  
      dispatch(ReportEdit({ Edit: "Edit Is Succss" }));
      setTimeout(() => {
        dispatch(ReportEdit({}));
      }, 5000);
    }
     catch (error) {
      dispatch(ReportEdit({ Edit: "Edit Is Faild" }));
    }
  }
  
  const GetData = useCallback(async()=>{
    const docRef = doc(db, "books", prams.id);
      try {
        const docSnap = await getDoc(docRef);
        setEditData(docSnap.data())
        
    } catch(error) {
        console.log(error)
    }

  
  },[])
 

  const handlerSubmit = async(e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      price: Subtitle.current.value,
      description: description.current.value,
    };
    Edits(data)
    dispatch(toggle(true))
    title.current.value = "";
    Subtitle.current.value = "";
    description.current.value = "";
  };
   useEffect(()=>{
    
  GetData()
  
 },[Store.toggle , GetData])
  return (
    <div className="row justify-content-center">
    
      <div className="col-lg-6 col-sm-12 mt-3">
        <h2>Insert Book</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              ref={title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              ref={Subtitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              className="form-control"
              id="Description"
              rows="3"
              required
              ref={description}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlerSubmit}
          >
            Edit
          </button>
        </form>
      </div>
      <div className="container text-center">
      {
        Object.values(ReportReducer.Edit) < 1 ? ("") :(
          <Alert className="col-sm-12 col-md-6 col-lg-6 justify-content-center m-auto fixed-top" severity="success">
        
          {ReportReducer.Edit.Edit}
        </Alert>
      
        )
      }
      <h2 className="text-center">Menu..</h2>
      {Store.isLoading ? (
        <Box sx={{ width: "50%", margin: "auto" }}>
          <LinearProgress />
        </Box>
      ) : (
        <ul className="list-group m-3" key={EditDatas.id}>
        <li className="border border-info d-flex justify-content-center justify-lg-content-between justify-content-md-between jusyify-content-sm-between align-items-center row">
          <div className="p-1 col-lg-8 col-md-6 col-sm-12 text-center">
            {EditDatas.title}
          </div>
          <div
            className="btn-group p-lg-0 p-md-0 col-lg-3 col-md-5 col-sm-12 justify-content-around"
            role="group"
          >
            <NavLink
              to={`/home/book/${prams.id}/bookinfo`}
              type="button"
              className="btn btn-primary col-4"
            >
              Read
            </NavLink>
            <NavLink
              to={`book/${EditDatas.id}/bookedit`}
              type="button"
              className="btn btn-info col-4 disabled text-decoration-line-through"
              
            >
              Edit
            </NavLink>
            <button
              type="button"
              className="btn btn-danger col-4 disabled text-decoration-line-through"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
      )}
     
    </div>
    </div>
  );
};

export default BookEdit;
