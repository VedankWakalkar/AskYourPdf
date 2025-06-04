"use client";
import * as React from "react";
import { Upload } from "lucide-react";

const FileUploadComponent: React.FC = () => {
  const handleFileUploadButtonClick = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "application/pdf");
    el.addEventListener("change", async (ev) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          const formData = new FormData();
          formData.append("pdf", file);

          await fetch("http://localhost:8080/upload/pdf", {
            method: "POST",
            body: formData,
          });
          console.log("File uploaded");
        }
      }
    });
    el.click();
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center items-center flex-col mb-10">
          <span className="text-2xl font-bold">PDF Document</span>
          <span className="text-lg font-light">
            Upload a PDF to start chatting with it
          </span>
        </div>
        <div className="bg-muted/20 text-gray shadow-2xl flex justify-center items-center font-semibold p-4 rounded-lg border-white border-2 mt-10 h-40">
          <div
            onClick={handleFileUploadButtonClick}
            className="flex justify-center items-center flex-col"
          >
            <Upload />
            <h3>Click to Browse Files</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadComponent;
