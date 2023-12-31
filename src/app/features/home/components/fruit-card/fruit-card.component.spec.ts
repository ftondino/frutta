import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FruitCardComponent } from './fruit-card.component';

describe('FruitCardComponent', () => {
  let component: FruitCardComponent;
  let fixture: ComponentFixture<FruitCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(FruitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
