import React, { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import "./NewDocument.css";

const toolbarOptions = [
  ["home", "textfield"],
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
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const { id: documentId, uid: userId } = useParams();
  const navigate = useNavigate();

  // Creating the editor
  const wrapperRef = useCallback((wrap) => {
    if (wrap == null) return;
    wrap.innerHTML = "";
    const editor = document.createElement("div");
    wrap.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });

    // Add custom toolbar buttons after initialization
    const toolbar = q.getModule("toolbar");

    // Add Home button first
    const homeButton = document.createElement("button");
    homeButton.className = "ql-home";
    homeButton.innerHTML = `<svg viewBox="0 0 18 18">
  <path d="M9 3L1 9h2v6h4V11h4v4h4V9h2z"></path>
</svg>`;
    toolbar.container.insertBefore(homeButton, toolbar.container.firstChild);

    // Add Textfield input second
    const textfieldButton = document.createElement("input");
    textfieldButton.type = "text"; // Specify as a text input
    textfieldButton.className = "ql-textfield";
    textfieldButton.placeholder = "Untitled"; // Optional placeholder
    toolbar.container.insertBefore(textfieldButton, homeButton.nextSibling);

    // Define handlers
    homeButton.addEventListener("click", () => {
      navigate("/dashboard");
    });

    toolbar.addHandler("textfield", () => {
      
      if (input) {
        const range = q.getSelection();
        if (range) {
          q.insertText(range.index, input);
        }
      }
    });

    q.disable();
    q.setText("Loading ...");
    setQuill(q);
  }, []);

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
