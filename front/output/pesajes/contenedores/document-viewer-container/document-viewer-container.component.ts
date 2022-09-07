import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { BaseComponent } from '../../../esencial/componentes/base-component';

@Component({
  selector: 'app-document-viewer-container',
  templateUrl: './document-viewer-container.component.html',
  styleUrls: ['./document-viewer-container.component.css']
})
export class DocumentViewerContainerComponent extends BaseComponent implements OnInit, OnDestroy {

  base64Content: string;
  popupVisible = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.setOnInitComplete();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onPopupHiden() {
    //this.popupVisible = false;
  }

  onPopupShowing() {
  }

  @Input()
  get inPopupVisible() {
    return this.popupVisible;
  }

  set inPopupVisible(value) {
    this.popupVisible = value;
  }

  @Input()
  get inBase64Content() {
    return this.base64Content;
  }

  set inBase64Content(value) {
    this.base64Content = value;
  }
}
