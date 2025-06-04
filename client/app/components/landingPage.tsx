"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Upload } from "lucide-react";
import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div>
      <section className="px-4 py-24 md:py-32 bg-gradient-to-b from-muted/50 to-muted/10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
              <span className="text-primary">Introducing PDF Chatbot</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight lg:text-7xl animate-fade-up">
              Chat with your <span className="text-primary">PDFs</span> using AI
            </h1>

            <p className="max-w-[42rem] text-muted-foreground text-xl animate-fade-up">
              Upload your PDF documents and ask questions to get instant,
              accurate answers powered by AI. Extract insights, find
              information, and save time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
              <Link href="/dashboard/chat">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/auth/sign-in">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="mt-12 relative w-full max-w-4xl overflow-hidden rounded-xl border bg-background shadow-xl animate-fade-up">
              <div className="aspect-[16/9] overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/20 to-muted">
                <div className="flex h-full items-center justify-center">
                  <div className="flex gap-8 p-8">
                    <div className="w-1/3 rounded-lg bg-background/80 backdrop-blur p-4 shadow-lg">
                      <div className="space-y-2">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <div className="h-4 w-24 rounded bg-muted-foreground/20"></div>
                        <div className="h-3 w-full rounded bg-muted-foreground/20"></div>
                        <div className="h-3 w-4/5 rounded bg-muted-foreground/20"></div>
                      </div>
                    </div>
                    <div className="w-2/3 rounded-lg bg-background/80 backdrop-blur p-4 shadow-lg">
                      <div className="space-y-2">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                        <div className="h-4 w-24 rounded bg-muted-foreground/20"></div>
                        <div className="h-3 w-full rounded bg-muted-foreground/20"></div>
                        <div className="h-3 w-4/5 rounded bg-muted-foreground/20"></div>
                        <div className="h-3 w-full rounded bg-muted-foreground/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
