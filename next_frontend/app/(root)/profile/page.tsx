"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Camera,
  Shield,
  Bell,
  CreditCard,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94102",
    dateOfBirth: "1990-05-15",
    occupation: "Software Engineer",
    annualIncome: "95000",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    budgetAlerts: true,
    goalUpdates: true,
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    biometricsEnabled: true,
    sessionTimeout: "30",
  });

  const connectedAccounts = [
    {
      id: 1,
      name: "Chase Freedom",
      type: "Credit Card",
      status: "Active",
      lastSync: "2 hours ago",
    },
    {
      id: 2,
      name: "Bank of America Checking",
      type: "Bank Account",
      status: "Active",
      lastSync: "1 day ago",
    },
    {
      id: 3,
      name: "Wells Fargo Savings",
      type: "Bank Account",
      status: "Active",
      lastSync: "3 hours ago",
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save profile changes
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset profile changes
  };

  const toggleNotification = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const toggleSecurity = (key: string) => {
    setSecurity((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  // The imageUrl property will be the Google profile picture URL if they signed in with Google
  // or the uploaded image if they've set one.
  const profileImageUrl = user?.imageUrl;
  const userName = user?.fullName || "User";

  return (
    <div className="pt-20 lg:pt-24 p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-lg">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="personal"
        className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profileImageUrl} />
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-primary to-purple-600 text-white">
                        {profile.firstName[0]}
                        {profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <CardTitle>
                  {profile.firstName} {profile.lastName}
                </CardTitle>
                <CardDescription>{profile.occupation}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {profile.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {profile.address}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-2">
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profile.address}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, address: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profile.dateOfBirth}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            dateOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={profile.occupation}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, occupation: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="annualIncome">Annual Income</Label>
                      <Input
                        id="annualIncome"
                        type="number"
                        value={profile.annualIncome}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            annualIncome: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 mt-6">
                      <Button
                        onClick={handleSave}
                        className="flex-1">
                        <Check className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="flex-1">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactorEnabled}
                    onCheckedChange={() => toggleSecurity("twoFactorEnabled")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Biometric Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or face recognition
                    </p>
                  </div>
                  <Switch
                    checked={security.biometricsEnabled}
                    onCheckedChange={() => toggleSecurity("biometricsEnabled")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Session Timeout</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) =>
                      setSecurity({ ...security, sessionTimeout: value })
                    }>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Password & Access</CardTitle>
                <CardDescription>Manage your login credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Active Sessions</h4>
                    <p className="text-sm text-muted-foreground">
                      2 active sessions
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm">
                    Manage Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Communication Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={() =>
                        toggleNotification("emailNotifications")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications on your device
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={() =>
                        toggleNotification("pushNotifications")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive text messages for important updates
                      </p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={() =>
                        toggleNotification("smsNotifications")
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Content Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly financial summaries
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={() =>
                        toggleNotification("weeklyReports")
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Budget Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when approaching budget limits
                      </p>
                    </div>
                    <Switch
                      checked={notifications.budgetAlerts}
                      onCheckedChange={() => toggleNotification("budgetAlerts")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Goal Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Receive updates on your financial goals
                      </p>
                    </div>
                    <Switch
                      checked={notifications.goalUpdates}
                      onCheckedChange={() => toggleNotification("goalUpdates")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Connected Accounts
              </CardTitle>
              <CardDescription>
                Manage your connected bank accounts and cards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{account.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {account.type} • Last sync: {account.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-emerald-600 border-emerald-600">
                        {account.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"></Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button
                  className="w-full"
                  variant="outline">
                  Add New Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
