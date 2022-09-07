import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PesajeComponent } from './pesaje.component';

describe('PesajeComponent', () => {
  let component: PesajeComponent;
  let fixture: ComponentFixture<PesajeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PesajeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
