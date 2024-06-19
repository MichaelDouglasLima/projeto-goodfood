import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistCardComponent } from './nutritionist-card.component';

describe('NutritionistCardComponent', () => {
  let component: NutritionistCardComponent;
  let fixture: ComponentFixture<NutritionistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutritionistCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutritionistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
