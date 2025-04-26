import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun, Bell, Shield, Eye, EyeOff, Upload, Database, UploadCloud as CloudUpload } from 'lucide-react';

const ProfessorSettings: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  // Form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: 'Computer Science',
    employeeId: 'SVCE-PROF-2023-104',
    phone: '9876543210',
    designation: 'Associate Professor',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    studentQueries: true,
    assessmentReminders: true,
    announcements: false,
    uploadReminders: true,
  });
  
  const [uploadSettings, setUploadSettings] = useState({
    autoScan: true,
    defaultMaxMarks: 50,
    defaultPassMarks: 25,
    allowRegrading: true,
  });
  
  // Handlers
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };
  
  const handleUploadSettingToggle = (setting: keyof typeof uploadSettings) => {
    if (typeof uploadSettings[setting] === 'boolean') {
      setUploadSettings(prev => ({
        ...prev,
        [setting]: !prev[setting],
      }));
    }
  };
  
  const handleUploadSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUploadSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    alert('Profile updated successfully');
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // In a real app, this would submit to backend
    alert('Password updated successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const handleUploadSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    alert('Upload settings updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-gray-800 shadow-lg">
            <div className="border-b border-gray-700 p-4">
              <h3 className="text-xl font-semibold text-white">Profile Information</h3>
              <p className="text-sm text-gray-400">Update your personal details</p>
            </div>
            
            <form onSubmit={handleProfileSubmit} className="p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-400">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-400">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="department" className="block mb-1 text-sm font-medium text-gray-400">
                    Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={profileForm.department}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="designation" className="block mb-1 text-sm font-medium text-gray-400">
                    Designation
                  </label>
                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    value={profileForm.designation}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="employeeId" className="block mb-1 text-sm font-medium text-gray-400">
                    Employee ID
                  </label>
                  <input
                    id="employeeId"
                    name="employeeId"
                    type="text"
                    value={profileForm.employeeId}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-400">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
          {/* Password Settings */}
          <div className="mt-6 rounded-xl bg-gray-800 shadow-lg">
            <div className="border-b border-gray-700 p-4">
              <h3 className="text-xl font-semibold text-white">Password</h3>
              <p className="text-sm text-gray-400">Update your password</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block mb-1 text-sm font-medium text-gray-400">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPassword.current ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-gray-400">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword.new ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-400">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword.confirm ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
          
          {/* Upload Settings */}
          <div className="mt-6 rounded-xl bg-gray-800 shadow-lg">
            <div className="border-b border-gray-700 p-4">
              <div className="flex items-center space-x-2">
                <Upload size={20} className="text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Upload Preferences</h3>
              </div>
              <p className="text-sm text-gray-400">Configure mark sheet uploading settings</p>
            </div>
            
            <form onSubmit={handleUploadSettingsSubmit} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-300">Enable Auto-Scan</span>
                    <p className="text-sm text-gray-400">Automatically scan uploaded mark sheets</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUploadSettingToggle('autoScan')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      uploadSettings.autoScan ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    <span className="sr-only">Toggle auto-scan</span>
                    <span
                      className={`${
                        uploadSettings.autoScan ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    ></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-300">Allow Re-grading Requests</span>
                    <p className="text-sm text-gray-400">Let students request paper re-grading</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUploadSettingToggle('allowRegrading')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      uploadSettings.allowRegrading ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    <span className="sr-only">Toggle re-grading</span>
                    <span
                      className={`${
                        uploadSettings.allowRegrading ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    ></span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="defaultMaxMarks" className="block mb-1 text-sm font-medium text-gray-400">
                      Default Maximum Marks
                    </label>
                    <input
                      id="defaultMaxMarks"
                      name="defaultMaxMarks"
                      type="number"
                      value={uploadSettings.defaultMaxMarks}
                      onChange={handleUploadSettingChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="defaultPassMarks" className="block mb-1 text-sm font-medium text-gray-400">
                      Default Pass Marks
                    </label>
                    <input
                      id="defaultPassMarks"
                      name="defaultPassMarks"
                      type="number"
                      value={uploadSettings.defaultPassMarks}
                      onChange={handleUploadSettingChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Save Upload Settings
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Appearance */}
          <div className="rounded-xl bg-gray-800 shadow-lg">
            <div className="border-b border-gray-700 p-4">
              <h3 className="text-xl font-semibold text-white">Appearance</h3>
              <p className="text-sm text-gray-400">Customize your view</p>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {theme === 'dark' ? (
                    <Moon size={20} className="text-blue-400" />
                  ) : (
                    <Sun size={20} className="text-yellow-400" />
                  )}
                  <span className="text-white">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
                
                <button
                  onClick={toggleTheme}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700"
                >
                  <span className="sr-only">Toggle theme</span>
                  <span
                    className={`${
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="rounded-xl bg-gray-800 shadow-lg">
            <div className="border-b border-gray-700 p-4">
              <div className="flex items-center space-x-2">
                <Bell size={20} className="text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Notifications</h3>
              </div>
              <p className="text-sm text-gray-400">Manage alert preferences</p>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Student Queries</span>
                <button
                  onClick={() => handleNotificationToggle('studentQueries')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notificationSettings.studentQueries ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Toggle notification</span>
                  <span
                    className={`${
                      notificationSettings.studentQueries ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  ></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Assessment Reminders</span>
                <button
                  onClick={() => handleNotificationToggle('assessmentReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notificationSettings.assessmentReminders ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Toggle notification</span>
                  <span
                    className={`${
                      notificationSettings.assessmentReminders ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  ></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Upload Reminders</span>
                <button
                  onClick={() => handleNotificationToggle('uploadReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notificationSettings.uploadReminders ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Toggle notification</span>
                  <span
                    className={`${
                      notificationSettings.uploadReminders ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  ></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Announcements</span>
                <button
                  onClick={() => handleNotificationToggle('announcements')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notificationSettings.announcements ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Toggle notification</span>
                  <span
                    className={`${
                      notificationSettings.announcements ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
          
          {/* API Access */}
          <div className="rounded-xl bg-gray-800 shadow-lg">
            <div className="border-b border-gray-700 p-4">
              <div className="flex items-center space-x-2">
                <Database size={20} className="text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Gemini API</h3>
              </div>
              <p className="text-sm text-gray-400">Configure AI scanning settings</p>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <label htmlFor="apiKey" className="block mb-1 text-sm font-medium text-gray-400">
                  API Key
                </label>
                <div className="relative">
                  <input
                    id="apiKey"
                    type="password"
                    value="••••••••••••••••••••••••••••••"
                    className="w-full rounded-lg border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    readOnly
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
              
              <div className="rounded-lg bg-blue-900/20 p-3">
                <div className="flex">
                  <div className="mr-3 flex-shrink-0">
                    <CloudUpload size={20} className="text-blue-400" />
                  </div>
                  <p className="text-sm text-blue-300">
                    <span className="font-semibold">Note:</span> The Gemini API is used for automated mark sheet scanning. 
                    Make sure your API key is valid for uninterrupted service.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Update API Key
                </button>
              </div>
            </div>
          </div>
          
          {/* Privacy */}
          <div className="rounded-xl bg-gray-800 shadow-lg">
            <div className="border-b border-gray-700 p-4">
              <div className="flex items-center space-x-2">
                <Shield size={20} className="text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Privacy</h3>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-400">
                Your account has administrative privileges. You can access and modify student records and assessment data 
                for your assigned classes only.
              </p>
              
              <div className="mt-4 rounded-lg bg-blue-900/20 p-3">
                <p className="text-sm text-blue-300">
                  <span className="font-semibold">Note:</span> All mark modifications are logged for audit purposes. 
                  For security concerns, please contact the IT department.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorSettings;