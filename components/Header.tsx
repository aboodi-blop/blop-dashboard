import { useState } from "react";
import { Search, Moon, Sun, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";
import type { User } from "./AuthContext";

interface HeaderProps {
  title: string;
  subtitle?: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  searchResults?: SearchResult[];
  onSearchResultClick?: (result: SearchResult) => void;
  user: User;
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  page: string;
  type: 'income' | 'expense' | 'investor';
}

export function Header({ 
  title, 
  subtitle, 
  isDarkMode, 
  onToggleTheme,
  showSearch = false,
  onSearch,
  searchResults = [],
  onSearchResultClick,
  user
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { logout } = useAuth();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowResults(value.length > 0);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onSearchResultClick) {
      onSearchResultClick(result);
    }
    setSearchQuery("");
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    if (onSearch) {
      onSearch("");
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red text-red-foreground';
      case 'investor': return 'bg-blue text-blue-foreground';
      case 'accountant': return 'bg-green text-green-foreground';
      case 'guest': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  // Helper function to get user initials safely
  const getUserInitials = (displayName?: string, email?: string) => {
    if (displayName && displayName.trim()) {
      return displayName.split(' ').map(n => n[0]?.toUpperCase() || '').join('').slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  // Helper function to get display name safely
  const getDisplayName = (displayName?: string, email?: string) => {
    if (displayName && displayName.trim()) {
      return displayName;
    }
    if (email) {
      return email.split('@')[0];
    }
    return 'User';
  };

  return (
    <motion.header 
      className="bg-background border-b border-border px-4 sm:px-6 py-3 sm:py-4 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Logo and Title */}
        <motion.div 
          className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="min-w-0 flex-1">
            <motion.h1 
              className="text-lg sm:text-2xl font-semibold truncate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p 
                className="text-xs sm:text-sm text-muted-foreground mt-1 truncate hidden sm:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Center - Search (only on dashboard and desktop) */}
        {showSearch && (
          <motion.div 
            className="hidden lg:flex flex-1 max-w-md mx-4 relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions, reports..." 
                className="pl-10 pr-10 border-border bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowResults(searchQuery.length > 0)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-secondary"
                  onClick={clearSearch}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-full z-50"
                >
                  <Card className="max-h-80 overflow-y-auto shadow-lg">
                    <CardContent className="p-0">
                      {searchResults.length > 0 ? (
                        <div className="py-2">
                          {searchResults.map((result, index) => (
                            <motion.button
                              key={`${result.type}-${result.id}`}
                              className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors border-b border-border last:border-b-0"
                              onClick={() => handleResultClick(result)}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              whileHover={{ backgroundColor: "var(--secondary)" }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1 pr-2">
                                  <p className="font-medium truncate">{result.title}</p>
                                  <p className="text-sm text-muted-foreground truncate">{result.subtitle}</p>
                                </div>
                                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded flex-shrink-0">
                                  {result.page}
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      ) : searchQuery ? (
                        <div className="p-4 text-center text-muted-foreground">
                          No results found for "{searchQuery}"
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Mobile Search (full width on mobile when dashboard) */}
        {showSearch && (
          <motion.div 
            className="lg:hidden absolute top-full left-0 right-0 p-4 bg-background border-b border-border z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions, reports..." 
                className="pl-10 pr-10 border-border bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowResults(searchQuery.length > 0)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-secondary"
                  onClick={clearSearch}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Mobile Search Results */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2"
                >
                  <Card className="max-h-60 overflow-y-auto">
                    <CardContent className="p-0">
                      {searchResults.length > 0 ? (
                        <div className="py-2">
                          {searchResults.map((result, index) => (
                            <motion.button
                              key={`mobile-${result.type}-${result.id}`}
                              className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors border-b border-border last:border-b-0"
                              onClick={() => handleResultClick(result)}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium truncate pr-2">{result.title}</p>
                                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded flex-shrink-0">
                                    {result.page}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{result.subtitle}</p>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      ) : searchQuery ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                          No results found for "{searchQuery}"
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Right side - Theme toggle and User profile */}
        <motion.div 
          className="flex items-center gap-2 sm:gap-4 flex-shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Theme toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" onClick={onToggleTheme}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </motion.div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button 
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {getUserInitials(user.displayName, user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium">{getDisplayName(user.displayName, user.email)}</p>
                  <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{getDisplayName(user.displayName, user.email)}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.hash = '#profile'}>
                <span className="mr-2">👤</span>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <span className="mr-2">🚪</span>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>

      {/* Click outside to close search results */}
      {showResults && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setShowResults(false)}
        />
      )}
    </motion.header>
  );
}