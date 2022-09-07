import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedicamentosContainerComponent } from './medicamentos-container.component';

describe('MedicamentosContainerComponent', () => {
  let component: MedicamentosContainerComponent;
  let fixture: ComponentFixture<MedicamentosContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentosContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
