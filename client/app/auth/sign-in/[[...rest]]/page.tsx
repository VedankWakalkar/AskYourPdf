"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      <SignIn></SignIn>
    </div>
  );
};

export default page;
