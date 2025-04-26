import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Home, 
  FileText, 
  Upload, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  Menu, 
  X 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const isStudent = user?.role === 'student';
  const isProfessor = user?.role === 'professor';
  const basePath = isStudent ? '/student' : '/professor';

  const navItems = isStudent 
    ? [
        { icon: <Home size={20} />, label: 'Dashboard', path: `${basePath}/dashboard` },
        { icon: <FileText size={20} />, label: 'Marks', path: `${basePath}/marks` },
        { icon: <MessageSquare size={20} />, label: 'Queries', path: `${basePath}/queries` },
        { icon: <Settings size={20} />, label: 'Settings', path: `${basePath}/settings` },
      ]
    : [
        { icon: <Home size={20} />, label: 'Dashboard', path: `${basePath}/dashboard` },
        { icon: <Upload size={20} />, label: 'Upload', path: `${basePath}/upload` },
        { icon: <MessageSquare size={20} />, label: 'Queries', path: `${basePath}/queries` },
        { icon: <Settings size={20} />, label: 'Settings', path: `${basePath}/settings` },
      ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (sidebarOpen) setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo and close button */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="font-bold text-white">SV</span>
              </div>
              <span className="text-xl font-semibold">SVCE FAT</span>
            </div>
            <button 
              onClick={toggleSidebar}
              className="rounded-full p-1 hover:bg-gray-700 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* User info */}
          <div className="mt-2 border-t border-gray-700 pt-4 pb-2 px-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="font-bold text-white">{user?.name.charAt(0)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-gray-400 capitalize">{user?.role}</span>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mt-4 flex-1 space-y-1 px-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                } transition-colors duration-200`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          
          {/* Footer actions */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-gray-800 shadow-md">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={toggleSidebar}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-700 lg:hidden"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="hidden text-sm text-gray-400 md:inline-block">
                {isStudent ? 'Student Portal' : 'Professor Portal'}
              </span>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;