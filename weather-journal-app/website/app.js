

/* Global Variables */

const zipCodeEl = document.getElementById('zip');
const dateEl = document.getElementById('date');
const feelingsCodeEl = document.getElementById('feelings');
const tempEl = document.getElementById('temp');
const contentEl = document.getElementById('content');
const apiKey ='&appid=69698a9c3bc7ec9fc653b0d5f14cb8f4&units=imperial';
const url = 'http://localhost:5000/';
document.getElementById('generate').addEventListener('click', onGenerate);
function consoleError(error) {
    console.error('Error => ' , error);
};

function onGenerate() {
    let data = {
        zipCode: zipCodeEl.value,
        content: feelingsCodeEl.value,
        date: new Date()
    };

    
    // post data for get zipcode
    getZipCode(data.zipCode).then(zipInfo => {

        if (zipInfo.cod != 200)
        return alert(zipInfo.message)

        data.temp = zipInfo.list[0].main.temp;
        postDate(data);
    }).catch(consoleError);
};

async function getZipCode(zipCode) {
    return (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()
}
async function postDate(data) {
    let response = await fetch(`${url}postData`, {
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data),
        method: 'POST',
    });
    try {
        response.json().then(data => {
            if (response.ok)
            updateUI();
            else
            alert('The command is not loaded');
        }).catch(consoleError);
    } catch (error) {
        console.log(error);
    }
}

async function updateUI() {
    let response = await fetch(`${url}all`);
    try {
        response.json().then(data => {
            dateEl.innerHTML = `Date Is: ${data.date}`;
            tempEl.innerHTML = `Temp Is: ${data.temp}`;
            contentEl.innerHTML = `Feelings Is: ${data.content}`;
        }).catch(consoleError);
    } catch (error) {
        console.log(error);
    }
}
