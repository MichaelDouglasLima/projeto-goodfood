import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklylogFormComponent } from './weeklylog-form.component';

describe('WeeklylogFormComponent', () => {
  let component: WeeklylogFormComponent;
  let fixture: ComponentFixture<WeeklylogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklylogFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklylogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
