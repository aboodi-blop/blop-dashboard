import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header, SearchResult } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { IncomePage, IncomeItem } from "./components/IncomePage";
import { ExpensesPage, ExpenseItem } from "./components/ExpensesPage";
import { HistoryPage } from "./components/HistoryPage";
import { InvestorsPage } from "./components/InvestorsPage";
import { ProfilePage } from "./components/ProfilePage";
import { LoginPage } from "./components/LoginPage";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Skeleton } from "./components/ui/skeleton";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Moon, Sun, AlertCircle, Wifi, WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export interface Investor {
  name: string;
  id: string;
  expensePercentage: number;
  incomePercentage: number;
}

// Loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto animate-pulse">
          <span className="text-2xl font-bold text-primary-foreground">B</span>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-3 w-24 mx-auto" />
        </div>
        <p className="text-sm text-muted-foreground">Loading Blop...</p>
      </div>
    </div>
  );
}

// Error boundary component
function ErrorBoundary({ children, error, retry }: { children: React.ReactNode; error: Error | null; retry: () => void }) {
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                {error.message || 'An unexpected error occurred'}
              </AlertDescription>
            </Alert>
            <Button onClick={retry} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  return <>{children}</>;
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [error, setError] = useState<Error | null>(null);
  const [servicesReady, setServicesReady] = useState(false);
  
  const { user, loading: authLoading, isDemo } = useAuth();
  
  // Data states
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([]);
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([]);
  const [investors, setInvestors] = useState<Investor[]>([]);

  // Services state
  const [services, setServices] = useState<{
    incomeService: any;
    expenseService: any;
    investorService: any;
  } | null>(null);

  // Initialize services
  useEffect(() => {
    const initializeServices = async () => {
      try {
        const { getServices } = await import('./lib/firestore');
        const serviceInstances = await getServices();
        
        setServices({
          incomeService: serviceInstances.incomeService,
          expenseService: serviceInstances.expenseService,
          investorService: serviceInstances.investorService
        });
        setServicesReady(true);
      } catch (error) {
        console.error('Error initializing services:', error);
        setError(error as Error);
        setServicesReady(true); // Don't block the UI indefinitely
      }
    };

    initializeServices();
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (!isDemo) {
        toast.success('Connection restored');
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      if (!isDemo) {
        toast.error('Connection lost. Working offline...');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isDemo]);

  // Set up real-time data listeners
  useEffect(() => {
    if (!user || !servicesReady || !services) {
      return;
    }

    setError(null);
    const unsubscribers: (() => void)[] = [];

    try {
      // Listen to income changes
      if (services.incomeService?.onSnapshot) {
        const incomeUnsubscribe = services.incomeService.onSnapshot(user.uid, (income: any[]) => {
          setIncomeItems(income.map(item => ({
            id: item.id,
            description: item.description,
            amount: item.amount,
            currency: item.currency,
            category: item.category,
            date: item.date,
            frequency: item.frequency || 'One-time',
            investors: item.investors || []
          })));
        });
        unsubscribers.push(incomeUnsubscribe);
      }

      // Listen to expense changes
      if (services.expenseService?.onSnapshot) {
        const expenseUnsubscribe = services.expenseService.onSnapshot(user.uid, (expenses: any[]) => {
          setExpenseItems(expenses.map(item => ({
            id: item.id,
            description: item.description,
            amount: item.amount,
            currency: item.currency,
            category: item.category,
            frequency: item.frequency,
            date: item.date,
            paid: item.paid,
            investors: item.investors || []
          })));
        });
        unsubscribers.push(expenseUnsubscribe);
      }

      // Listen to investor changes
      if (services.investorService?.onSnapshot) {
        const investorUnsubscribe = services.investorService.onSnapshot(user.uid, (investorData: any[]) => {
          setInvestors(investorData.map(item => ({
            id: item.id,
            name: item.name,
            expensePercentage: item.expensePercentage,
            incomePercentage: item.incomePercentage
          })));
        });
        unsubscribers.push(investorUnsubscribe);
      }
    } catch (err) {
      console.error('Error setting up data listeners:', err);
      setError(err as Error);
    }

    return () => {
      unsubscribers.forEach(unsubscribe => {
        try {
          unsubscribe();
        } catch (error) {
          console.error('Error unsubscribing:', error);
        }
      });
    };
  }, [user, servicesReady, services]);

  // CRUD operations with error handling
  const addIncome = async (newIncome: Omit<IncomeItem, 'id'>) => {
    if (!user || !services?.incomeService) return;
    
    try {
      await services.incomeService.add(user.uid, newIncome);
      toast.success('Income added successfully');
    } catch (error) {
      toast.error('Failed to add income');
      console.error('Error adding income:', error);
    }
  };

  const updateIncome = async (updatedIncome: IncomeItem) => {
    if (!services?.incomeService) return;
    
    try {
      await services.incomeService.update(updatedIncome.id, updatedIncome);
      toast.success('Income updated successfully');
    } catch (error) {
      toast.error('Failed to update income');
      console.error('Error updating income:', error);
    }
  };

  const deleteIncome = async (id: string) => {
    if (!services?.incomeService) return;
    
    try {
      await services.incomeService.delete(id);
      toast.success('Income deleted successfully');
    } catch (error) {
      toast.error('Failed to delete income');
      console.error('Error deleting income:', error);
    }
  };

  const addExpense = async (newExpense: Omit<ExpenseItem, 'id'>) => {
    if (!user || !services?.expenseService) return;
    
    try {
      await services.expenseService.add(user.uid, newExpense);
      toast.success('Expense added successfully');
    } catch (error) {
      toast.error('Failed to add expense');
      console.error('Error adding expense:', error);
    }
  };

  const updateExpense = async (updatedExpense: ExpenseItem) => {
    if (!services?.expenseService) return;
    
    try {
      await services.expenseService.update(updatedExpense.id, updatedExpense);
      toast.success('Expense updated successfully');
    } catch (error) {
      toast.error('Failed to update expense');
      console.error('Error updating expense:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    if (!services?.expenseService) return;
    
    try {
      await services.expenseService.delete(id);
      toast.success('Expense deleted successfully');
    } catch (error) {
      toast.error('Failed to delete expense');
      console.error('Error deleting expense:', error);
    }
  };

  const toggleExpensePaid = async (id: string) => {
    if (!services?.expenseService) return;
    
    const expense = expenseItems.find(item => item.id === id);
    if (!expense) return;

    try {
      await services.expenseService.togglePaid(id, !expense.paid);
      toast.success(`Expense marked as ${!expense.paid ? 'paid' : 'unpaid'}`);
    } catch (error) {
      toast.error('Failed to update expense status');
      console.error('Error toggling expense paid status:', error);
    }
  };

  const addInvestor = async (investor: Omit<Investor, 'id'>) => {
    if (!user || !services?.investorService) return;
    
    try {
      await services.investorService.add(user.uid, investor);
      toast.success('Investor added successfully');
    } catch (error) {
      toast.error('Failed to add investor');
      console.error('Error adding investor:', error);
    }
  };

  const updateInvestor = async (updatedInvestor: Investor) => {
    if (!services?.investorService) return;
    
    try {
      await services.investorService.update(updatedInvestor.id, updatedInvestor);
      toast.success('Investor updated successfully');
    } catch (error) {
      toast.error('Failed to update investor');
      console.error('Error updating investor:', error);
    }
  };

  const deleteInvestor = async (id: string) => {
    if (!services?.investorService) return;
    
    try {
      await services.investorService.delete(id);
      toast.success('Investor deleted successfully');
    } catch (error) {
      toast.error('Failed to delete investor');
      console.error('Error deleting investor:', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Dashboard';
      case 'income': return 'Income Management';
      case 'expenses': return 'Expenses Management';
      case 'history': return 'Transaction History';
      case 'investors': return 'Investor Management';
      case 'profile': return 'Profile Settings';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Manage & track your business finances';
      case 'income': return 'Track and manage your business income sources';
      case 'expenses': return 'Monitor and control your business expenses';
      case 'history': return 'View your complete financial transaction history';
      case 'investors': return 'Manage investor information and profit sharing';
      case 'profile': return 'Manage your account information and preferences';
      case 'settings': return 'Configure your business budget application';
      default: return 'Manage & track your business finances';
    }
  };

  // Global search functionality
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    const lowercaseQuery = query.toLowerCase();

    // Search income items
    incomeItems.forEach(item => {
      if (
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        item.currency.toLowerCase().includes(lowercaseQuery)
      ) {
        results.push({
          id: item.id,
          title: item.description,
          subtitle: `$${item.amount.toLocaleString()} ${item.currency} • ${item.category}`,
          page: 'Income',
          type: 'income'
        });
      }
    });

    // Search expense items
    expenseItems.forEach(item => {
      if (
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        item.currency.toLowerCase().includes(lowercaseQuery) ||
        item.frequency.toLowerCase().includes(lowercaseQuery)
      ) {
        results.push({
          id: item.id,
          title: item.description,
          subtitle: `$${item.amount.toLocaleString()} ${item.currency} • ${item.category} • ${item.frequency}`,
          page: 'Expenses',
          type: 'expense'
        });
      }
    });

    // Search investors
    investors.forEach(investor => {
      if (investor.name.toLowerCase().includes(lowercaseQuery)) {
        results.push({
          id: investor.id,
          title: investor.name,
          subtitle: `Expense: ${investor.expensePercentage}% • Income: ${investor.incomePercentage}%`,
          page: 'Investors',
          type: 'investor'
        });
      }
    });

    // Limit results to 8 items
    setSearchResults(results.slice(0, 8));
  };

  // Handle search result click
  const handleSearchResultClick = (result: SearchResult) => {
    setHighlightedItemId(result.id);
    
    switch (result.type) {
      case 'income':
        setCurrentPage('income');
        break;
      case 'expense':
        setCurrentPage('expenses');
        break;
      case 'investor':
        setCurrentPage('investors');
        break;
    }

    // Clear search results
    setSearchResults([]);

    // Clear highlight after animation
    setTimeout(() => {
      setHighlightedItemId(null);
    }, 3000);
  };

  // Handle dashboard panel clicks
  const handleDashboardNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const pageVariants = {
    initial: { 
      opacity: 0, 
      x: 20,
      scale: 0.98
    },
    in: { 
      opacity: 1, 
      x: 0,
      scale: 1
    },
    out: { 
      opacity: 0, 
      x: -20,
      scale: 0.98
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            incomeItems={incomeItems}
            expenseItems={expenseItems}
            investors={investors}
            onTogglePaid={toggleExpensePaid}
            onNavigate={handleDashboardNavigation}
          />
        );
      case 'income':
        return (
          <IncomePage
            incomeItems={incomeItems}
            onAddIncome={addIncome}
            onUpdateIncome={updateIncome}
            onDeleteIncome={deleteIncome}
            investors={investors}
            highlightedItemId={highlightedItemId}
          />
        );
      case 'expenses':
        return (
          <ExpensesPage
            expenseItems={expenseItems}
            onAddExpense={addExpense}
            onUpdateExpense={updateExpense}
            onDeleteExpense={deleteExpense}
            onTogglePaid={toggleExpensePaid}
            investors={investors}
            highlightedItemId={highlightedItemId}
          />
        );
      case 'history':
        return (
          <HistoryPage
            incomeItems={incomeItems}
            expenseItems={expenseItems}
            investors={investors}
          />
        );
      case 'investors':
        return (
          <InvestorsPage
            investors={investors}
            onAddInvestor={addInvestor}
            onUpdateInvestor={updateInvestor}
            onDeleteInvestor={deleteInvestor}
            highlightedItemId={highlightedItemId}
          />
        );
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="max-w-md card-hover">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleTheme}
                      >
                        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );
      default:
        return <Dashboard incomeItems={incomeItems} expenseItems={expenseItems} investors={investors} onTogglePaid={toggleExpensePaid} onNavigate={handleDashboardNavigation} />;
    }
  };

  const retryConnection = () => {
    setError(null);
    window.location.reload();
  };

  // Show loading screen while authentication is loading or services are initializing
  if (authLoading || !servicesReady) {
    return <LoadingScreen />;
  }

  // If user is not logged in, show login page
  if (!user) {
    return <LoginPage />;
  }

  return (
    <ErrorBoundary error={error} retry={retryConnection}>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className="flex h-screen bg-background overflow-hidden">
          <Sidebar 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
            userRole={user.role}
          />
          
          {/* Main content area */}
          <div className="flex-1 md:ml-20 ml-0 flex flex-col min-w-0">
            {/* Connection status indicator */}
            {!isOnline && !isDemo && (
              <div className="bg-warning text-warning-foreground px-4 py-2 text-sm text-center flex items-center justify-center gap-2">
                <WifiOff className="h-4 w-4" />
                Working offline - Changes will sync when connection is restored
              </div>
            )}
            
            {/* Demo mode indicator */}
            {isDemo && (
              <div className="bg-blue text-blue-foreground px-4 py-2 text-sm text-center flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Demo Mode - All data is stored locally in your browser
              </div>
            )}
            
            {/* Header */}
            <Header
              title={getPageTitle()}
              subtitle={getPageSubtitle()}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              showSearch={currentPage === 'dashboard'}
              onSearch={handleSearch}
              searchResults={searchResults}
              onSearchResultClick={handleSearchResultClick}
              user={user}
            />
            
            {/* Page content with transitions */}
            <main className="flex-1 overflow-auto custom-scrollbar">
              <div className="p-4 sm:p-6 pb-20 md:pb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    {renderCurrentPage()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>
        </div>
        
        {/* Toast notifications */}
        <Toaster position="bottom-right" />
      </div>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}