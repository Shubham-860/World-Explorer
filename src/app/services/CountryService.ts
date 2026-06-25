import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countries = signal<any[]>([]);
  metadata = signal({});
  constructor(private http: HttpClient) {}

  getCountries(): void {
    this.http
      .get<any>('/restcountries-api/countries/v5?limit=25&pretty=1', {
        headers: {
          Authorization: 'Bearer rc_live_b27d205ff5fb4ca0bbefac6d63a4286c',
        },
      })
      .subscribe({
        next: (response) => {
          console.log('Full Response:', response);

          // If the API returns { data: { objects: [...] } }
          this.countries.set(response.data.objects);
          this.metadata.set(response.data.meta);
          console.log('Countries:', this.countries());
          console.log('meta', this.metadata());
        },
        error: (error) => {
          console.error('Failed to load countries', error);
          this.countries.set([]);
        },
      });
  }
}
