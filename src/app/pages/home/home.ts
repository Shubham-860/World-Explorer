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
  country: any;

  ngOnInit(): void {
    this.countries.getCountry('India').subscribe({
      next: (country) => {
        this.country = country;
        console.log(this.country);
      },
      error: (error) => {
        console.error('Failed to load country', error);
      },
    });
  }
}
