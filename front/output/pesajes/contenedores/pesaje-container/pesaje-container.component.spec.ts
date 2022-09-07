import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PesajeContainerComponent } from './pesaje-container.component';

describe('PesajeContainerComponent', () => {
  let component: PesajeContainerComponent;
  let fixture: ComponentFixture<PesajeContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PesajeContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesajeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
