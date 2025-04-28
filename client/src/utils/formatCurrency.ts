export const formatCurrency = (
    amount: number,
    locale: string = 'en-IN',
    currency: string = 'INR',
    maxFractionDigits: number = 0
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: maxFractionDigits,
    }).format(amount);
  };
  