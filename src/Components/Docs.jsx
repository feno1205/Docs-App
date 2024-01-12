import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState,useEffect,useRef } from 'react';
import {addDoc,collection,onSnapshot} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:150,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
};

function Docs({database}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title,setTitle] =useState('')
    const [docsData, setDocsData] =useState([])

    const collectionRef = collection(database, 'docsData')

    const isMounted = useRef();

    let navigate = useNavigate();

    const getID=(id)=>{
        navigate(`/editDocs/${id}`);
    }

    const addData=()=>{
        addDoc(collectionRef,{
            title: title
        })
        .then(()=>{
            alert('Data Added')
            handleClose()
        })
        .catch(()=>{
            alert('Cannot add data')
        })
    }
    const getData=()=>{
        onSnapshot(collectionRef, (data)=>{
            setDocsData(data.docs.map((doc)=>{
                return {...doc.data(),id:doc.id}
            }));
        })
    }

    useEffect(()=>{
        if(isMounted.current){
            return
        }
        isMounted.current = true
        getData()
    },[])

    return (
        <div className='docs-main'>
            <h1>Docs App</h1>
            <button className='add-docs' onClick={handleOpen}>Add a Document</button>
            <Modal
                open={open}
                onClose={handleClose}
                title={title}
                setTitle={setTitle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <input type="text" placeholder='Add Title' className='add-input' onChange={(e)=>setTitle(e.target.value)}/>
                    <div className='button-container'>
                        <button onClick={addData} className='add-docs'>Add</button>
                    </div>
                </Box>
            </Modal>
            <div className='grid-main'>
                {docsData.map((doc)=>{
                    return(
                        <div className='grid-child' onClick={()=>getID(doc.id)}>
                            <p>{doc.title}</p>
                            <div dangerouslySetInnerHTML={{__html:doc.docsDesc}}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Docs