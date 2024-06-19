import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestClientCardComponent } from './request-client-card.component';

describe('RequestClientCardComponent', () => {
  let component: RequestClientCardComponent;
  let fixture: ComponentFixture<RequestClientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestClientCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestClientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
