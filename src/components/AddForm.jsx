import { Alert, Box, LinearProgress } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteBooks, insertBooks, toggle } from "../AthunkSore/AthunkStore";

const Addform = () => {
  const Initialize = { title: "", price: "", description: "" };
  const [Add, setAdd] = useState(Initialize);
  const { ReportReducer, Store } = useSelector((state) => {
    return state;
  });
  const title = useRef(null);
  const Subtitle = useRef(null);
  const description = useRef(null);
  const dispatch = useDispatch();
  const handlerSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      Subtitle: Subtitle.current.value,
      description: description.current.value,
    };
    setAdd(data);
    dispatch(insertBooks(data));
    title.current.value = "";
    Subtitle.current.value = "";
    description.current.value = "";
  };
 
  return (
    <div className="row flex-row justify-content-center">
      {Object.values(ReportReducer.Adds) < 1 ? (
        ""
      ) : (
        <Alert className="col-sm-12 col-md-6 col-lg-6 justify-content-center m-auto fixed-top" severity="success">
          {ReportReducer.Adds.insert}
        </Alert>
      )}

      <div className="col-lg-6 col-sm-12  mt-3">
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
            <label htmlFor="price">Subtitle</label>
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
            Insert
          </button>
        </form>
      </div>
      <div className="container text-center">
        {Object.values(ReportReducer.Edit) < 1 ? (
          ""
        ) : (
          <Alert className="col-8" severity="success">
            {ReportReducer.Edit.Edit}
          </Alert>
        )}
        <h2 className="text-center">Menu..</h2>

        {Add.title === "" ? (
          <Box sx={{ width: "50%", margin: "auto" }}>
            <h6>Please Insert Book !</h6>
          </Box>
        ) : (
          <ul className="col-lg-10 col-sm-12 col-md-12  mx-auto" key={Add.id}>
            <li className="border rounded border-info d-flex justify-content-center justify-lg-content-between justify-content-md-between jusyify-content-sm-between align-items-center row">
              <div className="p-1 col-lg-8 col-md-6 col-sm-12 text-center">
                {Add.title}
              </div>
              <div
                className="btn-group col-lg-4 col-md-5 col-sm-12 justify-content-around px-0 mx-0"
                role="group"
              >
                <NavLink
                  to={`/book/${Add.id}/bookinfo`}
                  type="button"
                  className="btn btn-primary col-4"
                >
                  Read
                </NavLink>
                <NavLink
                 
                  type="button"
                  className="btn btn-info col-4 disabled "
                 
                >
                  Edit
                </NavLink>
                <button
                  type="button"
                  className="btn btn-danger col-4  disabled"
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

export default Addform;
