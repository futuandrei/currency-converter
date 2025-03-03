// <reference types="vite/client" />
const API_KEY = import.meta.env.VITE_API_KEY;

interface Data {
  conversion_rates: Record<string, number>;
}

class FetchWrapper {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(endpoint: string): Promise<Data> {
    try {
      const response = await fetch(this.baseURL + endpoint);
      console.log("Fetch status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

// ✅ **Select elements from `index.html`**
const baseCurrencyElement = document.getElementById("base-currency") as HTMLSelectElement | null;
const targetCurrencyElement = document.getElementById("target-currency") as HTMLSelectElement | null;
const conversionResult = document.getElementById("conversion-result") as HTMLParagraphElement | null;
const baseAmountElement = document.getElementById("base-amount") as HTMLInputElement | null;
const targetAmountElement = document.getElementById("target-amount") as HTMLInputElement | null;

// ✅ **Ensure `targetAmountElement` is disabled**
targetAmountElement?.setAttribute("disabled", "true");

// ✅ **Store conversion rates globally**
let conversionRates: Record<string, number> = {};

// ✅ **Initialize API Wrapper**
const api = new FetchWrapper(
  `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`
);

// ✅ **Fetch Exchange Rates for the Selected Base Currency**
async function fetchExchangeRates(baseCurrency: string) {
  // console.log(`fetchExchangeRates called with baseCurrency: ${baseCurrency}`);

  try {
    const response = await fetch(api.baseURL + baseCurrency);
    // console.log("Fetch request sent:", api.baseURL + baseCurrency);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("API response:", data);

    if (data.conversion_rates) {
      conversionRates = data.conversion_rates;
      // console.log("Updated exchange rates:", conversionRates);
      updateConversionResult();
    } else {
      // console.error("❌ API response does not contain conversion rates:", data);
    }
  } catch (error) {
    // console.error("❌ Error fetching exchange rates:", error);
  }
}

// ✅ **Update Conversion Result in UI**
function updateConversionResult() {
  if (!conversionRates || Object.keys(conversionRates).length === 0) {
    // console.warn("Skipping update: Conversion rates not available yet.");
    return;
  }

  if (baseCurrencyElement && targetCurrencyElement && conversionResult) {
    const base = baseCurrencyElement.value;
    const target = targetCurrencyElement.value;

    if (conversionRates[target]) {
      const rate = conversionRates[target];
      conversionResult.textContent = `1 ${base} = ${rate.toFixed(4)} ${target}`;

      // Convert amount if input is filled
      performConversion();
    } else {
      conversionResult.textContent = `Exchange rate for ${target} not found.`;
    }
  }
}

// ✅ **Perform Currency Conversion**
function performConversion() {
  if (!conversionRates || Object.keys(conversionRates).length === 0) {
    console.warn("Conversion rates not available yet.");
    return;
  }

  if (baseCurrencyElement && targetCurrencyElement && baseAmountElement && targetAmountElement) {
    // const baseCurrency = baseCurrencyElement.value;
    const targetCurrency = targetCurrencyElement.value;
    const amount = parseFloat(baseAmountElement.value);

    if (isNaN(amount) || amount <= 0) {
      targetAmountElement.value = "";
      return;
    }

    if (conversionRates[targetCurrency]) {
      const rate = conversionRates[targetCurrency];
      const convertedAmount = amount * rate;
      targetAmountElement.value = convertedAmount.toFixed(4);
    } else {
      targetAmountElement.value = "";
    }
  }
}

// ✅ **Attach Event Listeners**
baseCurrencyElement?.addEventListener("change", () => {
  if (baseCurrencyElement) {
    fetchExchangeRates(baseCurrencyElement.value);
  }
});

targetCurrencyElement?.addEventListener("change", updateConversionResult);
baseAmountElement?.addEventListener("input", performConversion);

// ✅ **Fetch Exchange Rates on Page Load**
document.addEventListener("DOMContentLoaded", () => {
  if (baseCurrencyElement) {
    fetchExchangeRates(baseCurrencyElement.value);
  }
});