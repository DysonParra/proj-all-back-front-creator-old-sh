import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedicamentoViewComponent } from './medicamento-view.component';

describe('MedicamentoViewComponent', () => {
  let component: MedicamentoViewComponent;
  let fixture: ComponentFixture<MedicamentoViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentoViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
