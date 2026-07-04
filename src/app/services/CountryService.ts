import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countries = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  getCountries(limit = 24, offset = 0) {
    // const cachedCountries = this.countries();
    //
    // if (cachedCountries.length > 0) {
    //   return of(cachedCountries);
    // }

    return (
      this.http
        .get<any>(`https://api.restcountries.com/restcountries-api/countries/v5?limit=${limit}&offset=${offset}`, {
          headers: {
            Authorization: 'Bearer rc_live_b27d205ff5fb4ca0bbefac6d63a4286c',
          },
        })

        // return this.http.get<any>('/mock-data/countries.json')
        .pipe(
          map((response) =>
            this.getObjects(response).map((country) => ({
              uuid: country.uuid,
              region: country.region,
              names: {
                common: country.names?.common,
                official: country.names?.official,
              },
              flag: {
                url_png: country.flag?.url_png,
                url_svg: country.flag?.url_svg,
              },
            })),
          ),
          tap((countries) => {
            this.countries.set(countries);
          }),
          catchError((error) => {
            console.error('Failed to load countries', error);
            this.countries.set([]);
            return of([]);
          }),
        )
    );
  }

  filterByRegion(name: string) {
    return (
      this.http
        .get<any>(`https://api.restcountries.com/restcountries-api/countries/v5?region=${name}`, {
          headers: {
            Authorization: 'Bearer rc_live_b27d205ff5fb4ca0bbefac6d63a4286c',
          },
        })
        // return this.http.get<any>('/mock-data/countries.json')
        .pipe(
          map((response) => this.getObjects(response)),
          tap((countries) => this.countries.set(countries)),
        )
    );
  }

  searchCountry(name: string) {
    return (
      this.http
        .get<any>(`https://api.restcountries.com/restcountries-api/countries/v5?q=${name}`, {
          headers: {
            Authorization: 'Bearer rc_live_b27d205ff5fb4ca0bbefac6d63a4286c',
          },
        })
        // return this.http.get<any>('/mock-data/countries.json')
        .pipe(
          map((response) => this.getObjects(response)),
          tap((countries) => this.countries.set(countries)),
        )
    );
  }

  getCountry(uuid: string) {
    return (
      this.http
        .get<any>(`https://api.restcountries.com/restcountries-api/countries/v5/uuid/${uuid}`, {
          headers: {
            Authorization: 'Bearer rc_live_b27d205ff5fb4ca0bbefac6d63a4286c',
          },
        })
        //
        // return this.http
        //   .get<any>('/mock-data/country.json')
        .pipe(map((response) => this.getObjects(response)[0]))
    );
  }

  private getObjects(response: any): any[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.data?.objects)) {
      return response.data.objects;
    }

    return response ? [response] : [];
  }
}
