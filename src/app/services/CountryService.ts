import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

export interface CountrySummary {
  uuid: string;
  names: {
    common: string;
    official: string;
  };
  flag: {
    url_png?: string;
    url_svg?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countries = signal<CountrySummary[]>([]);

  constructor(private http: HttpClient) {}

  getCountries() {
    const cachedCountries = this.countries();

    if (cachedCountries.length > 0) {
      return of(cachedCountries);
    }

    // Real API call, disabled while testing to avoid using the API limit:
    // return this.http.get<any>('/restcountries-api//countries/v5?limit=25&offset=0', {
    //   headers: {
    //     Authorization: 'Bearer rc_live_b27d205ff5fb4ca0bbefac6d63a4286c',
    //   },
    // })
    return this.http.get<unknown>('/mock-data/countries.json').pipe(
      map((response) => {
                return this.getObjects(response)
          .map((country) => this.toCountrySummary(country))
          .filter((country): country is CountrySummary => country !== null);
      }),
      tap((countries) => {
        this.countries.set(countries);
      }),
      catchError((error) => {
        console.error('Failed to load countries', error);
        this.countries.set([]);
        return of([]);
      }),
    );
  }

  getCountry(uuid: string) {
    // Real API call, disabled while testing to avoid using the API limit:
    // return this.http
    //   .get<any>(`/restcountries-api/countries/v5/uuid/${uuid}`, {
    //     headers: {
    //       Authorization: 'Bearer rc_live_b27d205ff5fb4ca0bbefac6d63a4286c',
    //     },
    //   })
    //   .pipe(map((response) => response.data.objects[0]));

    return this.http
      .get<any>('/mock-data/country.json')
      .pipe(map((response) => this.getObjects(response)[0]));
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

  private toCountrySummary(country: any): CountrySummary | null {
    const common = country?.names?.common ?? '';
    const official = country?.names?.official ?? common;
    const uuid = country?.uuid ?? official ?? common;

    if (!common && !official) {
      return null;
    }

    return {
      uuid,
      names: {
        common,
        official,
      },
      flag: {
        url_png: country?.flag?.url_png,
        url_svg: country?.flag?.url_svg,
      },
    };
  }
}
