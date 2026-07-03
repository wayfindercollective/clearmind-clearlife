export type Country = {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  minDigits?: number;
  maxDigits?: number;
};

// US + UK pinned to the top (primary audience), then alphabetical common list.
export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸", minDigits: 10, maxDigits: 10 },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧", minDigits: 10, maxDigits: 10 },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺", minDigits: 9, maxDigits: 9 },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦", minDigits: 10, maxDigits: 10 },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪", minDigits: 9, maxDigits: 9 },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿", minDigits: 8, maxDigits: 10 },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪", minDigits: 9, maxDigits: 9 },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹", minDigits: 10, maxDigits: 13 },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪", minDigits: 9, maxDigits: 9 },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷", minDigits: 10, maxDigits: 11 },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭", minDigits: 9, maxDigits: 9 },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪", minDigits: 10, maxDigits: 11 },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰", minDigits: 8, maxDigits: 8 },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸", minDigits: 9, maxDigits: 9 },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮", minDigits: 9, maxDigits: 10 },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷", minDigits: 9, maxDigits: 9 },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰", minDigits: 8, maxDigits: 8 },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳", minDigits: 10, maxDigits: 10 },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹", minDigits: 9, maxDigits: 10 },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽", minDigits: 10, maxDigits: 10 },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱", minDigits: 9, maxDigits: 9 },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴", minDigits: 8, maxDigits: 8 },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹", minDigits: 9, maxDigits: 9 },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪", minDigits: 9, maxDigits: 10 },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬", minDigits: 8, maxDigits: 8 },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦", minDigits: 9, maxDigits: 9 },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];
