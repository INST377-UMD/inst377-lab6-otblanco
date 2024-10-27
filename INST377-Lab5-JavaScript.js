// Fetch the list of currencies on page load and populate the dropdowns
window.onload = async function() {
    const response = await fetch('https://api.frankfurter.app/currencies');
    const currencies = await response.json();
  
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
  
    // Populate both dropdowns
    for (const [code, name] of Object.entries(currencies)) {
      const option1 = new Option(name, code);
      const option2 = new Option(name, code);
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }
  };
  
  // Handle form submission
  document.getElementById('currency-form').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;
  
    // Check if the from and to currencies are the same
    if (fromCurrency === toCurrency) {
      alert('Please select different currencies for conversion.');
      return;
    }
  
    // Fetch the conversion rate and calculate the converted amount
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
    const result = await response.json();
  
    const rate = result.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
  
    // Display the result
    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  });
  