import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesListComponent } from './unidades-list.component';

describe('UnidadesListComponent', () => {
  let component: UnidadesListComponent;
  let fixture: ComponentFixture<UnidadesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnidadesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
