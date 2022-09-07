import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormulariosPesajeContainerComponent } from './formulariosPesaje-container.component';

describe('FormulariosPesajeContainerComponent', () => {
  let component: FormulariosPesajeContainerComponent;
  let fixture: ComponentFixture<FormulariosPesajeContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormulariosPesajeContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosPesajeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
