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

  private async _send(method: string, endpoint: string, body: any): Promise<any> {
    try {
      const response = await fetch(this.baseURL + endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error with ${method} request:`, error);
      throw error;
    }
  }

  put(endpoint: string, body: any): Promise<any> {
    return this._send("PUT", endpoint, body);
  }

  post(endpoint: string, body: any): Promise<any> {
    return this._send("POST", endpoint, body);
  }

  delete(endpoint: string, body: any): Promise<any> {
    return this._send("DELETE", endpoint, body);
  }
}

// Selecting elements safely

const baseCurrencyElement = document.getElementById("base-currency") as HTMLSelectElement | null;
const targetCurrencyElement = document.getElementById("target-currency") as HTMLSelectElement | null;
const conversionResult = document.getElementById("conversion-result") as HTMLParagraphElement | null;
const amountElement = document.getElementById("amount") as HTMLInputElement | null;



// Ensure targetAmountElement is disabled
// if (targetAmountElement) {
//   targetAmountElement.setAttribute("disabled", "true");
// }

// Store conversion rates globally
let conversionRates: Record<string, number> = {};

const api = new FetchWrapper(
  "https://v6.exchangerate-api.com/v6/4ca6d8a5a7c1845e205b54ef/latest/"
);

async function fetchExchangeRates(baseCurrency: string) {
  console.log(`fetchExchangeRates called with baseCurrency: ${baseCurrency}`);

  try {
    const response = await fetch(api.baseURL + baseCurrency);
    console.log("Fetch request sent:", api.baseURL + baseCurrency);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);

    if (data.conversion_rates) {
      conversionRates = data.conversion_rates;
      console.log("Updated exchange rates:", conversionRates);
      updateConversionResult();
    } else {
      console.error("❌ API response does not contain conversion rates:", data);
    }
  } catch (error) {
    console.error("❌ Error fetching exchange rates:", error);
  }
}

function updateConversionResult() {
  if (!conversionRates || Object.keys(conversionRates).length === 0) {
    console.warn("Skipping update: Conversion rates not available yet.");
    return;
  }

  const baseCurrencyElement = document.getElementById("base-currency") as HTMLSelectElement;
  const targetCurrencyElement = document.getElementById("target-currency") as HTMLSelectElement;
  const resultElement = document.getElementById("conversion-result") as HTMLParagraphElement;

  if (!baseCurrencyElement || !targetCurrencyElement || !resultElement) {
    console.error("One or more elements are missing in the DOM.");
    return;
  }

  const base = baseCurrencyElement.value;
  const target = targetCurrencyElement.value;

  if (conversionRates[target]) {
    const rate = conversionRates[target];
    resultElement.textContent = `1 ${base} = ${rate.toFixed(4)} ${target}`;
  } else {
    resultElement.textContent = `Exchange rate for ${target} not found.`;
  }
}

function performConversion() {
  if (!conversionRates || Object.keys(conversionRates).length === 0) {
    console.warn("Conversion rates not available yet.");
    return;
  }

  if (baseCurrencyElement && targetCurrencyElement && amountElement && conversionResult) {
    const baseCurrency = baseCurrencyElement.value;
    const targetCurrency = targetCurrencyElement.value;
    const amount = parseFloat(amountElement.value);

    if (isNaN(amount)) {
      conversionResult.textContent = "Please enter a valid amount.";
      return;
    }

    if (conversionRates[targetCurrency]) {
      const rate = conversionRates[targetCurrency];
      const convertedAmount = amount * rate;
      conversionResult.textContent = `${amount} ${baseCurrency} = ${convertedAmount.toFixed(4)} ${targetCurrency}`;
    } else {
      conversionResult.textContent = `Exchange rate for ${targetCurrency} not found.`;
    }
  }
}

// Attach event listeners safely
baseCurrencyElement?.addEventListener("change", () => {
  if (baseCurrencyElement) {
    fetchExchangeRates(baseCurrencyElement.value);
  }
});

targetCurrencyElement?.addEventListener("change", updateConversionResult);
amountElement?.addEventListener("input", performConversion);
document.addEventListener("DOMContentLoaded", () => {
  const baseCurrencyElement = document.getElementById("base-currency") as HTMLSelectElement;
  if (baseCurrencyElement) {
    fetchExchangeRates(baseCurrencyElement.value);
  }
});
// fetchExchangeRates("USD");