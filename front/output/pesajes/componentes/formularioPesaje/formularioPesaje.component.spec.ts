import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioPesajeComponent } from './formularioPesaje.component';

describe('FormularioPesajeComponent', () => {
  let component: FormularioPesajeComponent;
  let fixture: ComponentFixture<FormularioPesajeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioPesajeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPesajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
