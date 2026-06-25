import { Component, OnInit, signal } from '@angular/core';
import { CountryService } from '../../services/CountryService';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries',
  imports: [RouterLink],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class Countries implements OnInit {
  constructor(public cs: CountryService) {}
  loading = signal(false);
  skeletonCards = Array.from({ length: 8 });

  ngOnInit(): void {
    this.loading.set(true);
    this.cs
      .getCountries()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe();
  }
}
