import React, { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import "./NewDocument.css";
import axios from "axios";

const toolbarOptions = [
  [{ size: ["small", "medium", "large", "huge"] }],
  [{ header: ["1", "2"] }, { font: [] }],
  [{ align: [] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ script: "sub" }, { script: "super" }],
  ["link", "image"],
  ["blockquote", "code-block"],
  [{ direction: "rtl" }],
  [{ color: [] }, { background: [] }],
  ["clean"],
];

function NewDocument() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const { id: documentId, uid: userId } = useParams();
  const navigate = useNavigate();

  // Creating the editor
  const wrapperRef = useCallback(
    (wrap) => {
      if (wrap == null) return;
      wrap.innerHTML = "";
      const editor = document.createElement("div");
      wrap.append(editor);

      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
      });

      const toolbar = q.getModule("toolbar");

      // Add Home button
      const homeButton = document.createElement("button");
      homeButton.className = "ql-home";
      homeButton.innerHTML = `<img src="/assets/letter-s.png" alt="Slate" />`;
      homeButton.querySelector("img").style.minWidth = "20px";
      homeButton.querySelector("img").style.width = "25px";
      homeButton.querySelector("img").style.height = "20px";
      homeButton.querySelector("img").style.maxWidth = "30px";
      toolbar.container.insertBefore(homeButton, toolbar.container.firstChild);

      // Add Textfield input
      const textfieldButton = document.createElement("input");
      textfieldButton.type = "text";
      textfieldButton.id = "unni";
      textfieldButton.value = title;
      textfieldButton.placeholder = "Untitled";
      toolbar.container.insertBefore(textfieldButton, homeButton.nextSibling);

      // Define handlers
      homeButton.addEventListener("click", () => {
        navigate("/dashboard");
      });

      textfieldButton.addEventListener("change", async (e) => {
        localStorage.setItem(documentId.toString(), e.target.value);
      });

      q.disable();
      q.setText("Loading ...");
      setQuill(q);
    },
    [title]
  );

  // Connect to server
  useEffect(() => {
    const sock = io("http://localhost:3001", {
      withCredentials: true,
    });

    setSocket(sock);

    return () => {
      sock.disconnect();
    };
  }, []);
  //renaming document
  useEffect(() => {
    const dname = localStorage.getItem(documentId.toString());
    setTitle(dname);
    try {
      const postName = async () => {
        await axios.post(
          `http://localhost:3001/api/document/${documentId}`,
          { dname },
          { withCredentials: true }
        );
      };
      postName();
    } catch (e) {
      console.log(e);
    }
  }, [title]);
  // Error handling
  useEffect(() => {
    if (!socket) return;

    const errorHandler = (error) => {
      setError(error);
      navigate("/dashboard");
    };

    socket.on("error", errorHandler);

    return () => {
      socket.off("error", errorHandler);
      setError("");
    };
  }, [socket, navigate]);

  // Text change detection
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

  // Update text
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

  // Load document
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", userId, documentId);
  }, [socket, quill, documentId, userId]);

  // Save document periodically
  useEffect(() => {
    if (!socket || !quill) return;

    if (quill.getContents() == "") return;

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
