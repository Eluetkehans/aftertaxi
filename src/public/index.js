
const addressForm = document.getElementById('address-form');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const submitCallback = (event) => {
  event.preventDefault()
  const startAddress = document.getElementById('start').value
  const endAddress = document.getElementById('end').value

  axios.post('http://localhost:3000/afterTaxi/getPrices', {startAddress, endAddress})
    .then((res) => {
      const resultsContainer = document.getElementById("results")

      res.data.forEach(({serviceName, costMin, costMax}) => {
        
        const span = document.createElement('span');
        span.innerHTML = `After ${serviceName}: ${formatter.format(costMin / 100)} - ${formatter.format(costMax / 100)}`;
    
        resultsContainer.appendChild(span)
        resultsContainer.appendChild(document.createElement('br'))
      })
    })
    .catch((err) => console.error(err))
}

if(addressForm.addEventListener){
    addressForm.addEventListener("submit", submitCallback, false);  //Modern browsers
}else if(addressForm.attachEvent){
    addressForm.attachEvent('onsubmit', submitCallback);            //Old IE
}