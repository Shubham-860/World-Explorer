import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/CountryService';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private countries: CountryService) {}
  ngOnInit(): void {
    this.countries.getCountries();
    console.log(this.countries.countries());
  }
}
