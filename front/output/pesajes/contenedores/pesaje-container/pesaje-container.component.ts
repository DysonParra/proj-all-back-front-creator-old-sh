import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewChild } from '@angular/core';

import { BaseComponent } from '../../../esencial/componentes/base-component';
import { PesajesFacade } from '../../pesajes.facade';
import { PesajeViewModel } from '../../modelos/pesaje.model';
import { PesajeState } from '../../estados/pesaje.state';

@Component({
  selector: 'app-pesaje-container',
  templateUrl: './pesaje-container.component.html',
  styleUrls: ['./pesaje-container.component.css']
})
export class PesajeContainerComponent extends BaseComponent implements OnInit, OnDestroy {

  private currentPesaje: PesajeViewModel = new PesajeViewModel();
  popupVisible = false;

  constructor(private pesajesFacade: PesajesFacade, private pesajeState: PesajeState) {
    super();

    this.eventSubscriptions.push(
      this.pesajeState.getPesaje$()
        .subscribe((resp) => {
          this.currentPesaje = resp;
        })
    );

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

}
