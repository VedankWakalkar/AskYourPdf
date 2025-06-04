"use client";

import { MessageSquare, Shield, Zap } from "lucide-react";
import React from "react";

const Feature = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-screen">
        <span className="text-4xl font-bold pb-4">How it Works</span>
      </div>
      <div className="flex justify-center items-center flex-col">
        <span className="text-xl font-semibold pt-2">
          Our AI-powered PDF chatbot makes it easy to extract information and
          insights
        </span>
        <span className="text-xl font-semibold pt-1">from your documents</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 py-10">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="px-6 shadow-xl rounded-xl py-6 border-1"
          >
            <div className="h-10 w-10 flex justify-center items-center rounded-md">
              <feature.icon></feature.icon>
            </div>
            <h3 className="pt-2 text-xl font-semibold pb-2">{feature.title}</h3>
            <p className="text-lg font-light">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const features = [
  {
    title: "Secure File Upload",
    description:
      "Upload PDF files securely with our encrypted file transfer system. Your documents remain private and protected.",
    icon: Shield,
  },
  {
    title: "Lightning Fast Responses",
    description:
      "Get immediate answers to your questions without having to scan through lengthy documents manually.",
    icon: Zap,
  },
  {
    title: "Natural Conversations",
    description:
      "Chat naturally with your documents. Ask questions in plain language and get concise, relevant answers.",
    icon: MessageSquare,
  },
];

export default Feature;
