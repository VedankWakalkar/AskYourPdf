import { MessageSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return <div>
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <MessageSquare className="h-5 w-5" />
              <span>PDF Chatbot</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Chat with your PDFs using the power of AI.
              Get instant, accurate answers from your documents.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Roadmap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Licenses</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 PDF Chatbot. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  </div>;
};

export default Footer;
