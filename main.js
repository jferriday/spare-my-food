
// Request food banks from givefood API
async function getBanks(){
    const endpoint = "https://www.givefood.org.uk/api/2/foodbanks/search/?address="
    
    const postcode = document.getElementById('postcode').value;
    if (postcode == ""){
        throw new Error('No post code');
    } else {
    const url = endpoint + postcode;
    return (await fetch(url)).json()
    }
}
// get the list of foodbanks and call updateHTML
async function getBankList() {
    try{
        const bankList = await getBanks();
        updateHTML(bankList);
    }catch (e){
        console.log('Error: ', e);
    }
}

function updateHTML(bankList){
    // get the properties of the nearest food bank
    console.log(bankList);
    const bank = bankList[0] // potentially offer ability to increment this to view banks further away
    const name = bank.name;
    const distance = bank.distance_mi;
    const date = new Date(bank.needs.found);
    const dateText = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    const needs = bank.needs.needs;

    console.log(name);
    console.log(distance);
    console.log(needs)
    console.log(dateText);
    
    const nameField = document.getElementById('bank-name');
    const distField = document.getElementById('bank-distance');
    const addField = document.getElementById('bank-address')
    const needsList = document.getElementById("items-needed");
    
    nameField.innerHTML = name;
    distField.innerText = distance + " miles away";

    // populate needs list with needs added as list entries
    let needsArr = needs.split("\n")
    needsArr.forEach(element => {
        needsList.innerHTML += `<li> ${element}</li>`
    });

}


// prevent submission from refreshing the page:
const searchForm = document.getElementById('search')
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    getBankList();
})


const submit = document.getElementById('submit');


