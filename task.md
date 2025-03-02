```ts
//TODO
/* The goal of this project is to show the user the conversion rate between 2 currency pairs.
  The currency chosen on the left is the base currency and the currency chosen on the right is the target currency.
  The app starts at 1 USD = 1 USD.
  
  The API you need to use in this challenge is exchangerate-api.com.
  You can create a free account and browse the documentation.
  
  The free plan on this API allows you to perform 1,500 requests per month.
  Remember that every time you type in the editor, the browser preview will refresh,
  causing a new API request. In order not to exceed your limit, we recommend commenting out the
  fetch/FetchWrapper related code after you get it to work the first time. */

//Notes:
// Sign up for a free account on exchange <a href="https://www.exchangerate-api.com/">https://www.exchangerate-api.com/</a>
// Copy the example request
// Please check the documentation link, read Standard Requests documentation
// Sending a GET request to <a href="https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD">https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD</a>
// Above will give you exchange rate comapred to USD

// TODO: WRITE YOUR TYPESCRIPT CODE HERE

// A global variable that references the HTML select element with the id base-currency

// A global variable that references the HTML select element with the id target-currency

// A global variable that references the HTML paragraph element with the id conversion-result

// A global variable that stores the conversion rates for each currency pair as an array of arrays

// An instance of the FetchWrapper class with the base URL of the API

// A constant that stores the API key for authentication

// A call to the get method of the API instance with the endpoint that requests the latest conversion rates for the USD currency

// Assign the conversion_rates property of the response data to the rates variable

// Add an event listener to the base element that invokes the getConversionRates function when the user selects a new value

// base.addEventListener('change', getConversionRates);
// Add an event listener to the target element that invokes the getConversionRates function when the user selects a new value

// A function that performs the currency conversion and updates the UI

// Add event listeners to perform conversion when the user changes the base or target currency or the amount

// Iterate over the rates array and find the rate that matches the target currency value
// If the currency name matches the target currency value
// Assign the conversion rate to the textContent property of the result element, which displays it on the web page
```
