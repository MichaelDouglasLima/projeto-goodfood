import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklylogCardComponent } from './weeklylog-card.component';

describe('WeeklylogCardComponent', () => {
  let component: WeeklylogCardComponent;
  let fixture: ComponentFixture<WeeklylogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklylogCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklylogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
