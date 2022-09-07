import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PesajeViewComponent } from './pesaje-view.component';

describe('PesajeViewComponent', () => {
  let component: PesajeViewComponent;
  let fixture: ComponentFixture<PesajeViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PesajeViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesajeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
