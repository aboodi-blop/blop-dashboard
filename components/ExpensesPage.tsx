import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Plus, Trash2, TrendingDown, Edit2, AlertCircle, Calendar, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransactionForm } from "./TransactionForm";
import { formatCurrency, calculateInUSD } from "./utils/currency";

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  frequency: string;
  date: string;
  investors: { name: string; percentage: number }[];
  paid: boolean;
}

interface ExpensesPageProps {
  expenseItems: ExpenseItem[];
  onAddExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  onUpdateExpense: (expense: ExpenseItem) => void;
  onDeleteExpense: (id: string) => void;
  onTogglePaid: (id: string) => void;
  investors: { name: string; id: string; expensePercentage: number; incomePercentage: number }[];
  highlightedItemId?: string | null;
}

export function ExpensesPage({ 
  expenseItems, 
  onAddExpense, 
  onUpdateExpense,
  onDeleteExpense, 
  onTogglePaid, 
  investors,
  highlightedItemId
}: ExpensesPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);

  // Calculate dashboard metrics
  const calculateTotals = () => {
    const monthlyExpenses = expenseItems.filter(item => item.frequency === 'monthly');
    const yearlyExpenses = expenseItems.filter(item => item.frequency === 'yearly');
    const quarterlyExpenses = expenseItems.filter(item => item.frequency === 'quarterly');
    const weeklyExpenses = expenseItems.filter(item => item.frequency === 'weekly');
    const dailyExpenses = expenseItems.filter(item => item.frequency === 'daily');
    const oneTimeExpenses = expenseItems.filter(item => item.frequency === 'one-time');

    // Calculate total monthly cost in USD (convert all frequencies to monthly)
    const totalMonthlyUSD = 
      monthlyExpenses.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) +
      (yearlyExpenses.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) / 12) +
      (quarterlyExpenses.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) / 3) +
      (weeklyExpenses.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) * 4.33) +
      (dailyExpenses.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) * 30);

    // Calculate total yearly cost
    const totalYearlyUSD = totalMonthlyUSD * 12 + oneTimeExpenses.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0);

    // Calculate unpaid amounts
    const unpaidItems = expenseItems.filter(item => !item.paid);
    const unpaidMonthlyUSD = 
      unpaidItems.filter(item => item.frequency === 'monthly').reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) +
      (unpaidItems.filter(item => item.frequency === 'yearly').reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) / 12) +
      (unpaidItems.filter(item => item.frequency === 'quarterly').reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) / 3) +
      (unpaidItems.filter(item => item.frequency === 'weekly').reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) * 4.33) +
      (unpaidItems.filter(item => item.frequency === 'daily').reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) * 30);

    return {
      totalMonthlyUSD,
      totalYearlyUSD,
      unpaidMonthlyUSD,
      totalExpenses: expenseItems.length,
      paidExpenses: expenseItems.filter(item => item.paid).length
    };
  };

  // Calculate investor breakdown
  const calculateInvestorBreakdown = () => {
    const breakdown: { [key: string]: { monthly: number; yearly: number; unpaid: number } } = {};
    
    investors.forEach(investor => {
      breakdown[investor.name] = { monthly: 0, yearly: 0, unpaid: 0 };
    });

    expenseItems.forEach(item => {
      const monthlyAmountUSD = calculateInUSD(item.amount, item.currency);
      let yearlyMultiplier = 1;
      let monthlyMultiplier = 1;

      switch (item.frequency) {
        case 'monthly': yearlyMultiplier = 12; break;
        case 'yearly': monthlyMultiplier = 1/12; break;
        case 'quarterly': yearlyMultiplier = 4; monthlyMultiplier = 1/3; break;
        case 'weekly': yearlyMultiplier = 52; monthlyMultiplier = 4.33; break;
        case 'daily': yearlyMultiplier = 365; monthlyMultiplier = 30; break;
        case 'one-time': monthlyMultiplier = 0; break;
      }

      item.investors.forEach(itemInvestor => {
        if (breakdown[itemInvestor.name]) {
          const monthlyShare = (monthlyAmountUSD * monthlyMultiplier * itemInvestor.percentage) / 100;
          const yearlyShare = (monthlyAmountUSD * yearlyMultiplier * itemInvestor.percentage) / 100;
          
          breakdown[itemInvestor.name].monthly += monthlyShare;
          breakdown[itemInvestor.name].yearly += yearlyShare;
          
          if (!item.paid) {
            breakdown[itemInvestor.name].unpaid += monthlyShare;
          }
        }
      });
    });

    return breakdown;
  };

  const totals = calculateTotals();
  const investorBreakdown = calculateInvestorBreakdown();

  const handleSubmit = (data: any) => {
    if (editingExpense) {
      onUpdateExpense({
        ...editingExpense,
        ...data
      });
      setEditingExpense(null);
    } else {
      onAddExpense({
        description: data.description,
        amount: parseFloat(data.amount),
        currency: data.currency,
        category: data.category,
        frequency: data.frequency,
        date: data.date,
        investors: data.investors,
        paid: false
      });
    }
    setShowForm(false);
  };

  const handleEdit = (expense: ExpenseItem) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'bg-red text-red-foreground';
      case 'weekly': return 'bg-orange text-orange-foreground';
      case 'monthly': return 'bg-blue text-blue-foreground';
      case 'quarterly': return 'bg-purple text-purple-foreground';
      case 'yearly': return 'bg-green text-green-foreground';
      case 'one-time': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

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
      {/* Header with Add Button */}
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <motion.h2 
            className="text-2xl font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Business Expenses
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mt-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Monitor and control your business expenses
          </motion.p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </motion.div>
      </motion.div>

      {/* Dashboard Overview */}
      {expenseItems.length > 0 && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Total</p>
                  <div className="currency-display">
                    <p className="currency-primary text-red">
                      {formatCurrency(totals.totalMonthlyUSD, 'USD').primary}
                    </p>
                    <p className="currency-secondary">
                      {formatCurrency(totals.totalMonthlyUSD, 'USD').secondary}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple/10 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Yearly Total</p>
                  <div className="currency-display">
                    <p className="currency-primary text-red">
                      {formatCurrency(totals.totalYearlyUSD, 'USD').primary}
                    </p>
                    <p className="currency-secondary">
                      {formatCurrency(totals.totalYearlyUSD, 'USD').secondary}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange/10 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unpaid Monthly</p>
                  <div className="currency-display">
                    <p className="currency-primary text-orange">
                      {formatCurrency(totals.unpaidMonthlyUSD, 'USD').primary}
                    </p>
                    <p className="currency-secondary">
                      {formatCurrency(totals.unpaidMonthlyUSD, 'USD').secondary}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green/10 rounded-lg">
                  <div className="h-5 w-5 bg-green rounded-full flex items-center justify-center">
                    <span className="text-xs text-green-foreground font-semibold">
                      {Math.round((totals.paidExpenses / totals.totalExpenses) * 100)}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paid Expenses</p>
                  <p className="text-xl font-semibold">
                    {totals.paidExpenses}/{totals.totalExpenses}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Investor Breakdown */}
      {expenseItems.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>
                Investor Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {investors.map((investor) => (
                  <div key={investor.id} className="p-4 rounded-lg border bg-secondary/50">
                    <h4 className="font-medium mb-3">{investor.name}</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Share</p>
                        <div className="currency-display">
                          <p className="currency-primary text-red">
                            {formatCurrency(investorBreakdown[investor.name]?.monthly || 0, 'USD').primary}
                          </p>
                          <p className="currency-secondary">
                            {formatCurrency(investorBreakdown[investor.name]?.monthly || 0, 'USD').secondary}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Yearly Share</p>
                        <div className="currency-display">
                          <p className="currency-primary">
                            {formatCurrency(investorBreakdown[investor.name]?.yearly || 0, 'USD').primary}
                          </p>
                          <p className="currency-secondary">
                            {formatCurrency(investorBreakdown[investor.name]?.yearly || 0, 'USD').secondary}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Unpaid Amount</p>
                        <div className="currency-display">
                          <p className="currency-primary text-orange">
                            {formatCurrency(investorBreakdown[investor.name]?.unpaid || 0, 'USD').primary}
                          </p>
                          <p className="currency-secondary">
                            {formatCurrency(investorBreakdown[investor.name]?.unpaid || 0, 'USD').secondary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Expense Form Modal */}
      <AnimatePresence>
        {showForm && (
          <TransactionForm
            type="expense"
            investors={investors}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            editData={editingExpense}
          />
        )}
      </AnimatePresence>

      {/* Expenses List */}
      {expenseItems.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="py-8 text-center">
              <TrendingDown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No expenses recorded yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start tracking your business expenses
              </p>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Expense
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {expenseItems.map((item) => {
            const isHighlighted = highlightedItemId === item.id;
            const currencyDisplay = formatCurrency(item.amount, item.currency);
            
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                id={`expense-${item.id}`}
                className={`transition-all duration-1000 ${
                  isHighlighted ? 'highlight-item' : ''
                }`}
              >
                <Card className={`hover:shadow-md transition-all duration-200 ${
                  item.paid ? 'bg-green-light/30' : ''
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="mt-1"
                        >
                          <Checkbox
                            checked={item.paid}
                            onCheckedChange={() => onTogglePaid(item.id)}
                          />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className={`text-lg ${item.paid ? 'line-through text-muted-foreground' : ''}`}>
                              {item.description}
                            </CardTitle>
                            <Badge className={getFrequencyColor(item.frequency)}>
                              {item.frequency}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.category} • {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="currency-display">
                          <p className={`currency-primary ${
                            item.paid ? 'line-through text-muted-foreground' : 'text-red'
                          }`}>
                            -{currencyDisplay.primary}
                          </p>
                          <p className="currency-secondary">
                            {currencyDisplay.secondary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Investor Distribution</p>
                        <div className="flex flex-wrap gap-2">
                          {item.investors.map((investor, idx) => (
                            <span
                              key={`${item.id}-investor-${investor.name}-${idx}`}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground"
                            >
                              {investor.name}: {investor.percentage}%
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="text-blue hover:text-blue hover:bg-blue/10"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteExpense(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}