import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { IncomeItem } from "./IncomePage";
import { ExpenseItem } from "./ExpensesPage";
import { motion } from "framer-motion";
import { useCountAnimation } from "./hooks/useCountAnimation";
import { formatCurrency, calculateInUSD } from "./utils/currency";

interface DashboardProps {
  incomeItems: IncomeItem[];
  expenseItems: ExpenseItem[];
  investors: { name: string; id: string; expensePercentage: number; incomePercentage: number }[];
  onTogglePaid: (id: string) => void;
  onNavigate: (page: string) => void;
}

export function Dashboard({ 
  incomeItems, 
  expenseItems, 
  investors, 
  onTogglePaid,
  onNavigate
}: DashboardProps) {
  const calculateMonthlyAmount = (amount: number, currency: string, frequency: string) => {
    const usdAmount = calculateInUSD(amount, currency);
    switch (frequency) {
      case 'yearly': return usdAmount / 12;
      case 'quarterly': return usdAmount / 3;
      case 'monthly': return usdAmount;
      case 'weekly': return usdAmount * 4.33;
      case 'daily': return usdAmount * 30;
      case 'one-time': return 0; // One-time doesn't count towards monthly
      default: return usdAmount;
    }
  };

  // Calculate totals in USD for consistency
  const calculateTotals = () => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let paidExpenses = 0;
    let remainingExpenses = 0;

    // Calculate income totals (convert to monthly equivalent)
    incomeItems.forEach(item => {
      totalIncome += calculateMonthlyAmount(item.amount, item.currency, item.frequency || 'one-time');
    });

    // Calculate expense totals (monthly equivalent)
    expenseItems.forEach(item => {
      const monthlyAmount = calculateMonthlyAmount(item.amount, item.currency, item.frequency);
      totalExpenses += monthlyAmount;
      
      if (item.paid) {
        paidExpenses += monthlyAmount;
      } else {
        remainingExpenses += monthlyAmount;
      }
    });

    return {
      totalIncome,
      totalExpenses,
      paidExpenses,
      remainingExpenses,
      balance: totalIncome - remainingExpenses
    };
  };

  const totals = calculateTotals();
  const activeInvestorsCount = investors.length;

  // Animated counters with unique keys for one-time animation
  const animatedTotalIncome = useCountAnimation(totals.totalIncome, 2000, 200, 'dashboard-income');
  const animatedTotalExpenses = useCountAnimation(totals.totalExpenses, 2000, 400, 'dashboard-expenses');
  const animatedInvestorsCount = useCountAnimation(activeInvestorsCount, 1500, 600, 'dashboard-investors');

  // Recent transactions
  const recentTransactions = [
    ...incomeItems.slice(-3).map(item => ({ ...item, type: 'income' as const })),
    ...expenseItems.slice(-3).map(item => ({ ...item, type: 'expense' as const }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6 mobile-safe"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Greeting */}
      <motion.div 
        className="flex items-center gap-4"
        variants={itemVariants}
      >
        <div>
          <motion.h1 
            className="text-4xl font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, Admin!
          </motion.h1>
          <motion.p 
            className="text-muted-foreground mt-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Manage & track your business finances
          </motion.p>
        </div>
      </motion.div>

      {/* Quick stats - Now clickable */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={itemVariants}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => onNavigate('income')}
          className="cursor-pointer dashboard-panel"
        >
          <Card className="hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <TrendingUp className="h-5 w-5 text-green" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <div className="currency-display">
                    <p className="currency-primary text-green">
                      {formatCurrency(animatedTotalIncome, 'USD').primary}
                    </p>
                    <p className="currency-secondary">
                      {formatCurrency(animatedTotalIncome, 'USD').secondary}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => onNavigate('expenses')}
          className="cursor-pointer dashboard-panel"
        >
          <Card className="hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
                >
                  <TrendingDown className="h-5 w-5 text-red" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                  <div className="currency-display">
                    <p className="currency-primary text-red">
                      {formatCurrency(animatedTotalExpenses, 'USD').primary}
                    </p>
                    <p className="currency-secondary">
                      {formatCurrency(animatedTotalExpenses, 'USD').secondary}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => onNavigate('investors')}
          className="cursor-pointer dashboard-panel sm:col-span-2 lg:col-span-1"
        >
          <Card className="hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 1 }}
                >
                  <Users className="h-5 w-5 text-blue" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Active Investors</p>
                  <p className="font-semibold">{animatedInvestorsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Financial Overview */}
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {totals.totalIncome === 0 && totals.totalExpenses === 0 ? (
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  No financial data available
                </motion.p>
              ) : (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Monthly Income</p>
                      <div className="currency-display">
                        <p className="currency-primary text-green">
                          {formatCurrency(totals.totalIncome, 'USD').primary}
                        </p>
                        <p className="currency-secondary">
                          {formatCurrency(totals.totalIncome, 'USD').secondary}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Expenses</p>
                      <div className="currency-display">
                        <p className="currency-primary text-red">
                          {formatCurrency(totals.remainingExpenses, 'USD').primary}
                        </p>
                        <p className="currency-secondary">
                          {formatCurrency(totals.remainingExpenses, 'USD').secondary}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground text-sm">Net Balance</p>
                    <div className="currency-display">
                      <p className={`currency-primary ${totals.balance >= 0 ? 'text-green' : 'text-red'}`}>
                        {formatCurrency(totals.balance, 'USD').primary}
                      </p>
                      <p className="currency-secondary">
                        {formatCurrency(totals.balance, 'USD').secondary}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTransactions.length === 0 ? (
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  No recent transactions
                </motion.p>
              ) : (
                <div className="space-y-3">
                  {recentTransactions.map((transaction, index) => {
                    const currencyDisplay = formatCurrency(transaction.amount, transaction.currency);
                    
                    return (
                      <motion.div
                        key={`${transaction.type}-${transaction.id}-${index}`}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:bg-muted/30 ${
                          transaction.type === 'expense' && 'paid' in transaction && transaction.paid 
                            ? 'bg-green-light/50' 
                            : 'bg-muted/50'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {transaction.type === 'expense' && 'paid' in transaction ? (
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Checkbox
                                checked={transaction.paid}
                                onCheckedChange={() => onTogglePaid(transaction.id)}
                              />
                            </motion.div>
                          ) : (
                            <motion.div 
                              className="w-5 h-5 rounded-full bg-green flex items-center justify-center flex-shrink-0"
                              whileHover={{ scale: 1.1 }}
                            >
                              <TrendingUp className="h-3 w-3 text-white" />
                            </motion.div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium truncate ${
                              transaction.type === 'expense' && 'paid' in transaction && transaction.paid 
                                ? 'line-through text-muted-foreground' 
                                : ''
                            }`}>
                              {transaction.description}
                            </h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <div className="currency-display">
                            <span className={`currency-primary ${
                              transaction.type === 'income' ? 'text-green' : 'text-red'
                            } ${
                              transaction.type === 'expense' && 'paid' in transaction && transaction.paid 
                                ? 'line-through text-muted-foreground' 
                                : ''
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'}
                              {currencyDisplay.primary}
                            </span>
                            <span className="currency-secondary">
                              {currencyDisplay.secondary}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}