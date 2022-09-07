import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PesajesContainerComponent } from './pesajes-container.component';

describe('PesajesContainerComponent', () => {
  let component: PesajesContainerComponent;
  let fixture: ComponentFixture<PesajesContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PesajesContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesajesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
