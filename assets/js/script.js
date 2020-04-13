$(document).ready(function () {
    const $daily = $('.daily');
    const $fiveDay = $('.fiveDay');
    const $searchHistory = $('.searchHistory');
    const $cityBox = $('.cityBox');
    const $stateBox = $('.stateBox');
    const $submitBtn = $('.submitBtn');
    const apiKey = 'cb729ab815f55696fb5b98b5e8f340f6';
    
     let placesArr = [];

    // onload();

    let timeDate = moment().format("LLLL")
    

        $submitBtn.on('click', function () {
        let city = $cityBox.val().trim();
        let state = $stateBox.val().trim();
        
       
        // let placesArr = []; // this is the original place I had it -
       
        placesArr.push(city);
        placesArr.push(state);
        var savedHistory = JSON.stringify(placesArr);
        // // console.log(savedHistory);
        var setHistory = localStorage.setItem('history', placesArr);
            
        
        let getHistory = JSON.stringify(localStorage.getItem('history'));
        if(localStorage.getItem('history') == null) {
            console.log('no history found');
            return;
        } else {
            for (var i = 0; i < savedHistory.length; i++);{
                 let $tiles = $('<div>');
            console.log(savedHistory[i]);
            }
           
        }
        // $searchHistory.append(getHistory);
       
        
      
    //    onload();
          dailyWeather(city, state);
          
    //    renderWeatherHistory();
    //    console.log(placesArr);
    })
// 
     
        // function onload(){
        //    let searchedHistory = JSON.stringify(localStorage.getItem('history','')) || [];
        //     if (localStorage.getItem('history') == null) {
        //         console.log('no history found');
        //         return;
        //      }else {
        //        for(i = 0; i < searchedHistory.length; i++);{
        //             let $tiles = $('<button>').attr('class', 'btn btn-primary');
        //         // let $historyBtn = $('<button>').attr('class',' btn btn-success btn-lg btn-block');
        //         console.log($searchHistory[i]);
                
                
        //         $searchHistory.append($tiles);
        //        }
                
                
               

        //     }
        // }




            //function onload() {
//         let searchedHistory = JSON.parse(localStorage.getItem('history')) || [];
//         if(localStorage.getItem('history') == null) {
//             console.log('no weather history found...sorry');
//             return;
//         }else {
//             for (let i = 0; i < searchedHistory.length; i++) {
//                 console.log(searchedHistory[i]);
//                 let name = $('<li>');
//                 name.addClass('list-group-item');
//                 name.text(searchedHistory[i]);
//                 $fiveDay.appendChild(name);
//             }
//         }
//     }



    
//     function renderWeatherHistory (){
//         let searchHistory = JSON.stringify(localStorage.getItem('history')) || [];
//         let placesArr = [];
//         searchHistory.push(placesArr);
//         localStorage.setItem('history',searchHistory);
//   }

    
    
    
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
                let $temp = $('<p>').text(`Temp: ${temp}`).attr('class', 'temp');
                let $icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${icon}.png`);
                let $windSpeed = $('<p>').text(`Wind: ${windSpeed}`).attr('class', 'wind');
                let $humidity = $('<p>').text(`Humidity: ${humidity}`).attr('class', 'humidity');
                
                $daily.append($name);
                $daily.append($icon);
                $daily.append($temp);
                $daily.append($windSpeed);
                $daily.append($humidity);
                
                uvIndex(lat,lon);
                // onload();
                forcastFive(city, state);
               
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

//   onload();

}); 

// let placesArr = [];
        // placesArr.push(city);
        // placesArr.push(state);
        // let savedHistory = JSON.stringify(placesArr);
        // // console.log(savedHistory);
        // let setHistory = localStorage.setItem('history', placesArr);