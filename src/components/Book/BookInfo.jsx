import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs  } from "firebase/firestore";
import BooksList from './BooksList';
import { db } from '../../Database/Firebase';
import { Box, Button, Card, CardActions, CardContent, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const BookInfo = () => {
  const prams = useParams()
  const Initialize = {
    title:"" ,
    Subtitle:"",
    description:"",
  }
  const   [EditDatas ,setEditData] = useState(Initialize)
  const GetData = useCallback(async()=>{
    const docRef = doc(db, "books", prams.id);
      try {
        const docSnap = await getDoc(docRef);
        setEditData(docSnap.data())
        
    } catch(error) {
        console.log(error)
    }

  
  },[])
  console.log(EditDatas);
  useEffect(() => {
    GetData()
  }, [])
 


const style = {
  width: '100%',
  maxWidth: 300,
  bgcolor: 'background.paper',
};
return (
  <List  className='m-auto ' sx={style} component="nav" aria-label="mailbox folders">
  <h2 className='text-center m-5'>Book Details</h2>
  <ListItem className='text-right'  button>
    <ListItemText className='fw-bolder text-primary' primary="Title:-" />
    <ListItemText className='text-left' primary={EditDatas.title} />
  </ListItem>
  <Divider />
  <ListItem className='text-right' button divider>
  <ListItemText className='fw-bolder text-primary' primary="SubTitle:-" />
    <ListItemText className='text-left' primary={EditDatas.Subtitle} />
  </ListItem>
  <ListItem className='text-right' button>
  <ListItemText className='fw-bolder text-primary' primary="Description:-" />
    <ListItemText className='text-left' primary={EditDatas.description} />
  </ListItem>
  <Divider light />
</List>
);
  // return (
  //   <Fragment>
  //     <h2>Book Details</h2>
     
  //     <div>
  //     {FirebaseData}
  //     </div> 
  //     <BooksList/>
  //   </Fragment>
  // );
};

export default BookInfo;

