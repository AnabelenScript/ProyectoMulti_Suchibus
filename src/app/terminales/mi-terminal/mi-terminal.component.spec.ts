import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiTerminalComponent } from './mi-terminal.component';

describe('MiTerminalComponent', () => {
  let component: MiTerminalComponent;
  let fixture: ComponentFixture<MiTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiTerminalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
