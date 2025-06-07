import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

const PDFLimitReached = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-full min-h-screen flex-col">
        <div className="pb-5 flex justify-center items-center text-xl font-semibold">
          <TriangleAlert size={24} />
          <span className="pl-3">ALERT</span>
        </div>
        <div className="flex justify-center items-center flex-col">
          <span className="font-medium text-lg">
            You have Reached the Limit{" "}
          </span>
          <span className="text-slate-500 text-md pt-2">
            You have used all the modifications allowed
          </span>
          <span className="text-slate-500 text-md">in your current plan.</span>
        </div>
        <div className="pt-10">
          <Link href={"/"}>
            <Button className="bg-muted/40 text-white">Home page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PDFLimitReached;
