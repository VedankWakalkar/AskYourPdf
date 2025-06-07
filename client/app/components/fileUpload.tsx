"use client";
import * as React from "react";
import { Upload } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import PDFLimitReached from "./pdfLimitReached";
import Folder from "@/Folder/Folder";

const FileUploadComponent: React.FC = () => {
  const { user } = useUser();
  const [limit, setLimit] = React.useState(1);

  React.useEffect(() => {
    const fetchPDFCount = async () => {
      if (!user) return;
      try {
        const res = await fetch("http://localhost:8080/pdf/limit", {
          method: "GET",
          headers: {
            "X-User-ID": user?.id || "",
          },
        });
        const data = await res.json();
        setLimit(data.count);
      } catch (error) {
        console.log("Some Error Occurred: ", error);
      }
    };
    fetchPDFCount();
  }, [user]);

  const [uploadedFile, setUploadedFile] = React.useState<string | null>(null);
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
            headers: {
              "X-User-ID": user?.id || "",
            },
          });
          console.log("File uploaded");
          console.log("userID: ", user?.id);
          setUploadedFile(file.name);
          setLimit((prev) => prev + 1);
        }
      }
    });
    el.click();
  };

  return (
    <>
      <div className="flex flex-col">
        {limit > 5 ? (
          <>
            <PDFLimitReached />
          </>
        ) : (
          <>
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
                <Folder color="#00d8ff" />
                <h3>Click to Browse Files</h3>
              </div>
            </div>
            {uploadedFile && (
              <div className="flex justify-center items-center flex-col">
                <div className="mt-6 text-center text-slate-400 font-medium">
                  Uploaded: {uploadedFile}
                </div>
                <div className="pt-2 text-slate-400 font-medium">
                  PDF TOKEN = {limit}/5
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FileUploadComponent;
