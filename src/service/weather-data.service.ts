import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class WeatherDataService {

  constructor(private http: HttpClient) { }

  getWeatherData(city: any) {
    let url = 'http://api.weatherapi.com/v1/current.json?key=1571ce14548f4ce093635332222207&q="city"&aqi=no';
    url = url.replace("city", city);
    return this.http.get(url);
  }
}
