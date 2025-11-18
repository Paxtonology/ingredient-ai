import { Link, useLocation } from "react-router-dom";
import { Home, Camera, MessageSquare, FileText, Mail, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around md:justify-between py-3">
          <Link to="/" className="hidden md:flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="font-bold text-xl text-foreground">NutriScan AI</span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-around md:justify-end">
            <Link to="/">
              <Button variant={isActive("/") ? "default" : "ghost"} size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            
            <Link to="/scanner">
              <Button variant={isActive("/scanner") ? "default" : "ghost"} size="sm" className="gap-2">
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">Scanner</span>
              </Button>
            </Link>
            
            <Link to="/chat">
              <Button variant={isActive("/chat") ? "default" : "ghost"} size="sm" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Chat</span>
              </Button>
            </Link>
            
            <Link to="/about">
              <Button variant={isActive("/about") ? "ghost" : "ghost"} size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button variant={isActive("/contact") ? "ghost" : "ghost"} size="sm" className="gap-2">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </Button>
            </Link>
            
            <Link to="/settings">
              <Button variant={isActive("/settings") ? "ghost" : "ghost"} size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;