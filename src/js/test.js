
fetch(`${this.url}lat=${this.state.city.lat}&lon=${this.state.city.lng}${this.apikey}`)
    .then (response =>response.json())
    .then (weatherData =>{
        this.state.timezoneOffset = weatherData.timezone_offset;
        this.state.forecast=weatherData.daily;
        if (this.state.forecast.length==8){
          this.state.forecast.splice(7,1);
        };
        this.zipInputElement.value="";
        this.renderWeatherList();
    })
.catch(error => {
    alert('There was a problem getting location information!')
}
);