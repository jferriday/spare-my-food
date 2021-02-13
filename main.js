
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

function updateHTML(bankList, bankIndex){
    // get the properties of the nearest food bank
    console.log(bankList);
    console.log('Bank index: ', bankIndex);
    const bank = bankList[bankIndex] // potentially offer ability to increment this to view banks further away
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

// Functions to cycle forward or back through nearby food banks
let bankIndex = 0; // initialise bank index to zero when page loads
const incrementBank = () => {
    bankIndex < 9 ? bankIndex +=1 : bankIndex = bankIndex;
    updateHTML(bankIndex);
}

const decrementBank = () => {
    bankIndex > 0 ? bankIndex -=1 : bankIndex = 0;
    updateHTML(bankIndex);
}




// Buttons
const submit = document.getElementById('submit');
const previous = document.getElementById('previous');
const nextButton = document.getElementById('next')

// Event listener for submit button
const searchForm = document.getElementById('search')
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault(); // prevent submission from refreshing the page:
    bankIndex = 0 // reset bank index to zero for new search
    getBankList();
})


// Event listeners for next and previous buttons
previous.addEventListener('click', decrementBank);

nextButton.addEventListener('click', incrementBank);





