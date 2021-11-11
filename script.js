var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var pinIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46,56],
    iconAnchor: [23, 56], 
});


const ipInput = document.getElementById('ipBar');
const ipBtn = document.getElementById('find');
// const ipBar = document.getElementById('ipBar');
// const findIp =document.getElementById('find')


const resultIp = document.getElementById('result-ip');
const resultIsp = document.getElementById('ip-isp');
const resultLocation = document.getElementById('iplocation');
const resultTimezone = document.getElementById('ipTimezone');
const resultError = document.getElementById('ip-error');

// Manually  searching for an IP address

// findIp.onclick = () => {
//     const ipSearch = ipBar.value;

// }


//Calls API on local IP on page load
window.addEventListener('load', function() {
    fetch('https://geo.ipify.org/api/v1?apiKey=at_W3Nl2LwzmQ82hymwXDRSt6MyAR3mB&ipAddress=')
    .then (response => response.json())
    .then (function(response) {
        ipForm(response);
    })
})


ipBtn.addEventListener('click', e => {
    fetch('https://geo.ipify.org/api/v1?apiKey=at_W3Nl2LwzmQ82hymwXDRSt6MyAR3mB&ipAddress=' + ipInput.value)
    .then (response => response.json())

    .then (function(response) {
        ipForm(response);
    })

    .catch(error => {
       
        resultError.innerHTML = "Please check your IP address. There has been an error. " + error;
    });
})



function ipForm(response) {
    console.log(response);
    resultIp.innerHTML = response.ip;
    resultLocation.innerHTML = response.location.city + ", " + response.location.country + ", " + response.location.postalCode;
    resultTimezone.innerHTML = response.location.timezone;
    resultIsp.innerHTML = response.isp;

    //Adds marker on IP location and animates to it
    L.marker([response.location.lat, response.location.lng], {icon: pinIcon}).addTo(map);
    map.flyTo([response.location.lat, response.location.lng], 13);
}













