import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedicamentosViewComponent } from './medicamentos-view.component';

describe('MedicamentosViewComponent', () => {
  let component: MedicamentosViewComponent;
  let fixture: ComponentFixture<MedicamentosViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentosViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
