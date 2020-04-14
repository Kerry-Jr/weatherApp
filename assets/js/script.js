$(document).ready(function () {
    const $daily = $('.daily');
    const $fiveDay = $('.fiveDay');
    const $searchHistory = $('.searchHistory');
    const $cityBox = $('.cityBox');
    const $stateBox = $('.stateBox');
    const $submitBtn = $('.submitBtn');
    const apiKey = 'cb729ab815f55696fb5b98b5e8f340f6';
    
    onload();
    
    const $refreshBtn = $('.refresh');
    
    let timeDate = moment().format("LLLL")

    $submitBtn.on('click', function () {
        let city = $cityBox.val().trim();
        let state = $stateBox.val().trim();

        savedHistory(city, state); 
        dailyWeather(city, state);      
    })

    
    
    $refreshBtn.on('click', function (){
        let savedCity = $('.refresh').attr('data-city');
        let savedState = $('.refresh').attr('data-state');
        
        
        dailyWeather(`${savedCity}, ${savedState}`);
        forcastFive(savedCity, savedState);
    })

    function onload() {
        let searchedHistory = JSON.parse(localStorage.getItem('history')) || [];
        if (localStorage.getItem('history') == null) {
            console.log('no weather history found...sorry');
            return;
        } else {
            for (let i = 0; i < searchedHistory.length; i++) {
                console.log(searchedHistory[i]);
                let name = $('<button>');
                name.addClass('btn btn-info btn-block history');
                name.addClass('refresh');
                name.text(`${searchedHistory[i].cityname}, ${searchedHistory[i].statename}`);
                name.attr('data-city', searchedHistory[i].cityname)
                name.attr('data-state', searchedHistory[i].statename)
                $searchHistory.append(name);
                
            }
        }
    }



    // give a custom class to each button ,
    // put a click listen on that class ,
    // onclick grab city and state values from data atrributes ,and pass them to get weather function as args.



    function savedHistory(city, state) {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        let cityState = {
            cityname: city,
            statename: state
        }
        history.push(cityState);
        localStorage.setItem('history', JSON.stringify(history));
    }

    function dailyWeather(city, state) {
        const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}`;
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {

                let name = response.name;
                let temp = response.main.temp;
                let icon = response.weather[0].icon;
                let windSpeed = response.wind.speed;
                let humidity = response.main.humidity;
                let lat = response.coord.lat;
                let lon = response.coord.lon;

                let $name = $('<h3>').text(name).attr('class', 'name');
                let $temp = $('<p>').text(`Temp: ${temp}`).attr('class', 'temp');
                let $icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${icon}.png`);
                let $windSpeed = $('<p>').text(`Wind: ${windSpeed}`).attr('class', 'wind');
                let $humidity = $('<p>').text(`Humidity: ${humidity}`).attr('class', 'humidity');

                $daily.append($name);
                $daily.append($icon);
                $daily.append($temp);
                $daily.append($windSpeed);
                $daily.append($humidity);

                uvIndex(lat, lon);

                forcastFive(city, state);

            })
    }

    function uvIndex(lat, lon) {
        const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

        $.ajax({
            url: uvUrl,
            method: "GET"
        })
            .then(function (response) {
                let uvIndex = response.value;
                let $uvIndex = $('<p>').text(uvIndex).attr('class', 'uvIdx');

                $daily.append($uvIndex);

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
                        let humidity = list[i].main.humidity;
                        console.log(humidity);
                        console.log(temp);
                        let icon = list[i].weather[0].icon;

                        let $temp = $('<p>').text(temp).attr('class', 'temp');
                        let $humidity = $('<p>').text(humidity).attr('class', 'humidity');
                        let $icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${icon}.png`).attr('class', 'weatherImg');
                        let $divEl = $('<div>').attr('class', 'card');

                        $divEl.append($icon);
                        $divEl.append($temp);
                        $divEl.append($humidity);

                        $fiveDay.append($divEl);
                    }
                }
            })
    }
});