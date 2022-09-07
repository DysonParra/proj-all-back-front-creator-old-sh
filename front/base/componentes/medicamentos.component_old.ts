import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../../esencial/componentes/base-component';
import { TayudoFacade } from '../../tayudo.facade';
import { MedicamentoViewModel } from '../../modelos/medicamento.model';
import { MedicamentoState } from '../../estados/medicamento.state';
import { LaboratorioViewModel } from '../../modelos/laboratorio.model';

import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
})
export class MedicamentosComponent extends BaseComponent implements OnInit, OnDestroy {

  @Output() outVerMedicamento: EventEmitter<any> = new EventEmitter();
  @Output() outVerMedicamentosQuantity: EventEmitter<any> = new EventEmitter<any>(true);
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>(true);

  actualizando$: Observable<boolean>;
  procesoSubcription: Subscription = undefined as any;

  coleccionMedicamentos: MedicamentoViewModel[] = [];
  coleccionLaboratorios: LaboratorioViewModel[] = [];

  loadingVisible = true;
  loadingMessage = "Loading..."
  updateCollection = true;

  constructor(private tayudoFacade: TayudoFacade, private medicamentoState: MedicamentoState) {
    super();

    this.actualizando$ = tayudoFacade.getMedicamentoActualizando$();

    this.eventSubscriptions.push(
      tayudoFacade.getMedicamentos$()
        .subscribe((resp) => {
          this.coleccionMedicamentos = resp;
          if (undefined === this.coleccionMedicamentos) {
            //this.loadingMessage = "Error obteniendo datos.";
            this.loadingVisible = false;
            notify("Error obteniendo datos", 'error', 3000);
            this.coleccionMedicamentos = null as any;
          }
          else if (null !== this.coleccionMedicamentos) {
            this.loadingVisible = false;
          }
        })
    );

    this.eventSubscriptions.push(this.medicamentoState.getCantidadMedicamentos().subscribe((resp) => {
      this.outVerMedicamentosQuantity.emit(resp)
    }));

    this.cloneIconClick = this.cloneIconClick.bind(this);
    this.medicamentoOnClick = this.medicamentoOnClick.bind(this);

    this.validateUniqueId = this.validateUniqueId.bind(this);
    this.validateLaboratorio = this.validateLaboratorio.bind(this);
  }

  ngOnInit(): void {
  }

  private static isChief(position: any) {
    return position && ["CEO", "CMO"].indexOf(position.trim().toUpperCase()) >= 0;
  };

  rowValidating(e: any) {
    var position = e.newData.Position;

    if (MedicamentosComponent.isChief(position)) {
      e.errorText = "The company can have only one " + position.toUpperCase() + ". Please choose another position.";
      e.isValid = false;
    }
  }

  editorPreparing(e: any) {
    if (e.parentType === "dataRow" && e.dataField === "Position") {
      e.editorOptions.readOnly = MedicamentosComponent.isChief(e.value);
    }
    else if (e.parentType === "searchPanel") {
      e.editorOptions.onValueChanged = undefined;
      e.editorOptions.onEnterKey = (function (this: any, arg: any) {
        this.onSearch.emit({ value: arg.component.option("value") });
      }).bind(this);
    }
  }

  allowDeleting(e: any) {
    return !MedicamentosComponent.isChief(e.row.data.Position);
  }

  allowAdding(e: any) {
    return !MedicamentosComponent.isChief(e.row.data.Position);
  }

  allowUpdating(e: any) {
    return !MedicamentosComponent.isChief(e.row.data.Position);
  }

  esMedicamentoVisible(e: any) {
    return e.row.data.bitProcesado > 0;
  }

  cloneIconClick(e: any) {

  }

  medicamentoOnClick(e: any) {
    console.log('lanzando...');
    this.medicamentoState.setMedicamento(e.row.data);
    this.outVerMedicamento.emit(e);
    e.event.preventDefault();
  }

  initNewRow(event: any) {
    //console.log('InitNewRow');
    //console.log(event.data);
  }

  rowInserting(event: any) {
    //console.log('RowInserting');
    //console.log(event.data);
  }

  rowInserted(event: any) {
    ////if (event.data.dtFechaCreacion != null)
    ////  event.data.dtFechaCreacion = event.data.dtFechaCreacion.replace(/\//gi, "-");

    //console.log('RowInserted');
    //console.log(event.data);
    this.tayudoFacade.agregarMedicamento(event.data);
  }

  editingStart(event: any) {
    //console.log('EditingStart');
    //console.log(event.data);
  }

  rowUpdating(event: any) {
    //console.log('RowUpdating');
    //console.log(event.data);
  }

  rowUpdated(event: any) {
    ////if (event.data.dtFechaCreacion != null)
    ////  event.data.dtFechaCreacion = event.data.dtFechaCreacion.replace(/\//gi, "-");
    //console.log('RowUpdated');
    //console.log(event.data);
    this.tayudoFacade.actualizarMedicamento(event.data);
  }

  rowRemoving(event: any) {
    //console.log('rowRemoving');
    //console.log(event.data);
  }

  rowRemoved(event: any) {
    //console.log('rowRemoved');
    //console.log(event.data);
    this.tayudoFacade.eliminarMedicamento(event.data);
  }

  validateId(e: any) {
    return e.value != null && e.value !== 0;
  }

  validateUniqueId(e: any) {
    var value = e.value;
    return new Promise((resolve, reject) => {
      this.tayudoFacade.getMedicamentos$()
        .subscribe((resp) => {
          this.coleccionMedicamentos = resp;
          //console.log(this.coleccionMedicamentos);

          for (let viewModel of this.coleccionMedicamentos)
            if (value == viewModel.intId)
              reject();

          resolve('');
        });
    });
  }

  validateLaboratorio(e: any) {
    var value = e.value;
    return new Promise((resolve, reject) => {
      if (e.value == null)
        resolve('');
      this.tayudoFacade.cargarLaboratorios()
        .subscribe((resp) => {
          this.coleccionLaboratorios = resp;
          //console.log(this.coleccionLaboratorios);

          for (let viewModel of resp)
            if (value == viewModel.intIdLaboratorio)
              resolve('');

          reject();
        });
    });
  }

  updateLaboratorios() {
    this.tayudoFacade.cargarLaboratorios()
      .subscribe((resp) => {
        this.coleccionLaboratorios = resp;
        //console.log(this.coleccionLaboratorios);
      });
  }

  onSelectionChanged(selectedRowKeys: any, cellInfo: any, dropDownBoxComponent: any) {
    //console.log(selectedRowKeys);
    //console.log(cellInfo);
    if (selectedRowKeys == null)
      cellInfo.setValue(null);
    else if (selectedRowKeys.length > 0) {
      cellInfo.setValue(selectedRowKeys[0]);
      dropDownBoxComponent.close();
    }
    else if (selectedRowKeys.length == 0 && cellInfo.value === null)
      cellInfo.setValue(null);
    //console.log(cellInfo);
  }
}
