import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklylogsComponent } from './weeklylogs.component';

describe('WeeklylogsComponent', () => {
  let component: WeeklylogsComponent;
  let fixture: ComponentFixture<WeeklylogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklylogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklylogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
