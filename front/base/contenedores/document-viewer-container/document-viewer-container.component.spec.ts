import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DocumentViewerContainerComponent } from './document-viewer-container.component';

describe('DocumentViewerContainerComponent', () => {
  let component: DocumentViewerContainerComponent;
  let fixture: ComponentFixture<DocumentViewerContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentViewerContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
