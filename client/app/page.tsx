"use client";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Landing from "./components/landingPage";
import Feature from "./components/featureComponent";
import Footer from "./components/footerComponent";
import { ModeToggle } from "@/components/ui/toggleButton";

export default function Home() {
  const user = useUser();

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <header className="border-b w-screen bg-backgroud">
          <div className="flex justify-between items-center w-full h-20 px-6 pb-5">
            <div className="flex items-center gap-2 pl-4">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xl font-bold">ASK YOUR PDF</span>
            </div>
            <div className="flex items-center gap-2">
              {user.isSignedIn ? (
                <div className="px-2 rounded-xl flex justify-center items-center mt-2">
                  <div className="px-10">
                    <ModeToggle />
                  </div>
                  <div>
                    <UserButton></UserButton>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <ModeToggle />
                  </div>
                  <div className="px-1 rounded-xl">
                    <Link href="/auth/sign-in">
                      <Button variant="outline" size="lg">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                  <div className="px-1 rounded-xl">
                    <Link href="/auth/sign-up">
                      <Button variant="outline" size="lg">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        <main>
          <Landing />
          <Feature />
        </main>
        <div className="pt-15">
          <Footer />
        </div>
      </div>
    </div>
  );
}
