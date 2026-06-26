import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/CountryService';

@Component({
  selector: 'app-country-details',
  imports: [],
  templateUrl: './country-details.html',
  styleUrl: './country-details.css',
  standalone: true,
})
export class CountryDetails implements OnInit {
  country = signal<any>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private cs: CountryService,
  ) {}

  ngOnInit(): void {
    this.loading.set(true);
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.cs.getCountry(uuid).subscribe({
        next: (country) => {
          this.country.set(country);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
        },
      });
    } else {
      this.loading.set(false);
    }
  }

  get population() {
    const population = this.country().population;
    if (!population) return '-';
    if (population >= 1_000_000_000) return (population / 1_000_000_000).toFixed(2) + ' B';
    if (population >= 1_000_000) return (population / 1_000_000).toFixed(2) + ' M';
    return population.toLocaleString();
  }

  get areaDisplay(): string {
    const km = this.country()?.area?.kilometers;
    if (!km) return '—';
    return km.toLocaleString() + ' km²';
  }
}
