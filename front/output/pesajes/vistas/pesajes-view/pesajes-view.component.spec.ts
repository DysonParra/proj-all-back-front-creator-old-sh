import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PesajesViewComponent } from './pesajes-view.component';

describe('PesajesViewComponent', () => {
  let component: PesajesViewComponent;
  let fixture: ComponentFixture<PesajesViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PesajesViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesajesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
