import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {
  constructor(private router: Router) {}

  searchQuery = '';

  regions = [
    { name: 'Africa', slug: 'Africa' },
    { name: 'Americas', slug: 'Americas' },
    { name: 'Asia', slug: 'Asia' },
    { name: 'Europe', slug: 'Europe' },
    { name: 'Oceania', slug: 'Oceania' },
    { name: 'Antarctic', slug: 'Antarctic' },
  ];
  search(query: string): void {
    query = query.trim();
    this.router.navigate(['/countries'], {
      queryParams: query ? { q: query } : {},
    });
  }

  browseRegion(region: string): void {
    this.router.navigate(['/countries'], {
      queryParams: { region },
    });
  }
}
