import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plus, Trash2, DollarSign, Edit2, TrendingUp, Calendar, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransactionForm } from "./TransactionForm";
import { formatCurrency, calculateInUSD } from "./utils/currency";

export interface IncomeItem {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  frequency?: string;
  date: string;
  investors: { name: string; percentage: number }[];
}

interface IncomePageProps {
  incomeItems: IncomeItem[];
  onAddIncome: (income: Omit<IncomeItem, 'id'>) => void;
  onUpdateIncome: (income: IncomeItem) => void;
  onDeleteIncome: (id: string) => void;
  investors: { name: string; id: string; expensePercentage: number; incomePercentage: number }[];
  highlightedItemId?: string | null;
}

export function IncomePage({ 
  incomeItems, 
  onAddIncome, 
  onUpdateIncome,
  onDeleteIncome, 
  investors,
  highlightedItemId
}: IncomePageProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState<IncomeItem | null>(null);

  // Calculate dashboard metrics
  const calculateTotals = () => {
    const monthlyIncomes = incomeItems.filter(item => item.frequency === 'monthly');
    const yearlyIncomes = incomeItems.filter(item => item.frequency === 'yearly');
    const quarterlyIncomes = incomeItems.filter(item => item.frequency === 'quarterly');
    const weeklyIncomes = incomeItems.filter(item => item.frequency === 'weekly');
    const dailyIncomes = incomeItems.filter(item => item.frequency === 'daily');
    const oneTimeIncomes = incomeItems.filter(item => item.frequency === 'one-time' || !item.frequency);

    // Calculate total monthly income in USD (convert all frequencies to monthly)
    const totalMonthlyUSD = 
      monthlyIncomes.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) +
      (yearlyIncomes.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) / 12) +
      (quarterlyIncomes.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) / 3) +
      (weeklyIncomes.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) * 4.33) +
      (dailyIncomes.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) * 30);

    // Calculate total yearly income
    const totalYearlyUSD = totalMonthlyUSD * 12 + oneTimeIncomes.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0);

    return {
      totalMonthlyUSD,
      totalYearlyUSD,
      totalIncomes: incomeItems.length,
      averageIncomeUSD: incomeItems.length > 0 ? incomeItems.reduce((sum, item) => sum + calculateInUSD(item.amount, item.currency), 0) / incomeItems.length : 0
    };
  };

  // Calculate investor breakdown
  const calculateInvestorBreakdown = () => {
    const breakdown: { [key: string]: { monthly: number; yearly: number } } = {};
    
    investors.forEach(investor => {
      breakdown[investor.name] = { monthly: 0, yearly: 0 };
    });

    incomeItems.forEach(item => {
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
        }
      });
    });

    return breakdown;
  };

  const totals = calculateTotals();
  const investorBreakdown = calculateInvestorBreakdown();

  const handleSubmit = (data: any) => {
    if (editingIncome) {
      onUpdateIncome({
        ...editingIncome,
        ...data
      });
      setEditingIncome(null);
    } else {
      onAddIncome({
        description: data.description,
        amount: parseFloat(data.amount),
        currency: data.currency,
        category: data.category,
        frequency: data.frequency,
        date: data.date,
        investors: data.investors
      });
    }
    setShowForm(false);
  };

  const handleEdit = (income: IncomeItem) => {
    setEditingIncome(income);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingIncome(null);
  };

  const getFrequencyColor = (frequency?: string) => {
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
            Income Sources
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mt-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Track and manage your business income sources
          </motion.p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Income
          </Button>
        </motion.div>
      </motion.div>

      {/* Dashboard Overview */}
      {incomeItems.length > 0 && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-green" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Total</p>
                  <div className="currency-display">
                    <p className="currency-primary text-green">
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
                <div className="p-2 bg-blue/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Yearly Total</p>
                  <div className="currency-display">
                    <p className="currency-primary text-green">
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
                <div className="p-2 bg-purple/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Income</p>
                  <div className="currency-display">
                    <p className="currency-primary">
                      {formatCurrency(totals.averageIncomeUSD, 'USD').primary}
                    </p>
                    <p className="currency-secondary">
                      {formatCurrency(totals.averageIncomeUSD, 'USD').secondary}
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
                  <div className="h-5 w-5 bg-orange rounded-full flex items-center justify-center">
                    <span className="text-xs text-orange-foreground font-semibold">
                      {totals.totalIncomes}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Income Sources</p>
                  <p className="text-xl font-semibold">
                    {totals.totalIncomes} sources
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Investor Breakdown */}
      {incomeItems.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>
                Investor Income Breakdown
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
                          <p className="currency-primary text-green">
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Income Form Modal */}
      <AnimatePresence>
        {showForm && (
          <TransactionForm
            type="income"
            investors={investors}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            editData={editingIncome}
          />
        )}
      </AnimatePresence>

      {/* Income List */}
      {incomeItems.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="py-8 text-center">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No income recorded yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start tracking your business income sources
              </p>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Income
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {incomeItems.map((item) => {
            const isHighlighted = highlightedItemId === item.id;
            const currencyDisplay = formatCurrency(item.amount, item.currency);
            
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                id={`income-${item.id}`}
                className={`transition-all duration-1000 ${
                  isHighlighted ? 'highlight-item' : ''
                }`}
              >
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{item.description}</CardTitle>
                          {item.frequency && (
                            <Badge className={getFrequencyColor(item.frequency)}>
                              {item.frequency}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.category} • {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="currency-display">
                          <p className="currency-primary text-green">
                            +{currencyDisplay.primary}
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
                            onClick={() => onDeleteIncome(item.id)}
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