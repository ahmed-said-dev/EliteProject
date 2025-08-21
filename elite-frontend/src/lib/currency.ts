export type CurrencyLocale = 'ar' | 'en';

export const SAR_CURRENCY_CODE = 'SAR';

export function formatSar(amount: number, locale: CurrencyLocale = 'ar'): string {
	// Prefer Intl with narrow symbol; fallback gracefully
	try {
		const formatter = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', {
			style: 'currency',
			currency: SAR_CURRENCY_CODE,
			currencyDisplay: 'narrowSymbol',
			maximumFractionDigits: 2,
			minimumFractionDigits: 0,
		});
		return formatter.format(amount);
	} catch {
		// Fallback to Arabic Rial sign if available, else SAR prefix
		const symbol = locale === 'ar' ? '﷼' : 'SAR';
		return locale === 'ar' ? `${Math.round(amount)} ${symbol}` : `${symbol} ${Math.round(amount)}`;
	}
}

export function formatCurrency(amount: number, locale: CurrencyLocale = 'ar'): string {
	return formatSar(amount, locale);
}


