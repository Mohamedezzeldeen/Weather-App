// API Key
var apiKey = "df0dcbf9d1ae4f2bbe0173048241312";

// var for searching
var searchId = document.getElementById("searchId");
var findBtnId = document.getElementById("findBtnId");

// var for first day

var dateNameFirstDayId = document.getElementById("dateNameFirstDayId");
var dateNumFirstDayId = document.getElementById("dateNumFirstDayId");
var CountryId = document.getElementById("CountryId");
var FirstDayDegId = document.getElementById("FirstDayDegId");
var FirstDayIcone = document.getElementById("FirstDayIcone");
var firstDayWeatherCon = document.getElementById("firstDayWeatherCon");

// var for second day

var secondDayDateId = document.getElementById("secondDayDateId");
var secondDayIcone = document.getElementById("secondDayIcone");
var SecondDayMaxDeg = document.getElementById("SecondDayMaxDeg");
var SecondDayMinDeg = document.getElementById("SecondDayMinDeg");
var SecondDayWeatherCon = document.getElementById("SecondDayWeatherCon");

// var for Third day

var thirdDayDateId = document.getElementById("thirdDayDateId");
var thirdDayIcone = document.getElementById("thirdDayIcone");
var thirdDayMaxDeg = document.getElementById("thirdDayMaxDeg");
var thirdDayMinDeg = document.getElementById("thirdDayMinDeg");
var thirdDayWeatherCon = document.getElementById("thirdDayWeatherCon");

//******************************************************************************************************************\\

var getApi = async function theApi(location ="cairo") {
  try {
    var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=df0dcbf9d1ae4f2bbe0173048241312&q=${location}&days=3`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    var data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};




(async function () {
    await getApi().then((data)=>{
        if (data) {
            updateWeather(data)
        } else {
            console.log('No data received due to an error.');
        }
    })

})()



findBtnId.addEventListener("click", function () {
    var location = searchId.value
    
    if (location) {
        getApi(location).then((data) => {
          if (data) {
            updateWeather(data);
          } else {
            console.log('No data received due to an error.');
          }
        });
      } else {
        alert('Please enter a location.');
      }
})

function updateWeather(data) {
    var firstDay = data.forecast.forecastday[0];
    var secondDay = data.forecast.forecastday[1];
    var thirdDay = data.forecast.forecastday[2];

    console.log(data)
// get First Day Name And Date

    var getFirstDate = new Date (firstDay.date)
    var firstDayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(getFirstDate)
    var firstDayNumber = new Intl.DateTimeFormat("en-US", {  month: "long", day: "numeric", }).format(getFirstDate)

    dateNameFirstDayId.innerHTML = firstDayName
    dateNumFirstDayId.innerHTML = firstDayNumber

// get countr Name
CountryId.innerHTML = data.location.country

// get First Day Temp
FirstDayDegId.innerHTML = data.current.temp_c+"&deg;"+"C";

// get First Day Icone
FirstDayIcone.setAttribute("src", `http:${data.current.condition.icon}`)

// get First Day con
firstDayWeatherCon.innerHTML = data.current.condition.text

//******************************************************************************************\\

// get second Day Name And Date

var getSecondDate = new Date (secondDay.date)
var secondDayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(getSecondDate)

secondDayDateId.innerHTML = secondDayName

// get Second Day Icone
secondDayIcone.setAttribute("src", `http:${secondDay.day.condition.icon}`)

// get Second Day Temp
SecondDayMaxDeg.innerHTML = secondDay.day.maxtemp_c+"&deg;";
SecondDayMinDeg.innerHTML = secondDay.day.mintemp_c+"&deg;";


// get Second Day con
SecondDayWeatherCon.innerHTML = secondDay.day.condition.text


//******************************************************************************************\\


// thirdDay Name And Date

var getthirdDate = new Date (thirdDay.date)
var thirdDayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(getthirdDate)

thirdDayDateId.innerHTML = thirdDayName

// get Second Day Icone
thirdDayIcone.setAttribute("src", `http:${thirdDay.day.condition.icon}`)

// get Second Day Temp
thirdDayMaxDeg.innerHTML = thirdDay.day.maxtemp_c+"&deg;";
thirdDayMinDeg.innerHTML = thirdDay.day.mintemp_c+"&deg;";


// get Second Day con
thirdDayWeatherCon.innerHTML = thirdDay.day.condition.text

}


