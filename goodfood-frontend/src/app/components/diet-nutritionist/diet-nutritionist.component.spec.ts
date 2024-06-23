import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietNutritionistComponent } from './diet-nutritionist.component';

describe('DietNutritionistComponent', () => {
  let component: DietNutritionistComponent;
  let fixture: ComponentFixture<DietNutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DietNutritionistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
