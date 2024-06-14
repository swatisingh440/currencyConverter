const baseUrl='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
 
const dropdowns=document.querySelectorAll('.dropdown select');
const btn=document.querySelector('button')
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
const msg=document.querySelector('.msg')
for (let select of dropdowns){
    
    for(currcode in countryList){
        let newOption=document.createElement('option');
        
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==='from' && currcode==='USD'){
            newOption.selected='selected'
        }
        else if(select.name==='to' && currcode==='INR'){
            newOption.selected='selected'
        }
        select.append(newOption)

    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target)
    })
}
const updateFlag=(ele)=>{
    console.log(ele)
    let currcode=ele.value;
    let countryCode=countryList[currcode];
    let newSrcLink=`https://flagsapi.com/${countryCode}/flat/64.png`;

    let img=ele.parentElement.querySelector('img');
    img.src=newSrcLink
    console.log(img)

}
btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();
    updateExchangeRate()
})
const updateExchangeRate=async ()=>{
    let amount=document.querySelector('form input');
    let amtVal=amount.value;
    console.log(amtVal);
    if(amtVal==='' || amtVal<1){
        amtVal=1;
        amount.value='1';
    }
    console.log(fromCurr,toCurr)
    const URL=`${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL)
    console.log(response)
    let data=await response.json();
    console.log(data)
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    console.log(rate);
    let finalAmount=amtVal*rate;
   msg.innerText=`${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`
}

window.addEventListener('load',()=>{
    updateExchangeRate()
})