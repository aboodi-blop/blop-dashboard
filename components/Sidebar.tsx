import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Settings, 
  Users,
  BarChart3,
  History,
  Menu,
  X,
  User,
  LogOut
} from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userRole: string;
}

export function Sidebar({ currentPage, onPageChange, userRole }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { logout } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, roles: ['admin', 'investor', 'accountant', 'guest'] },
    { id: 'income', label: 'Income', icon: TrendingUp, roles: ['admin', 'accountant'] },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown, roles: ['admin', 'accountant'] },
    { id: 'history', label: 'History', icon: History, roles: ['admin', 'investor', 'accountant'] },
    { id: 'investors', label: 'Investors', icon: Users, roles: ['admin'] },
    { id: 'profile', label: 'Profile', icon: User, roles: ['admin', 'investor', 'accountant', 'guest'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] },
  ];

  // Filter navigation items based on user role
  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close mobile sidebar when page changes
  useEffect(() => {
    setIsOpen(false);
  }, [currentPage]);

  // Close mobile sidebar when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button - Fixed positioning to avoid overlaps */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed top-4 left-4 z-[60]"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSidebar}
          className="shadow-lg bg-background border-border hover:bg-secondary"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </motion.div>

      {/* Desktop Sidebar */}
      <motion.div 
        className={`
          hidden md:block fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out
          ${isHovered ? 'w-64' : 'w-20'}
          ${isHovered ? 'bg-card/95 backdrop-blur-sm border-r border-border shadow-lg' : 'bg-transparent'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col h-full pt-6">
          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-2">
            {filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left relative
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-3">
            <motion.button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium whitespace-nowrap overflow-hidden"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar - Fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="md:hidden fixed inset-0 bg-black/50 z-[50]"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="md:hidden fixed inset-y-0 left-0 w-full max-w-sm bg-background border-r border-border z-[55] shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="font-semibold">Menu</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                  {filteredItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          onPageChange(item.id);
                          setIsOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left
                          ${isActive 
                            ? 'bg-primary text-primary-foreground shadow-sm' 
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                          }
                        `}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.05,
                          ease: "easeOut"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-border">
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}