import { useState, useEffect } from "react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Moon, Globe, Shield, Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [historyCount, setHistoryCount] = useState(0);
  
  // Load darkMode from localStorage initially
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  const [language, setLanguage] = useState("en");
  const [dataSharing, setDataSharing] = useState(false);

  // Get initial history count on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("scanHistory");
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        setHistoryCount(history.length);
      } catch (error) {
        setHistoryCount(0);
      }
    }
  }, []);

  // Update HTML class and save to localStorage whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleClearHistory = () => {
    // Get current count for the toast message
    const savedHistory = localStorage.getItem("scanHistory");
    let count = 0;
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        count = history.length;
      } catch (error) {
        count = 0;
      }
    }

    // Clear from localStorage
    localStorage.removeItem("scanHistory");
    
    // Update local state
    setHistoryCount(0);
    
    // Trigger storage event for other tabs/components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'scanHistory',
      newValue: null,
      oldValue: savedHistory
    }));
    
    toast.success(`Cleared ${count} scan${count !== 1 ? 's' : ''} from history!`);
  };

  const handleDeleteAccount = () => {
    toast.error("Please contact support to delete your account");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-300">
            Customize your Benifit AI experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Notifications Card */}
          <Card className="p-6 bg-card dark:bg-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold dark:text-gray-100">Notifications</h2>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  Manage your notification preferences
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Receive alerts about new features and updates
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>
          </Card>

          {/* Dark Mode Card */}
          <Card className="p-6 bg-card dark:bg-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Moon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold dark:text-gray-100">Appearance</h2>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  Customize how Benifit looks
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  Switch between light and dark themes
                </p>
              </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
            </div>
          </Card>

        

          {/* Privacy & Security Card */}
          <Card className="p-6 bg-card dark:bg-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold dark:text-gray-100">Privacy & Security</h2>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  Control your data and privacy
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Anonymous Data Sharing</Label>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Help improve our AI by sharing anonymous usage data
                  </p>
                </div>
                <Switch
                  id="data-sharing"
                  checked={dataSharing}
                  onCheckedChange={setDataSharing}
                />
              </div>
            </div>
          </Card>

          {/* Data Management Card */}
          <Card className="p-6 bg-card dark:bg-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-bold dark:text-gray-100">Data Management</h2>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  Manage your stored data
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Scan History</p>
                  <p className="text-sm text-muted-foreground">
                    {historyCount} scan{historyCount !== 1 ? 's' : ''} stored locally
                  </p>
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    disabled={historyCount === 0}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Scan History
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      Clear Scan History?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your scan history 
                      ({historyCount} scan{historyCount !== 1 ? 's' : ''}) from local storage. 
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearHistory}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Clear History
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                Warning: Deleting your account is permanent and cannot be undone.
              </p>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="px-8">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;