import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioPesajeContainerComponent } from './formularioPesaje-container.component';

describe('FormularioPesajeContainerComponent', () => {
  let component: FormularioPesajeContainerComponent;
  let fixture: ComponentFixture<FormularioPesajeContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioPesajeContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPesajeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
