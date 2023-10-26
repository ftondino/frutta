import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FruitService } from './fruit.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ImageService } from './image.service';

describe('FruitService', () => {
  let service: FruitService;
  let apiService: ApiService;
  let imageService: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, ImageService],
    });
    service = TestBed.inject(FruitService);
    apiService = TestBed.inject(ApiService);
    imageService = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get fruits', () => {
    const fruitData = [
      {
        name: 'fruit',
        id: 1,
        family: 'family',
        order: 'order',
        genus: 'genus',
        nutritions: {
          calories: 1,
          fat: 1,
          sugar: 1,
          carbohydrates: 1,
          protein: 1,
        },
      },
      {
        name: 'fruit',
        id: 1,
        family: 'family',
        order: 'order',
        genus: 'genus',
        nutritions: {
          calories: 1,
          fat: 1,
          sugar: 1,
          carbohydrates: 1,
          protein: 1,
        },
      },
    ];
    spyOn(apiService, 'getAllFruitData').and.returnValue(of(fruitData));
    spyOn(imageService, 'getFruitImage').and.returnValue(
      of({ photos: [{ src: { large: 'url' } }] })
    );

    service.getFruits();

    expect(service.fruits.length).toBe(2);
    expect(service.fruits[0].name).toBe('fruit');
    expect(service.fruits[1].name).toBe('fruit');
  });

  it('should search fruits', () => {
    service.fruits = [
      {
        name: 'apple',
        id: 1,
        family: 'family',
        order: 'order',
        genus: 'genus',
        nutritions: {
          calories: 1,
          fat: 1,
          sugar: 1,
          carbohydrates: 1,
          protein: 1,
        },
      },
      {
        name: 'fruit',
        id: 1,
        family: 'family',
        order: 'order',
        genus: 'genus',
        nutritions: {
          calories: 1,
          fat: 1,
          sugar: 1,
          carbohydrates: 1,
          protein: 1,
        },
      },
    ];

    service.searchFruits('apple');

    expect(service.filteredFruits.length).toBe(1);
    expect(service.filteredFruits[0].name).toBe('apple');
  });
});
