$(document).ready(function () {
    const $daily = $('.daily');
    const $fiveDay = $('.fiveDay');
    const $searchHistory = $('.searchHistory');
    const $cityBox = $('.cityBox');
    const $stateBox = $('.stateBox');
    const $submitBtn = $('.submitBtn');
    const apiKey = 'cb729ab815f55696fb5b98b5e8f340f6';
    
    $submitBtn.on('click', function () {
        let city = $cityBox.val().trim();
        let state = $stateBox.val().trim();
        dailyWeather(city, state);
        
    })

    function dailyWeather(city, state) {
        const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}`;
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);

                let name = response.name;
                let temp = response.main.temp;
                let icon = response.weather[0].icon;
                let windSpeed = response.wind.speed;
                let humidity = response.main.humidity;


                let $name = $('<p>').text(name).attr('class', 'name');
                let $temp = $('<p>').text(temp).attr('class', 'temp');
                let $icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${icon}.png`);
                let $windSpeed = $('<p>').text(windSpeed).attr('class', 'wind');
                let $humidity = $('<p>').text(humidity).attr('class', 'humidity');

                $daily.append($name);
                $daily.append($temp);
                $daily.append($icon);
                $daily.append($windSpeed);
                $daily.append($humidity);
                forcastFive(city, state);


            })
    }

    function forcastFive(city, state) {

        const fiveUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state}&appid=${apiKey}`;

        $.ajax({
            url: fiveUrl,
            method: "GET"
        })
            .then(function (response) {
                // console.log(response);
                // console.log(fiveUrl);
                // console.log(response.list.length);
                
                var list = response.list; 
                // console.log(list[10].main.temp);
                // for(let i = 0; i < list.length; i++){
                for (let i = 0; i <list.length; i++){
                //     let fiveCast = list[i].main;
                //    let temp = list[i].main.temp;
                //    let humidity = list[i].main.humidity;
                // //    let date = list[i].
                   
                   
                   
                    // console.log(list[i].main.humidity);
                    // console.log(fiveCast)
                }
            })
                
                
    }



});



//c (response.response.docs[i].headline.main)
// User puts city into input box
//user clicks on submit button
//api returns weather for city and provides a 5 day forcast
//I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//


//loop through array
//check the DT text value and if it === to what we are looking for then we will append all the data to our page.