let container = document.getElementById("container");
let searchForm = document.getElementById("search_submit");
let searchInput = document.getElementById("search_input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");

//Declarar funciones secundarias
const displayBackgroundImage = (obj)=>{

    let dateSpanish = new Date(obj.list[1].dt*1000).toLocaleString("uy-UY",{
        timeStyle: "short",
        dateStyle: "long"
    });
    console.log(dateSpanish); 

    date.textContent = `Actualización ${dateSpanish}`

    const dayHour = new Date(obj.list[1].dt*1000).getHours();
    console.log(dayHour);

    if( dayHour >6 && dayHour <18){
        container.classList.remove("night");
        container.classList.add("day")
    } else{
        container.classList.remove("day");
        container.classList.add("night")
    }
}

const displayData =(obj)=>{
    console.log(obj)
    temperatureDegrees.textContent = Math.floor(obj.list[0].main.temp);
    timeZone.textContent = obj.list[0].name;
    const icon = obj.list[0].weather[0].icon;
    weatherIcon.innerHTML = `<img src='icons/${icon}.png'></img>`
    min.textContent = Math.floor(obj.list[0].main.temp_min);
    max.textContent = Math.floor(obj.list[0].main.temp_max);
    temperatureDescription.textContent = obj.list[0].weather[0].description.charAt(0).toUpperCase()+
    obj.list[0].weather[0].description.slice(1);
}

//Declarara getWeatherData
const getWeatherData = async(city)=>{

    const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=sp`, {
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "f154d8ce0bmshfa70825142c57f3p195145jsnaadfdee8233f"
        }})
    const data = await res.json();
        console.log(data);
    displayBackgroundImage(data);
    displayData(data);
}

searchForm.addEventListener("submit", e=>{
    e.preventDefault();
    getWeatherData(searchInput.value)
})

//Cargar ciudad por defecto
window.onload = ()=>{
    getWeatherData("Montevideo");
}