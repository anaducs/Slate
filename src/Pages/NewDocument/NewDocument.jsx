import React, { useCallback, useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import "./NewDocument.css";

const toolbarOptions = [
  [{ size: ["small", "medium", "large", "huge"] }],
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ align: [] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ script: "sub" }, { script: "super" }],
  ["link", "image", "video"],
  ["blockquote", "code-block"],
  [{ direction: "rtl" }],
  [{ color: [] }, { background: [] }],
  ["clean"],
];

function NewDocument() {
  const [error,setError] = useState("");
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const { id: documentId, uid: userId } = useParams();
  const navigate = useNavigate();

  const wrapperRef = useCallback((wrap) => {
    if (wrap == null) return;
    wrap.innerHTML = "";
    const editore = document.createElement("div");
    wrap.append(editore);

    const q = new Quill(editore, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
    q.disable();
    q.setText("Loading ...");
    setQuill(q);
  }, []);
  //connect to server
  useEffect(() => {
    const sock = io("http://localhost:3001", {
      withCredentials: true,  
    });
    
    setSocket(sock);

    return () => {
      sock.disconnect();
    };
  }, []);

  //global error function



  //errorHandling
  useEffect(()=>{
      const errorHandler = (error)=>{
      setError(error)
      navigate('/dashboard');


    socket.on('error',errorHandler);

    return()=>{
      socket.off('error',errorHandler);
      setError("");
    }
    }

  },[socket])


  //text change detect
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  //update text

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("received-message", handler);

    return () => {
      socket.off("received-message", handler);
    };
  }, [socket, quill]);

  //separating room based on id and loading data

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", userId, documentId);
  }, [socket, quill, documentId]);

  //save document
  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return <div className="container" ref={wrapperRef}></div>;
}

export default NewDocument;


