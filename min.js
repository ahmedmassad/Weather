

const dataWe = document.querySelector("#weekday")
const dataManth = document.querySelector("#manth")
const dataCity = document.querySelector(".city")
const todayTemp = document.querySelector(".today-temp")
const imgData = document.querySelector(".img-data")
const toConidt = document.querySelector(".to-conidt")
const umberella = document.querySelector(".umberella")
const wind = document.querySelector(".wind")
const compass = document.querySelector(".compass")

//next day

const nextWeekday= document.querySelectorAll(".next-weekday")
const nextimg= document.querySelectorAll(".next-img")
const nextTemp= document.querySelectorAll(".next-temp")
const smTemp = document.querySelectorAll(".sm-temp")
const nextCondth = document.querySelectorAll(".next-condth")




//search

const search = document.querySelector("#search")


// date

// let todyNema = new Date()

// console.log(todyNema .getDate())
// console.log(todyNema .toLocaleDateString("en-us",{weekday:"long"}))
// console.log(todyNema.toLocaleDateString("en-us",{month:"long"}))


console.log(dataWe)


async function getWeather(city){
  const weatr = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e25f733af3bc40449eb165702240507&q=${city}&days=3`)
  const data = await weatr.json()
 return data
}




 function displayToday( data){
   let  myData =  data

      let todyNema =  new  Date()
      dataWe.innerHTML = `${ todyNema.toLocaleDateString("eu-us",{weekday:"long"})}`
      dataManth.innerHTML = `${todyNema.getDate()} ${  todyNema.toLocaleDateString("en-us",{month:"long"})}`
  dataCity.innerHTML=`${myData.location.name}`
  todayTemp.innerHTML=`${myData.current.temp_c}&deg;C` 
  imgData.setAttribute("src",myData.current.condition.icon)
  toConidt.innerHTML=`${myData.current.condition.text}`
  umberella.innerHTML=`${myData.current.humidity}%`
  wind.innerHTML=`${myData.current.wind_mph} km/h`
  compass.innerHTML=`${myData.current.wind_dir}`


   
}


function displayNextDay(data){

let myData = data.forecast.forecastday
 for(let i = 0 ; i< 2 ; i++  ){
   let nextdate =  new  Date(myData[i+1].date)
   nextWeekday[i].innerHTML = `${nextdate.toLocaleDateString("eu-us",{weekday:"long"})}`
   nextimg[i].setAttribute("src",myData[i+1].day.condition.icon)
   nextTemp[i].innerHTML=`${myData[i+1].day.maxtemp_c}&deg;C`
   smTemp[i].innerHTML=`${myData[i+1].day.mintemp_c}&deg;C`
   nextCondth[i].innerHTML=`${myData[i+1].day.condition.text}`
 }

}


async function startapp(city = "Cairo") {
   

   let myData =   await getWeather(city)
  
   if(!myData.error){
      displayToday(myData)
      displayNextDay(myData)
   }else{
      console.error(myData.error.message)
   }
}



search.addEventListener("input", ()=>{
   startapp(search.value)

} )



startapp()







