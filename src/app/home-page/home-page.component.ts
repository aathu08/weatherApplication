import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { WeatherDataService } from 'src/service/weather-data.service';
import canadaCities from '../../assets/json/citiesInCanada.json';
import usaCities from '../../assets/json/citiesInUSA.json';
import ukCities from '../../assets/json/citiesInUK.json';
import uaeCities from '../../assets/json/citiesInUAE.json';
import indianCities from '../../assets/json/citiesInIndia.json';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  cityList: any;
  isCollapsed = false;
  data: any;
  weatherData: any;
  countryName: any;
  countryId: any;
  selectedCountry: any;
  @ViewChild('selectedCity') selectedCity!: ElementRef;
  city: any;
  longitude: any;
  latitude: any;
  celsiusTemp: any;
  farenheitTemp: any;
  weatherCondition: any;
  showDiv: boolean = false;
  imgDefault: any;

  constructor(private weatherDataService: WeatherDataService) { }

  ngOnInit() {
  }

  changeImage(option: string) {
    if (option.includes('cloud')) {
      this.imgDefault = 'imgChange1';
    }
    else if (option.includes("mist")) {
      this.imgDefault = 'imgChange2';
    }
    else if (option.includes("rain")) {
      this.imgDefault = 'imgChange3';
    }
    else if (option.includes("Sunny")) {
      this.imgDefault = 'imgChange4';
    }
    else if (option.includes("wind")) {
      this.imgDefault = 'imgChange5';
    } else {
      this.imgDefault = 'imgChange6';
    }
  }

  getCityNamesBasedOnCountrySelected(countryId: string) {
    if (countryId === 'can') {
      this.cityList = canadaCities.citiesInCanada.cities.map(t => t);
    } else if (countryId === 'us') {
      this.cityList = usaCities.citiesInUSA.cities.map(t => t);
    } else if (countryId === 'uk') {
      this.cityList = ukCities.citiesInUK.cities.map(t => t);
    } else if (countryId === 'uae') {
      this.cityList = uaeCities.citiesInUAE.cities.map(t => t);
    } else {
      this.cityList = indianCities.citiesInIndia.cities.map(t => t);
    }
  }

  onSelected() {
    this.city = this.selectedCity.nativeElement.value;
    const url = this.weatherDataService.getWeatherData(this.city).subscribe((response) => {
      this.data = [response].map(data => data);
      this.showDiv = this.data != 0 && this.city === this.cityList;
      this.weatherData = this.data.map((data: any) => data);
      this.longitude = this.weatherData[0].location.lon;
      this.latitude = this.weatherData[0].location.lat;
      this.celsiusTemp = this.weatherData[0].current.temp_c;
      this.farenheitTemp = this.weatherData[0].current.temp_f;
      this.weatherCondition = this.weatherData[0].current.condition.text;
      this.changeImage(this.weatherCondition);
    });
  }

  displayCountryName(e: any) {
    this.countryId = e.target.id;
    if (this.countryId === 'can') {
      this.countryName = canadaCities.citiesInCanada.countryName;
    } else if (this.countryId === 'us') {
      this.countryName = usaCities.citiesInUSA.countryName;
    } else if (this.countryId === 'uk') {
      this.countryName = ukCities.citiesInUK.countryName;
    } else if (this.countryId === 'uae') {
      this.countryName = uaeCities.citiesInUAE.countryName;
    } else {
      this.countryName = indianCities.citiesInIndia.countryName;
    }
    this.getCityNamesBasedOnCountrySelected(this.countryId);
  }

}


