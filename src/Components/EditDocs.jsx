import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { collection, updateDoc,doc ,onSnapshot, limitToLast } from 'firebase/firestore';
import { database } from './firebaseConfig';

export default function EditDocs(){

    const [docsDesc,setDocsDesc] = useState('')
    const [documentTitle, setDocumentTitle] = useState('')

    let params = useParams();

    const isMounted = useRef()

    const collectionRef = collection(database, 'docsData')

    const getQuillData=(value)=>{
        setDocsDesc(value)
    }

    useEffect(()=>{
        const updateDocsData=setTimeout(()=>{
            const document = doc(collectionRef,params.id)
            onSnapshot(document, (docs)=>{
                console.log(docs.data().docsDesc);
            })
            updateDoc(document,{
                docsDesc:docsDesc
            })
            .then(() =>{
                alert('Saved')
            })
            .catch(()=>{
                alert('Cannot Save')
            })
        },1000)
        return () => clearTimeout(updateDocsData)
    },[docsDesc])

    return(
        <div>
            <h1>EditDocs</h1>
            <ReactQuill value={docsDesc} onChange={getQuillData} />
        </div>
        
    )
}