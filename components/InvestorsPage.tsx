import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Users, Plus, Edit, Trash2, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Investor {
  name: string;
  id: string;
  expensePercentage: number;
  incomePercentage: number;
}

interface InvestorsPageProps {
  investors: Investor[];
  onAddInvestor: (investor: Omit<Investor, 'id'>) => void;
  onUpdateInvestor: (investor: Investor) => void;
  onDeleteInvestor: (id: string) => void;
  highlightedItemId?: string | null;
}

export function InvestorsPage({ 
  investors, 
  onAddInvestor, 
  onUpdateInvestor, 
  onDeleteInvestor,
  highlightedItemId
}: InvestorsPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState<Investor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    expensePercentage: '',
    incomePercentage: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.expensePercentage || !formData.incomePercentage) return;

    if (editingInvestor) {
      const updatedInvestor: Investor = {
        ...editingInvestor,
        name: formData.name,
        expensePercentage: parseFloat(formData.expensePercentage),
        incomePercentage: parseFloat(formData.incomePercentage)
      };
      onUpdateInvestor(updatedInvestor);
    } else {
      const newInvestor = {
        name: formData.name,
        expensePercentage: parseFloat(formData.expensePercentage),
        incomePercentage: parseFloat(formData.incomePercentage)
      };
      onAddInvestor(newInvestor);
    }

    setFormData({ name: '', expensePercentage: '', incomePercentage: '' });
    setShowForm(false);
    setEditingInvestor(null);
  };

  const handleEdit = (investor: Investor) => {
    setEditingInvestor(investor);
    setFormData({
      name: investor.name,
      expensePercentage: investor.expensePercentage.toString(),
      incomePercentage: investor.incomePercentage.toString()
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ name: '', expensePercentage: '', incomePercentage: '' });
    setShowForm(false);
    setEditingInvestor(null);
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
            Investor Management
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mt-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Manage your business partners and profit sharing
          </motion.p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Investor
          </Button>
        </motion.div>
      </motion.div>

      {/* Add/Edit Investor Dialog */}
      <Dialog open={showForm} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingInvestor ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {editingInvestor ? 'Edit Investor' : 'Add New Investor'}
            </DialogTitle>
            <DialogDescription>
              {editingInvestor 
                ? 'Update the investor details and their percentage shares.'
                : 'Add a new investor with their expense and income percentage shares.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Investor Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter investor name"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expensePercentage" className="flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  Expense Share (%)
                </Label>
                <Input
                  id="expensePercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.expensePercentage}
                  onChange={(e) => setFormData({ ...formData, expensePercentage: e.target.value })}
                  placeholder="0.0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incomePercentage" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Income Share (%)
                </Label>
                <Input
                  id="incomePercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.incomePercentage}
                  onChange={(e) => setFormData({ ...formData, incomePercentage: e.target.value })}
                  placeholder="0.0"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {editingInvestor ? 'Update Investor' : 'Add Investor'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Investors List */}
      {investors.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="py-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No investors added yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add investors to track profit sharing
              </p>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Investor
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {investors.map((investor) => {
            const isHighlighted = highlightedItemId === investor.id;
            
            return (
              <motion.div
                key={investor.id}
                variants={itemVariants}
                id={`investor-${investor.id}`}
                className={`transition-all duration-1000 ${
                  isHighlighted ? 'highlight-item' : ''
                }`}
              >
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-3">{investor.name}</CardTitle>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <TrendingDown className="h-4 w-4 text-red" />
                              <span className="text-sm text-muted-foreground">Expenses</span>
                            </div>
                            <span className="text-lg font-semibold text-red">
                              {investor.expensePercentage}%
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-green" />
                              <span className="text-sm text-muted-foreground">Income</span>
                            </div>
                            <span className="text-lg font-semibold text-green">
                              {investor.incomePercentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(investor)}
                            className="h-8 w-8 p-0 text-blue hover:text-blue hover:bg-blue/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteInvestor(investor.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}