import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FruitDetailsComponent } from './fruit-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FruitDetailsComponent', () => {
  let component: FruitDetailsComponent;
  let fixture: ComponentFixture<FruitDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(FruitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update nutrition values on serving size change', () => {
    const servingSize = 200;
    component.servingSize = servingSize;
    (component.fruit = {
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
    }),
      component.updateNutritionValues();
    expect(component.fruit.nutritions.calories).toEqual(2);
    expect(component.fruit.nutritions.fat).toEqual(2);
    expect(component.fruit.nutritions.sugar).toEqual(2);
    expect(component.fruit.nutritions.carbohydrates).toEqual(2);
    expect(component.fruit.nutritions.protein).toEqual(2);
  });
});
