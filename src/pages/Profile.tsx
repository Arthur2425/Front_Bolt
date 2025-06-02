import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Pencil, Check, X, Phone, MapPin, UserCheck } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // In a real app, you would save these changes to your backend
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User info card */}
          <div className="md:col-span-1">
            <Card className="animate-slide-up">
              <CardHeader className="text-center">
                <div className="flex justify-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center border-4 border-white shadow-md">
                    <User size={40} className="text-primary-600" />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 mt-2">
                  {user?.userType === 'auctioneer' ? 'Auctioneer' : 'Bidder'}
                </span>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail size={18} className="mr-2" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={18} className="mr-2" />
                    <span>{user?.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-sm">{user?.address}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          
          {/* Profile details card */}
          <div className="md:col-span-2">
            <Card className="animate-slide-up delay-75">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                {!isEditing ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(true)}
                    icon={<Pencil size={16} />}
                  >
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCancel}
                      icon={<X size={16} />}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={handleSave}
                      icon={<Check size={16} />}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardBody>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                      />
                    </div>
                    <Input
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                    />
                    <Input
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">First Name</h3>
                        <p className="text-gray-900">{user?.firstName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Last Name</h3>
                        <p className="text-gray-900">{user?.lastName}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
                      <p className="text-gray-900">{user?.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                      <p className="text-gray-900">{user?.address}</p>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
            
            {/* Activity card */}
            <Card className="mt-6 animate-slide-up delay-150">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </CardHeader>
              <CardBody>
                <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                  <p>{user?.userType === 'auctioneer' ? 'Your listed auctions' : 'Your bidding activity'} will appear here.</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;