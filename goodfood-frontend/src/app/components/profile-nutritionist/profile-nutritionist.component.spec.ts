import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNutritionistComponent } from './profile-nutritionist.component';

describe('ProfileNutritionistComponent', () => {
  let component: ProfileNutritionistComponent;
  let fixture: ComponentFixture<ProfileNutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileNutritionistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
