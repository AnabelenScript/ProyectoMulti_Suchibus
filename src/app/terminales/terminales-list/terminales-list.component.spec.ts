import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalesListComponent } from './terminales-list.component';

describe('TerminalesListComponent', () => {
  let component: TerminalesListComponent;
  let fixture: ComponentFixture<TerminalesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
