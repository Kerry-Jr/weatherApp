$(document).ready(function () {
    const $daily = $('.daily');
    const $fiveDay = $('.fiveDay');
    const $searchHistory = $('.searchHistory');
    const $cityBox = $('.cityBox');
    const $stateBox = $('.stateBox');
    const $submitBtn = $('.submitBtn');
    const apiKey = 'cb729ab815f55696fb5b98b5e8f340f6';

    let timeDate = moment().format("LLLL")
    // $("#currentDay").text(timeDate);



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
                // console.log(response);
                // console.log(queryUrl);
                let name = response.name;
                let temp = response.main.temp;
                let icon = response.weather[0].icon;
                let windSpeed = response.wind.speed;
                let humidity = response.main.humidity;
                let lat = response.coord.lat;
                let lon = response.coord.lon;

                let $name = $('<h3>').text(name).attr('class', 'name');
                let $temp = $('<p>').text(temp).attr('class', 'temp');
                let $icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${icon}.png`);
                let $windSpeed = $('<p>').text(windSpeed).attr('class', 'wind');
                let $humidity = $('<p>').text(humidity).attr('class', 'humidity');
                
                $daily.append($name);
                $daily.append($icon);
                $daily.append($temp);
                $daily.append($windSpeed);
                $daily.append($humidity);
                
                forcastFive(city, state);
                uvIndex(lat,lon);
            })
    }

    function uvIndex(lat,lon) {
        const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

        $.ajax({
            url: uvUrl,
            method: "GET"
        })
            .then(function (response){
               let uvIndex = response.value;
               let $uvIndex = $('<p>').text(uvIndex).attr('class', 'uvIdx');
            
                $daily.append($uvIndex);
                
                dailyWeather();
                
                //forcastFive(city, state);
            })



    }

    function forcastFive(city, state) {
        const fiveUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state}&appid=${apiKey}`;

        $.ajax({
            url: fiveUrl,
            method: "GET"
        })
            .then(function (response) {

                var list = response.list;
                for (let i = 0; i < list.length; i++) {
                    let rawDate = list[i].dt_txt;
                    let date = moment(rawDate).format('H');

                    if (date === '12') {
                        let temp = list[i].main.temp
                        // let calcTemp = (temp - 273.15) * 1.80 + 32;
                        // let tempF = Math.floor(calcTemp);
                        
                        // console.log(temp);
                        let humidity = list[i].main.humidity;
                        let icon = list[i].weather[0].icon;

                        let $temp = $('<p>').text(temp).attr('class', 'temp');
                        // let $date = $('<p>').text(date).attr('class', 'date');
                        let $humidity = $('<p>').text(humidity).attr('class', 'humidity');
                        let $icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${icon}.png`).attr('class', 'weatherImg');

                        let $divEl = $('<div>').attr('class', 'card');
                        
                        $divEl.append($icon);
                        $divEl.append($temp);
                        $divEl.append($humidity);
                        // $divEl.append($date);
                        
                        $fiveDay.append($divEl);
                        

                        
                        // console.log(tempF);
                    }


                }
            })


    }



});
