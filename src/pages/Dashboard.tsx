import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Settings,
  Plus,
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserProfile from '@/components/UserProfile';

const Dashboard = () => {
  const { user, profile, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getWelcomeMessage = () => {
    const name = profile?.first_name ? `, ${profile.first_name}` : '';
    switch (userRole) {
      case 'advisor':
        return `Welcome back${name}! Manage your clients and appointments.`;
      case 'client':
        return `Welcome${name}! Review your financial planning progress.`;
      case 'admin':
        return `Welcome back${name}! System administration dashboard.`;
      default:
        return `Welcome${name}! Complete your profile to get started.`;
    }
  };

  const advisorStats = [
    { title: 'Active Clients', value: '24', icon: Users, change: '+2 this month' },
    { title: 'Appointments Today', value: '5', icon: Calendar, change: '2 upcoming' },
    { title: 'Portfolio Value', value: '$2.4M', icon: TrendingUp, change: '+8.2% this quarter' },
    { title: 'Documents Pending', value: '7', icon: FileText, change: '3 require review' },
  ];

  const clientStats = [
    { title: 'Portfolio Value', value: '$125,000', icon: TrendingUp, change: '+12.5% YTD' },
    { title: 'Next Appointment', value: 'Mar 15', icon: Calendar, change: 'with John Doe' },
    { title: 'Goals Progress', value: '68%', icon: Shield, change: 'Retirement planning' },
    { title: 'Documents', value: '12', icon: FileText, change: '2 new this month' },
  ];

  const getStats = () => {
    switch (userRole) {
      case 'advisor':
        return advisorStats;
      case 'client':
        return clientStats;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">{getWelcomeMessage()}</p>
              </div>
              <div className="flex items-center space-x-2">
                {userRole && (
                  <Badge variant="outline" className="px-3 py-1">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </Badge>
                )}
                <Button size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          {getStats().length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {getStats().map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {userRole === 'advisor' && (
                    <>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Add New Client
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Create Report
                      </Button>
                    </>
                  )}
                  
                  {userRole === 'client' && (
                    <>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        View Documents
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Portfolio Review
                      </Button>
                    </>
                  )}
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Profile */}
            <div className="lg:col-span-2">
              <UserProfile />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;