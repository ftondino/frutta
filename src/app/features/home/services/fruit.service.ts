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
  displayedFruits: Fruit[] = [];
  noFruitsFound = false;
  pageSize = 12;
  currentPage = 0;
  isFiltering = false;

  constructor(
    private apiService: ApiService,
    private imageService: ImageService
  ) {}

  getFruits() {
    this.apiService.getAllFruitData().subscribe((_fruit) => {
      this.fruits = _fruit;
      this.filteredFruits = [...this.fruits];
      this.getFruitImages();
      this.loadMore();
    });
  }

  getFruitImages() {
    let imageRequests = this.fruits.map((fruit) =>
      this.imageService.getFruitImage(fruit.name)
    );

    forkJoin(imageRequests).subscribe((images) => {
      for (let i = 0; i < images.length; i++) {
        if (this.fruits && this.fruits[i]) {
          this.fruits[i].image = images[i].photos[0].src.large;
        }
      }
      this._fruits.next(this.fruits);
    });
  }

  searchFruits(searchTerm: string): void {
    this.isFiltering = true;
    if (searchTerm) {
      this.filteredFruits = this.fruits.filter((fruit) =>
        fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredFruits = [...this.fruits];
    }

    this.displayedFruits = [];
    this.currentPage = 0;

    this.loadMore();
    this.isFiltering = false;
  }

  loadMore() {
    const start = this.currentPage * this.pageSize;
    const end = (this.currentPage + 1) * this.pageSize;
    const nextPage = this.filteredFruits.slice(start, end);
    this.displayedFruits.push(...nextPage);
    this.currentPage++;
  }

  hasMoreFruits(): boolean {
    return this.currentPage * this.pageSize < this.filteredFruits.length;
  }
}
