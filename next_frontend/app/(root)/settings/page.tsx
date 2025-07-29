"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Palette,
  Globe,
  Database,
  Download,
  Trash2,
  Moon,
  Sun,
  Smartphone,
  HelpCircle,
  FileText,
  Shield,
  Bell,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "light",
    language: "en",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    autoSync: true,
    darkMode: false,
    compactView: false,
    animationsEnabled: true,
    soundEnabled: true,
    dataBackup: true,
    analyticsEnabled: true,
  });

  const toggleSetting = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const exportData = () => {
    // Mock data export
    alert("Data export started. You will receive an email when ready.");
  };

  const deleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deletion process initiated.");
    }
  };

  return (
    <div className="pt-20 lg:pt-24 p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-lg">
          <Settings className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Configure your application preferences
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="general"
        className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Language & Region
                </CardTitle>
                <CardDescription>
                  Configure your language and regional preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Language</h4>
                    <Select
                      value={settings.language}
                      onValueChange={(value) =>
                        updateSetting("language", value)
                      }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Currency</h4>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) =>
                        updateSetting("currency", value)
                      }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                        <SelectItem value="CAD">
                          CAD - Canadian Dollar
                        </SelectItem>
                        <SelectItem value="AUD">
                          AUD - Australian Dollar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Date Format</h4>
                    <Select
                      value={settings.dateFormat}
                      onValueChange={(value) =>
                        updateSetting("dateFormat", value)
                      }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="MMM DD, YYYY">
                          MMM DD, YYYY
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Time Format</h4>
                    <Select
                      value={settings.timeFormat}
                      onValueChange={(value) =>
                        updateSetting("timeFormat", value)
                      }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Application Behavior
                </CardTitle>
                <CardDescription>
                  Configure how the application behaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-sync Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync your financial data
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoSync}
                    onCheckedChange={() => toggleSetting("autoSync")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sound Effects</h4>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for actions and notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={() => toggleSetting("soundEnabled")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Animations</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable smooth animations and transitions
                    </p>
                  </div>
                  <Switch
                    checked={settings.animationsEnabled}
                    onCheckedChange={() => toggleSetting("animationsEnabled")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Theme</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      settings.theme === "light"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => updateSetting("theme", "light")}>
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="w-4 h-4" />
                      <span className="font-medium">Light</span>
                    </div>
                    <div className="w-full h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded"></div>
                  </div>

                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      settings.theme === "dark"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => updateSetting("theme", "dark")}>
                    <div className="flex items-center gap-2 mb-2">
                      <Moon className="w-4 h-4" />
                      <span className="font-medium">Dark</span>
                    </div>
                    <div className="w-full h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded"></div>
                  </div>

                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      settings.theme === "auto"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => updateSetting("theme", "auto")}>
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="w-4 h-4" />
                      <span className="font-medium">Auto</span>
                    </div>
                    <div className="w-full h-8 bg-gradient-to-r from-gray-100 via-gray-500 to-gray-900 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Compact View</h4>
                  <p className="text-sm text-muted-foreground">
                    Use a more compact layout to fit more content
                  </p>
                </div>
                <Switch
                  checked={settings.compactView}
                  onCheckedChange={() => toggleSetting("compactView")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Analytics & Crash Reports</h4>
                  <p className="text-sm text-muted-foreground">
                    Help improve the app by sharing usage data
                  </p>
                </div>
                <Switch
                  checked={settings.analyticsEnabled}
                  onCheckedChange={() => toggleSetting("analyticsEnabled")}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Data Sharing</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Performance Data</p>
                      <p className="text-sm text-muted-foreground">
                        Share app performance metrics
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Usage Statistics</p>
                      <p className="text-sm text-muted-foreground">
                        Share feature usage statistics
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Crash Reports</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically send crash reports
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Manage your data backup and export options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automatic Backup</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup your data to the cloud
                    </p>
                  </div>
                  <Switch
                    checked={settings.dataBackup}
                    onCheckedChange={() => toggleSetting("dataBackup")}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Data Export</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">
                        Export Financial Data
                      </h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download all your financial data in CSV format
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exportData}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Account Settings</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        Export your account settings and preferences
                      </p>
                      <Button
                        variant="outline"
                        size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Trash2 className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Actions that cannot be undone</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">
                    Delete Account
                  </h4>
                  <p className="text-sm text-red-700 mb-4">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={deleteAccount}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="about">
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>About FinanceTracker</CardTitle>
                <CardDescription>
                  Information about the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Version</h4>
                    <p className="text-sm text-muted-foreground">v2.4.1</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Last Updated</h4>
                    <p className="text-sm text-muted-foreground">
                      December 15, 2024
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Build</h4>
                    <p className="text-sm text-muted-foreground">#1234567</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">License</h4>
                    <p className="text-sm text-muted-foreground">MIT License</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Support & Resources</CardTitle>
                <CardDescription>Get help and learn more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-auto p-4">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium">Help Center</p>
                      <p className="text-sm text-muted-foreground">
                        Find answers to common questions
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-auto p-4">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div className="text-left">
                      <p className="font-medium">Documentation</p>
                      <p className="text-sm text-muted-foreground">
                        Learn how to use all features
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-auto p-4">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <div className="text-left">
                      <p className="font-medium">Privacy Policy</p>
                      <p className="text-sm text-muted-foreground">
                        Learn about data protection
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-auto p-4">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <div className="text-left">
                      <p className="font-medium">Terms of Service</p>
                      <p className="text-sm text-muted-foreground">
                        Read our terms and conditions
                      </p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
