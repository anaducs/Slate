import React , { useState } from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import "./NewDocument.css";


function NewDocument() {
const[value,setValue]=useState("");
var toolbarOptions = [
    [{ 'size': ['small', 'medium', 'large', 'huge'] }], 
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],  
    [{ 'align': [] }], 
    ['bold', 'italic', 'underline', 'strike'], 
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],  
    [{ 'indent': '-1'}, { 'indent': '+1' }],  
    ['link', 'image', 'video'],  
    ['blockquote', 'code-block'],  
    [{ 'direction': 'rtl' }],  
    [{ 'color': [] }, { 'background': [] }],  
    ['clean'] 
  ];

  return <ReactQuill theme="snow" value={value} onChange={setValue} modules={{toolbar:toolbarOptions}}/>;
}

export default NewDocument