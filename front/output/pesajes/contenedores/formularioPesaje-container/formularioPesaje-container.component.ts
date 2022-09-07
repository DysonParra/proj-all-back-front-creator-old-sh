import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewChild } from '@angular/core';

import { BaseComponent } from '../../../esencial/componentes/base-component';
import { PesajesFacade } from '../../pesajes.facade';
import { FormularioPesajeViewModel } from '../../modelos/formularioPesaje.model';
import { FormularioPesajeState } from '../../estados/formularioPesaje.state';

@Component({
  selector: 'app-formularioPesaje-container',
  templateUrl: './formularioPesaje-container.component.html',
  styleUrls: ['./formularioPesaje-container.component.css']
})
export class FormularioPesajeContainerComponent extends BaseComponent implements OnInit, OnDestroy {

  private currentFormularioPesaje: FormularioPesajeViewModel = new FormularioPesajeViewModel();
  popupVisible = false;

  constructor(private pesajesFacade: PesajesFacade, private formularioPesajeState: FormularioPesajeState) {
    super();

    this.eventSubscriptions.push(
      this.formularioPesajeState.getFormularioPesaje$()
        .subscribe((resp) => {
          this.currentFormularioPesaje = resp;
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
