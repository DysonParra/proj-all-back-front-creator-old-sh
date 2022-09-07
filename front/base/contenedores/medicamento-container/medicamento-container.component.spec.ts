import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedicamentoContainerComponent } from './medicamento-container.component';

describe('MedicamentoContainerComponent', () => {
  let component: MedicamentoContainerComponent;
  let fixture: ComponentFixture<MedicamentoContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentoContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
