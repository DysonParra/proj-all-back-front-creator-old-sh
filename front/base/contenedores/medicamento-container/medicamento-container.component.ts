import { Component, EventEmitter, OnDestroy, OnInit, Input, Output, ViewChild } from '@angular/core';

import { BaseComponent } from '../../../esencial/componentes/base-component';
import { TayudoFacade } from '../../tayudo.facade';
import { MedicamentoViewModel } from '../../modelos/medicamento.model';
import { MedicamentoState } from '../../estados/medicamento.state';

@Component({
  selector: 'app-medicamento-container',
  templateUrl: './medicamento-container.component.html',
  styleUrls: ['./medicamento-container.component.css']
})
export class MedicamentoContainerComponent extends BaseComponent implements OnInit, OnDestroy {

  private currentMedicamento: MedicamentoViewModel = new MedicamentoViewModel();
  popupVisible = false;

  constructor(private tayudoFacade: TayudoFacade, private medicamentoState: MedicamentoState) {
    super();

    this.eventSubscriptions.push(
      this.medicamentoState.getMedicamento$()
        .subscribe((resp) => {
          this.currentMedicamento = resp;
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
