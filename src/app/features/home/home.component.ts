import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Fruit } from 'src/app/models/fruit.model';
import { FruitService } from './services/fruit.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  fruits: Fruit[] | undefined;
  subscription: Subscription | undefined;

  constructor(
    public fruitService: FruitService,
    private viewportScroller: ViewportScroller
  ) {}

  filteredFruits = this.fruitService.filteredFruits;

  ngOnInit(): void {
    this.subscription = this.fruitService._fruits.subscribe((fruits) => {
      this.fruits = fruits;
    });
    this.fruitService.getFruits();
  }

  goToJumbotron() {
    this.viewportScroller.scrollToAnchor('jumbotron');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }
}
