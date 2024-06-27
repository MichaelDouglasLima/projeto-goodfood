import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietClientComponent } from './diet-client.component';

describe('DietClientComponent', () => {
  let component: DietClientComponent;
  let fixture: ComponentFixture<DietClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DietClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
