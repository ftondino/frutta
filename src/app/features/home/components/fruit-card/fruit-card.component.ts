import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fruit } from 'src/app/models/fruit.model';
import { FruitService } from '../../services/fruit.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fruit-card',
  templateUrl: './fruit-card.component.html',
  styleUrls: ['./fruit-card.component.css'],
})
export class FruitCardComponent implements OnInit {
  constructor(
    public fruitService: FruitService,
    public apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  fruitDetails(id: number) {
    this.router.navigate(['/home/fruit-details', id]);
  }
}
