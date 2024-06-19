import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedMealComponent } from './suggested-meal.component';

describe('SuggestedMealComponent', () => {
  let component: SuggestedMealComponent;
  let fixture: ComponentFixture<SuggestedMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestedMealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestedMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
