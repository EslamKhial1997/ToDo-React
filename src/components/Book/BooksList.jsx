import { Alert, Box, LinearProgress } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteBooks, toggle } from "../../AthunkSore/AthunkStore";
import { db } from "../../Database/Firebase";
const data = collection(db, "books");
const BooksList = () => {
  const [FireData, setFireData] = useState([]);
  const { ReportReducer, Store } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();
const dispatched = (e)=>{
  dispatch(deleteBooks(e.id))
  dispatch(toggle(!Store.toggle))
}
  useEffect(() => {
    const awits = async () => {
      const thedata = await getDocs(data);

      setFireData(thedata.docs.map((e) => ({ ...e.data(), id: e.id })));
    };
    awits();
  }, [Store.toggle]);
 
  const FirebaseData = FireData.length < 1 ? (<h5>No Data here Please Insert Data</h5>):(
    FireData.map((e) => {
      return (
        <ul className=" col-lg-10 col-sm-12 col-md-12 mx-auto" key={e.id}>
          <li className="border rounded border-info d-flex justify-content-center justify-lg-content-between justify-content-md-between jusyify-content-sm-between align-items-center row">
            <div className="p-1 col-lg-8 col-md-6 col-sm-12 text-center">
              {e.title}
            </div>
            <div
              className="btn-group p-lg-0 p-sm-0 p-md-0 p-0 col-lg-4 col-md-5 col-sm-12 justify-content-around"
              role="group"
            >
              <NavLink
                to={`book/${e.id}/bookinfo`}
                type="button"
                className="btn btn-primary col-4"
              >
                Read
              </NavLink>
              <NavLink
                to={`book/${e.id}/bookedit`}
                type="button"
                className="btn btn-info col-4"
              >
                Edit
              </NavLink>
              <button
                type="button"
                className="btn btn-danger col-4"
                onClick={() => {
                  dispatched(e)
                }}
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      )
    })
  )
  
  
 

  return (
    <div className="container text-center">
      {Object.values(ReportReducer.Del) < 1 ? (
        ""
      ) : (
        <Alert className="col-sm-12 col-md-6 col-lg-6 justify-content-center m-auto fixed-top" severity="error">
          {ReportReducer.Del.Delete}
        </Alert>
      )}
      <h2 className="text-center">Menu..</h2>
      {Store.isLoading ? (
        <Box sx={{ width: "50%", margin: "auto" }}>
          <LinearProgress />
        </Box>
      ) : (
        FirebaseData
      )}
    </div>
  );
};

export default BooksList;
