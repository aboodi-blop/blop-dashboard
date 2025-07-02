// Currency conversion rate (USD to SAR)
export const USD_TO_SAR_RATE = 3.75;

// Currency formatting utilities
export const formatCurrency = (amount: number, currency: string = 'USD', showBoth: boolean = true) => {
  if (currency === 'USD') {
    const usdFormatted = `$${amount.toLocaleString()}`;
    if (showBoth) {
      const sarAmount = amount * USD_TO_SAR_RATE;
      return {
        primary: usdFormatted,
        secondary: `${sarAmount.toLocaleString()} SAR`,
        combined: `${usdFormatted} (${sarAmount.toLocaleString()} SAR)`
      };
    }
    return {
      primary: usdFormatted,
      secondary: '',
      combined: usdFormatted
    };
  } else if (currency === 'SAR') {
    const sarFormatted = `${amount.toLocaleString()} SAR`;
    if (showBoth) {
      const usdAmount = amount / USD_TO_SAR_RATE;
      return {
        primary: `$${usdAmount.toLocaleString()}`,
        secondary: sarFormatted,
        combined: `$${usdAmount.toLocaleString()} (${sarFormatted})`
      };
    }
    return {
      primary: sarFormatted,
      secondary: '',
      combined: sarFormatted
    };
  }
  
  // Fallback for other currencies
  return {
    primary: `${amount.toLocaleString()} ${currency}`,
    secondary: '',
    combined: `${amount.toLocaleString()} ${currency}`
  };
};

// Calculate totals in USD for consistent calculations
export const calculateInUSD = (amount: number, currency: string): number => {
  if (currency === 'SAR') {
    return amount / USD_TO_SAR_RATE;
  }
  return amount; // Assume USD or already in USD
};

// Convert amount to specified currency
export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first if needed
  let usdAmount = amount;
  if (fromCurrency === 'SAR') {
    usdAmount = amount / USD_TO_SAR_RATE;
  }
  
  // Convert from USD to target currency
  if (toCurrency === 'SAR') {
    return usdAmount * USD_TO_SAR_RATE;
  }
  
  return usdAmount; // Return USD amount
};