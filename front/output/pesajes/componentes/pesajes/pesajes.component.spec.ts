import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PesajesComponent } from './pesajes.component';

describe('PesajesComponent', () => {
  let component: PesajesComponent;
  let fixture: ComponentFixture<PesajesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PesajesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
