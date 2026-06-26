import { Component, OnInit, signal } from '@angular/core';
import { CountryService } from '../../services/CountryService';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries',
  imports: [RouterLink],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
  standalone: true,
})
export class Countries implements OnInit {
  limit = 24;
  offset = 0;
  loading = signal(false);
  skeletonCards = Array.from({ length: 8 });
  isSearching = false;

  constructor(
    public cs: CountryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  get currentPage() {
    return this.offset / this.limit + 1;
  }

  search(value: string): void {
    value = value.trim();

    this.router.navigate(['/countries'], {
      queryParams: value ? { q: value } : {},
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const search = params['q'];
      const region = params['region'];

      console.log(search, region);

      this.loading.set(true);
      let request;
      if (search) {
        this.isSearching = true;
        request = this.cs.searchCountry(search);
      } else if (region) {
        this.isSearching = true;
        request = this.cs.filterByRegion(region);
      } else {
        this.isSearching = false;
        request = this.cs.getCountries(this.limit, this.offset);
      }
      request.pipe(finalize(() => this.loading.set(false))).subscribe();
    });
  }

  nextPage(): void {
    if (this.offset >= 195) return;

    this.loading.set(true);

    this.offset += this.limit;

    this.cs
      .getCountries(this.limit, this.offset)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe();
  }

  previousPage(): void {
    if (this.offset === 0) return;

    this.loading.set(true);

    this.offset -= this.limit;

    this.cs
      .getCountries(this.limit, this.offset)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe();
  }
}
