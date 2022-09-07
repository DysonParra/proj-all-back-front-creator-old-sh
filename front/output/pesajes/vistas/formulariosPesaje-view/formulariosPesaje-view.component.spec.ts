import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormulariosPesajeViewComponent } from './formulariosPesaje-view.component';

describe('FormulariosPesajeViewComponent', () => {
  let component: FormulariosPesajeViewComponent;
  let fixture: ComponentFixture<FormulariosPesajeViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormulariosPesajeViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosPesajeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
