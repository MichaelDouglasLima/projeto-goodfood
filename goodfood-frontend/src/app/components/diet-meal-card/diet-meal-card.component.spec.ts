import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietMealCardComponent } from './diet-meal-card.component';

describe('DietMealCardComponent', () => {
  let component: DietMealCardComponent;
  let fixture: ComponentFixture<DietMealCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DietMealCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietMealCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
