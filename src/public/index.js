
const addressForm = document.getElementById('address-form');

const submitCallback = (event) => {
  event.preventDefault()
  const startAddress = document.getElementById('start').value
  const endAddress = document.getElementById('end').value
  console.log(startAddress, endAddress)
  axios.post('http://localhost:3000/afterTaxi/getPrices', {startAddress, endAddress})
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}

if(addressForm.addEventListener){
    addressForm.addEventListener("submit", submitCallback, false);  //Modern browsers
}else if(addressForm.attachEvent){
    addressForm.attachEvent('onsubmit', submitCallback);            //Old IE
}