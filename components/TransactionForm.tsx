import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Plus, Edit } from "lucide-react";

interface TransactionFormProps {
  type: 'income' | 'expense';
  investors: { name: string; id: string; expensePercentage: number; incomePercentage: number }[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
  editData?: any;
}

export function TransactionForm({ 
  type, 
  investors, 
  onSubmit, 
  onCancel, 
  editData 
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    currency: 'USD',
    category: '',
    frequency: type === 'expense' ? 'monthly' : 'one-time',
    date: new Date().toISOString().split('T')[0],
    investors: investors.map(inv => ({
      name: inv.name,
      percentage: type === 'expense' ? inv.expensePercentage : inv.incomePercentage
    }))
  });

  // Populate form with edit data if provided
  useEffect(() => {
    if (editData) {
      setFormData({
        description: editData.description || '',
        amount: editData.amount?.toString() || '',
        currency: editData.currency || 'USD',
        category: editData.category || '',
        frequency: editData.frequency || (type === 'expense' ? 'monthly' : 'one-time'),
        date: editData.date || new Date().toISOString().split('T')[0],
        investors: editData.investors || investors.map(inv => ({
          name: inv.name,
          percentage: type === 'expense' ? inv.expensePercentage : inv.incomePercentage
        }))
      });
    }
  }, [editData, investors, type]);

  const incomeCategories = [
    "Client Payment", "Project Revenue", "Consulting", "Design Services", 
    "Development", "Subscription Revenue", "Licensing", "Investment Returns", 
    "Freelance Work", "Product Sales", "Commission", "Royalties", "Other"
  ];

  const expenseCategories = [
    "Design Tools", "Development Tools", "Domain & Hosting", "Email Services", 
    "Communication", "Banking", "Legal & Compliance", "Marketing", "Consulting", 
    "Investment Tools", "CRM", "Productivity", "Wellness", "Sales Tools", 
    "Office Supplies", "Travel", "Insurance", "Utilities", "Other"
  ];

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'one-time', label: 'One-time' }
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)', symbol: '$' },
    { value: 'SAR', label: 'SAR (ر.س)', symbol: 'ر.س' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.category) {
      return;
    }

    // Ensure percentages add up to 100
    const totalPercentage = formData.investors.reduce((sum, inv) => sum + inv.percentage, 0);
    if (Math.abs(totalPercentage - 100) > 0.1) {
      alert('Investor percentages must add up to 100%');
      return;
    }

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  const handleInvestorPercentageChange = (index: number, percentage: number) => {
    const newInvestors = [...formData.investors];
    newInvestors[index].percentage = percentage;
    setFormData({ ...formData, investors: newInvestors });
  };

  const totalPercentage = formData.investors.reduce((sum, inv) => sum + inv.percentage, 0);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {editData ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {editData ? `Edit ${type}` : `Add ${type}`}
          </DialogTitle>
          <DialogDescription>
            {editData 
              ? `Update the details for this ${type}.`
              : `Add a new ${type} to your business budget. Fill in the details below and set investor percentages.`
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Input
                id="description"
                placeholder={`Enter ${type} description`}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="pr-16"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  {currencies.find(c => c.value === formData.currency)?.symbol}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency *</Label>
              <Select 
                value={formData.currency} 
                onValueChange={(value) => setFormData({ ...formData, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {(type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Frequency selection */}
          <div className="space-y-2">
            <Label htmlFor="frequency">
              {type === 'expense' ? 'Payment Frequency *' : 'Income Frequency'}
            </Label>
            <Select 
              value={formData.frequency} 
              onValueChange={(value) => setFormData({ ...formData, frequency: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((freq) => (
                  <SelectItem key={freq.value} value={freq.value}>
                    {freq.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Investor Distribution */}
          <div className="space-y-3">
            <Label>Investor Distribution</Label>
            <div className="p-4 rounded-lg border bg-secondary/20">
              <p className="text-sm text-muted-foreground mb-3">
                {type === 'expense' 
                  ? 'Set how much each investor should pay for this expense:'
                  : 'Set how much each investor should receive from this income:'
                }
              </p>
              <div className="space-y-3">
                {formData.investors.map((investor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">{investor.name}</Label>
                      <p className="text-xs text-muted-foreground">
                        Default {type}: {type === 'expense' 
                          ? investors.find(inv => inv.name === investor.name)?.expensePercentage 
                          : investors.find(inv => inv.name === investor.name)?.incomePercentage
                        }%
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-20"
                        value={investor.percentage}
                        onChange={(e) => handleInvestorPercentageChange(index, parseFloat(e.target.value) || 0)}
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total:</span>
                  <span className={`text-sm font-medium ${
                    Math.abs(totalPercentage - 100) < 0.1 ? 'text-green' : 'text-red'
                  }`}>
                    {totalPercentage.toFixed(1)}%
                  </span>
                </div>
                {Math.abs(totalPercentage - 100) > 0.1 && (
                  <p className="text-sm text-red">
                    Percentages must add up to 100%
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={Math.abs(totalPercentage - 100) > 0.1}
            >
              {editData ? 'Update' : 'Add'} {type}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}