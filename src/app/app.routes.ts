import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Countries } from './pages/countries/countries';
import { CountryDetails } from './pages/country-details/country-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'countries',
    component: Countries,
  },
  {
    path: 'country/:code',
    component: CountryDetails,
  },
];
