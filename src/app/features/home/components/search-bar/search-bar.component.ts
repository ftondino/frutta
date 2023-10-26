import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FruitService } from 'src/app/features/home/services/fruit.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchTerm: string | undefined;
  constructor(
    public fruitService: FruitService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}
  ngOnInit(): void {}

  goToFruitDetails(id: number) {
    this.router.navigate(['/home/fruit-details', id]);
    this.searchTerm = '';
    this.viewportScroller.scrollToAnchor('router-outlet');
  }
}
