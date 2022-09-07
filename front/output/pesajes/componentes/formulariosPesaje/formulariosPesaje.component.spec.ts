import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormulariosPesajeComponent } from './formulariosPesaje.component';

describe('FormulariosPesajeComponent', () => {
  let component: FormulariosPesajeComponent;
  let fixture: ComponentFixture<FormulariosPesajeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormulariosPesajeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosPesajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
