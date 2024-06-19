import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNutritionistComponent } from './navbar-nutritionist.component';

describe('NavbarNutritionistComponent', () => {
  let component: NavbarNutritionistComponent;
  let fixture: ComponentFixture<NavbarNutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarNutritionistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
