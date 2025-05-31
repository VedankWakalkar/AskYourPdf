import FileUploadComponent from "./components/fileUpload";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen w-screen flex">
        <div className="min-h-screen w-[30vw] items-center justify-center flex">
          <FileUploadComponent />
        </div>
        <div className="min-h-screen border-l w-[70vw]">chatbot part</div>
      </div>
    </div>
  );
}
