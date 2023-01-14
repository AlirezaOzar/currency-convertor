const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i = 0; i < dropList.length; i++){
    for(currency_code in country_list){
        // selecting USD by default as FROM currency and NPR as 10 currency
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "EUR" ? "selected" : "";
        }
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting option tag inside select tag 
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change" , (e) =>{
      loadFlag(e.target); // calling loadflag with passing target element as an argument
    });
}

function loadFlag(element){
  for(code in country_list){
    if(code == element.value){ // if currency code of country list is equal to option value
        let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
    }
  }
}

window.addEventListener("onload", () => {
    getExchangeRate();
});


getButton.addEventListener("click", (e) => {
    e.preventDefault(); // preventing from from submiting
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    // if user dont enter any value or enter 0 then we''ll put 1 value by default in input field 
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate..."
    let url = ` https://v6.exchangerate-api.com/v6/eb0e7289d29d55ad51c1b939/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj  
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }); 
}