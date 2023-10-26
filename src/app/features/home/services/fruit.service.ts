import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Fruit } from 'src/app/models/fruit.model';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  _fruits = new BehaviorSubject<Fruit[]>([]);
  fruits: Fruit[] = [];
  filteredFruits: Fruit[] = [];
  noFruitsFound = false;

  constructor(
    private apiService: ApiService,
    private imageService: ImageService
  ) {}

  getFruits() {
    this.apiService.getAllFruitData().subscribe((_fruit) => {
      this._fruits.next(_fruit);
      this.fruits = _fruit;
      this.filteredFruits = [...this.fruits];
      this.getFruitImages();
    });
  }

  getFruitImages() {
    let fruits = this._fruits.getValue();
    if (fruits) {
      let imageRequests = fruits.map((fruit) =>
        this.imageService.getFruitImage(fruit.name)
      );

      forkJoin(imageRequests).subscribe((images) => {
        for (let i = 0; i < images.length; i++) {
          if (fruits && fruits[i]) {
            fruits[i].image = images[i].photos[0].src.large;
          }
        }
        this._fruits.next(fruits);
      });
    }
  }

  searchFruits(searchTerm: string): void {
    if (searchTerm) {
      this.filteredFruits = this.fruits.filter((fruit) =>
        fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.noFruitsFound = this.filteredFruits.length === 0;
    } else {
      this.filteredFruits = [...this.fruits];
      this.noFruitsFound = false;
    }
  }
}
