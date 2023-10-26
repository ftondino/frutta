import { Component, Input, OnInit } from '@angular/core';
import { FruitService } from '../../services/fruit.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Fruit } from 'src/app/models/fruit.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fruit-details',
  templateUrl: './fruit-details.component.html',
  styleUrls: ['./fruit-details.component.css'],
})
export class FruitDetailsComponent implements OnInit {
  @Input() fruit: Fruit | undefined;
  private Subscription: Subscription | undefined;
  servingSize = 100;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public fruitService: FruitService
  ) {}

  ngOnInit(): void {
    this.Subscription = this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.apiService.getFruitDetails(id).subscribe((fruit) => {
        this.fruit = fruit;
        if (this.fruit) {
          const fruits = this.fruitService._fruits.getValue();
          const fruitWithImage = fruits.find(
            (f) => f.name === this.fruit?.name
          );
          if (fruitWithImage) {
            this.fruit.image = fruitWithImage.image;
          }
        }
        this.updateNutritionValues();
      });
    });
  }

  updateNutritionValues() {
    if (this.fruit && this.fruit.nutritions) {
      const factor = this.servingSize / 100;
      this.fruit.nutritions.calories = Number(
        (this.fruit.nutritions.calories * factor).toFixed(1)
      );
      this.fruit.nutritions.fat = Number(
        (this.fruit.nutritions.fat * factor).toFixed(1)
      );
      this.fruit.nutritions.sugar = Number(
        (this.fruit.nutritions.sugar * factor).toFixed(1)
      );
      this.fruit.nutritions.carbohydrates = Number(
        (this.fruit.nutritions.carbohydrates * factor).toFixed(1)
      );
      this.fruit.nutritions.protein = Number(
        (this.fruit.nutritions.protein * factor).toFixed(1)
      );
    }
  }

  onServingSizeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.servingSize = Number(inputElement.value);
    this.updateNutritionValues();
  }

  ngOnDestroy() {
    this.Subscription?.unsubscribe();
  }
}
