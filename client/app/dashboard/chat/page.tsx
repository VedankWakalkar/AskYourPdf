'use client'
import FileUploadComponent from "@/app/components/fileUpload";
import ChatComponent from "@/app/components/chatComponent";
import { useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/clerk-react";

const page = () => {
  const user = useUser();
  return (
    <div>
      {user.isSignedIn ? (
        <div>
          <div className="min-h-screen w-screen flex">
            <div className="min-h-screen w-[30vw] items-center justify-center flex">
              <FileUploadComponent />
            </div>
            <div className="min-h-screen border-l w-[70vw]">
              <ChatComponent />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center min-h-screen w-screen">
            <SignIn />
          </div>
        </>
      )}
    </div>
  );
};
export default page;
