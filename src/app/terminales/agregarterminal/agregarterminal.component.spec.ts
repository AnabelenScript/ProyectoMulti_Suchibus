import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarterminalComponent } from './agregarterminal.component';

describe('AgregarterminalComponent', () => {
  let component: AgregarterminalComponent;
  let fixture: ComponentFixture<AgregarterminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarterminalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarterminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
