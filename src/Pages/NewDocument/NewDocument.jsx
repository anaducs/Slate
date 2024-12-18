import React, { useCallback, useState, useEffect } from "react";
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
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);

  const wrapperRef = useCallback((wrap) => {
    if (wrap == null) return;
    wrap.innerHTML = "";
    const editore = document.createElement("div");
    wrap.append(editore);

    const q = new Quill(editore, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
    setQuill(q);
  }, []);
//connect to server
  useEffect(() => {
    const sock = io("http://localhost:5000");
    setSocket(sock);

    return () => {
      sock.disconnect();
    };
  }, []);


  //text change detect

quill.on('text-change',)


  return <div className="container" ref={wrapperRef}></div>;
}

export default NewDocument;
