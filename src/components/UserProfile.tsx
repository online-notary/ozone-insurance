import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Building2, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserProfile = () => {
  const { user, profile, userRole, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    phone: profile?.phone || '',
    company: profile?.company || '',
  });

  if (!user || !profile) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Please sign in to view your profile</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await updateProfile(formData);
    
    if (!error) {
      setIsEditing(false);
    }
    
    setIsLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      phone: profile?.phone || '',
      company: profile?.company || '',
    });
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'advisor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'client': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Manage your account details and preferences
            </CardDescription>
          </div>
          {userRole && (
            <Badge className={getRoleBadgeColor(userRole)}>
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  placeholder="Enter your first name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="flex-1"
                />
              </div>
            </div>

            {userRole === 'advisor' && (
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Enter your company name"
                    className="flex-1"
                  />
                </div>
              </div>
            )}

            <div className="flex space-x-2 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">First Name</Label>
                <p className="mt-1 text-sm">{profile.first_name || 'Not provided'}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Last Name</Label>
                <p className="mt-1 text-sm">{profile.last_name || 'Not provided'}</p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm">{user.email}</p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm">{profile.phone || 'Not provided'}</p>
              </div>
            </div>

            {userRole === 'advisor' && (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Company</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm">{profile.company || 'Not provided'}</p>
                </div>
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Account Type</Label>
              <div className="mt-1">
                <Badge className={getRoleBadgeColor(userRole || '')}>
                  {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Unknown'}
                </Badge>
              </div>
            </div>

            <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
              Edit Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;