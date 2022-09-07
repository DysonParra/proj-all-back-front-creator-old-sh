import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioPesajeViewComponent } from './formularioPesaje-view.component';

describe('FormularioPesajeViewComponent', () => {
  let component: FormularioPesajeViewComponent;
  let fixture: ComponentFixture<FormularioPesajeViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioPesajeViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPesajeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
