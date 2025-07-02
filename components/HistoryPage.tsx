import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Separator } from "./ui/separator";
import {
  History,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
  Filter,
} from "lucide-react";
import { IncomeItem } from "./IncomePage";
import { ExpenseItem } from "./ExpensesPage";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface HistoryPageProps {
  incomeItems: IncomeItem[];
  expenseItems: ExpenseItem[];
  investors: { name: string; id: string }[];
}

interface MonthlyData {
  month: string;
  year: number;
  income: { [currency: string]: number };
  expenses: { [currency: string]: number };
  transactions: (
    | IncomeItem
    | (ExpenseItem & { type: "expense" })
  )[];
}

export function HistoryPage({
  incomeItems,
  expenseItems,
  investors,
}: HistoryPageProps) {
  const [selectedYear, setSelectedYear] =
    useState<string>("all");
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>("all");

  const currencySymbols = {
    USD: "$",
    SAR: "ر.س",
    INR: "₹",
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbol =
      currencySymbols[currency as keyof typeof currencySymbols];
    return `${symbol}${amount.toLocaleString()}`;
  };

  const calculateMonthlyAmount = (
    amount: number,
    frequency: string,
  ) => {
    switch (frequency) {
      case "yearly":
        return amount / 12;
      case "quarterly":
        return amount / 3;
      case "monthly":
        return amount;
      case "one-time":
        return amount;
      default:
        return amount;
    }
  };

  // Group transactions by month and year
  const monthlyData = useMemo(() => {
    const grouped: { [key: string]: MonthlyData } = {};

    // Process income items
    incomeItems.forEach((item) => {
      const date = new Date(item.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const monthName = date.toLocaleString("default", {
        month: "long",
      });

      if (!grouped[key]) {
        grouped[key] = {
          month: monthName,
          year: date.getFullYear(),
          income: {},
          expenses: {},
          transactions: [],
        };
      }

      if (!grouped[key].income[item.currency]) {
        grouped[key].income[item.currency] = 0;
      }
      grouped[key].income[item.currency] += item.amount;
      grouped[key].transactions.push(item);
    });

    // Process expense items
    expenseItems.forEach((item) => {
      const date = new Date(item.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const monthName = date.toLocaleString("default", {
        month: "long",
      });

      if (!grouped[key]) {
        grouped[key] = {
          month: monthName,
          year: date.getFullYear(),
          income: {},
          expenses: {},
          transactions: [],
        };
      }

      const monthlyAmount = calculateMonthlyAmount(
        item.amount,
        item.frequency,
      );

      if (!grouped[key].expenses[item.currency]) {
        grouped[key].expenses[item.currency] = 0;
      }
      grouped[key].expenses[item.currency] += monthlyAmount;
      grouped[key].transactions.push({
        ...item,
        type: "expense" as const,
      });
    });

    return Object.values(grouped).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return (
        new Date(`${b.month} 1, ${b.year}`).getMonth() -
        new Date(`${a.month} 1, ${a.year}`).getMonth()
      );
    });
  }, [incomeItems, expenseItems]);

  // Get available years and currencies for filtering
  const availableYears = Array.from(
    new Set(monthlyData.map((data) => data.year)),
  )
    .sort()
    .reverse();
  const availableCurrencies = Array.from(
    new Set([
      ...incomeItems.map((item) => item.currency),
      ...expenseItems.map((item) => item.currency),
    ]),
  );

  // Filter data based on selected filters
  const filteredData = monthlyData.filter((data) => {
    if (
      selectedYear !== "all" &&
      data.year.toString() !== selectedYear
    )
      return false;
    if (selectedCurrency !== "all") {
      const hasCurrency =
        data.income[selectedCurrency] ||
        data.expenses[selectedCurrency];
      if (!hasCurrency) return false;
    }
    return true;
  });

  // Calculate totals for filtered data
  const calculateTotals = () => {
    const totals: {
      [currency: string]: {
        income: number;
        expenses: number;
        balance: number;
      };
    } = {};

    filteredData.forEach((monthData) => {
      Object.keys(monthData.income).forEach((currency) => {
        if (!totals[currency])
          totals[currency] = {
            income: 0,
            expenses: 0,
            balance: 0,
          };
        totals[currency].income +=
          monthData.income[currency] || 0;
      });

      Object.keys(monthData.expenses).forEach((currency) => {
        if (!totals[currency])
          totals[currency] = {
            income: 0,
            expenses: 0,
            balance: 0,
          };
        totals[currency].expenses +=
          monthData.expenses[currency] || 0;
      });
    });

    Object.keys(totals).forEach((currency) => {
      totals[currency].balance =
        totals[currency].income - totals[currency].expenses;
    });

    return totals;
  };

  const totals = calculateTotals();

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Financial History Report", 20, 20);

    // Add filters info
    doc.setFontSize(12);
    const filterText = `Year: ${selectedYear === "all" ? "All Years" : selectedYear} | Currency: ${selectedCurrency === "all" ? "All Currencies" : selectedCurrency}`;
    doc.text(filterText, 20, 35);

    // Add generation date
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      20,
      45,
    );

    let yPosition = 60;

    // Add totals summary
    doc.setFontSize(14);
    doc.text("Summary", 20, yPosition);
    yPosition += 10;

    const summaryTableData = Object.entries(totals).map(
      ([currency, data]) => [
        currency,
        formatCurrency(data.income, currency),
        formatCurrency(data.expenses, currency),
        formatCurrency(data.balance, currency),
      ],
    );

    (doc as any).autoTable({
      head: [
        [
          "Currency",
          "Total Income",
          "Total Expenses",
          "Net Balance",
        ],
      ],
      body: summaryTableData,
      startY: yPosition,
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
    });

    yPosition = (doc as any).lastAutoTable.finalY + 20;

    // Add monthly breakdown
    doc.setFontSize(14);
    doc.text("Monthly Breakdown", 20, yPosition);
    yPosition += 10;

    const monthlyTableData: any[] = [];

    filteredData.forEach((monthData) => {
      const currencies = Array.from(
        new Set([
          ...Object.keys(monthData.income),
          ...Object.keys(monthData.expenses),
        ]),
      );

      currencies.forEach((currency) => {
        if (
          selectedCurrency === "all" ||
          selectedCurrency === currency
        ) {
          const income = monthData.income[currency] || 0;
          const expenses = monthData.expenses[currency] || 0;
          const balance = income - expenses;

          monthlyTableData.push([
            `${monthData.month} ${monthData.year}`,
            currency,
            formatCurrency(income, currency),
            formatCurrency(expenses, currency),
            formatCurrency(balance, currency),
          ]);
        }
      });
    });

    (doc as any).autoTable({
      head: [
        ["Month", "Currency", "Income", "Expenses", "Balance"],
      ],
      body: monthlyTableData,
      startY: yPosition,
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
    });

    // Save the PDF
    const fileName = `financial-history-${selectedYear}-${selectedCurrency}-${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 bg-[rgba(0,0,0,0)]">
        <History className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">
            Financial History
          </h1>
          <p className="text-muted-foreground">
            Track monthly income and expenses over time
          </p>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Filters:
            </span>
          </div>

          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
          >
            <SelectTrigger className="w-32 rounded-lg">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedCurrency}
            onValueChange={setSelectedCurrency}
          >
            <SelectTrigger className="w-32 rounded-lg">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All Currencies
              </SelectItem>
              {availableCurrencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={exportToPDF}
          className="rounded-lg bg-vibrant-blue hover:bg-vibrant-blue-hover text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Summary Cards */}
      {Object.keys(totals).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Summary (
            {selectedYear === "all"
              ? "All Years"
              : selectedYear}
            )
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(totals).map(([currency, data]) => (
              <Card key={currency} className="rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    {currency}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Total Income:
                    </span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(data.income, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Total Expenses:
                    </span>
                    <span className="font-bold text-red-600">
                      {formatCurrency(data.expenses, currency)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Net Balance:
                    </span>
                    <span
                      className={`font-bold ${data.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(data.balance, currency)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Monthly History Table */}
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredData.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No transaction history available for the selected
              filters.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Income</TableHead>
                    <TableHead>Expenses</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Transactions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((monthData, index) => {
                    // Get all currencies for this month
                    const currencies = Array.from(
                      new Set([
                        ...Object.keys(monthData.income),
                        ...Object.keys(monthData.expenses),
                      ]),
                    );

                    return currencies
                      .map((currency, currIndex) => {
                        if (
                          selectedCurrency !== "all" &&
                          selectedCurrency !== currency
                        )
                          return null;

                        const income =
                          monthData.income[currency] || 0;
                        const expenses =
                          monthData.expenses[currency] || 0;
                        const balance = income - expenses;
                        const transactionCount =
                          monthData.transactions.filter(
                            (t) => t.currency === currency,
                          ).length;

                        return (
                          <TableRow
                            key={`${index}-${currIndex}`}
                          >
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {monthData.month}{" "}
                                  {monthData.year}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="mt-1"
                                >
                                  {currency}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-green-600">
                                  {formatCurrency(
                                    income,
                                    currency,
                                  )}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <TrendingDown className="h-4 w-4 text-red-600" />
                                <span className="font-medium text-red-600">
                                  {formatCurrency(
                                    expenses,
                                    currency,
                                  )}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {formatCurrency(
                                  balance,
                                  currency,
                                )}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {transactionCount} transaction
                                {transactionCount !== 1
                                  ? "s"
                                  : ""}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })
                      .filter(Boolean);
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}