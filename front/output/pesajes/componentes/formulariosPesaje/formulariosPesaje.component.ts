import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { BaseComponent } from '../../../esencial/componentes/base-component';
import { PesajesFacade } from '../../pesajes.facade';
import { FormularioPesajeViewModel } from '../../modelos/formularioPesaje.model';
import { FormularioPesajeState } from '../../estados/formularioPesaje.state';
//import { ForeignKeyViewModel } from '../../modelos/foreignkey.model';

import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-formulariosPesaje',
  templateUrl: './formulariosPesaje.component.html',
  styleUrls: ['./formulariosPesaje.component.css'],
})
export class FormulariosPesajeComponent extends BaseComponent implements OnInit, OnDestroy {

  @Output() outVerFormularioPesaje: EventEmitter<any> = new EventEmitter();
  @Output() outVerFormulariosPesajeQuantity: EventEmitter<any> = new EventEmitter<any>(true);
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>(true);

  actualizando$: Observable<boolean>;
  procesoSubcription: Subscription = undefined as any;

  coleccionFormulariosPesaje: FormularioPesajeViewModel[] = [];
  //coleccionForeignKeys: ForeignKeyViewModel[] = [];

  loadingVisible = true;
  loadingMessage = "Loading..."
  updateCollection = true;

  constructor(private pesajesFacade: PesajesFacade, private formularioPesajeState: FormularioPesajeState) {
    super();

    this.actualizando$ = pesajesFacade.getFormularioPesajeActualizando$();

    this.eventSubscriptions.push(
      pesajesFacade.getFormulariosPesaje$()
        .subscribe((resp) => {
          this.coleccionFormulariosPesaje = resp;
          if (undefined === this.coleccionFormulariosPesaje) {
            //this.loadingMessage = "Error obteniendo datos.";
            this.loadingVisible = false;
            notify("Error obteniendo datos", 'error', 3000);
            this.coleccionFormulariosPesaje = null as any;
          }
          else if (null !== this.coleccionFormulariosPesaje) {
            this.loadingVisible = false;
          }
        })
    );

    this.eventSubscriptions.push(this.formularioPesajeState.getCantidadFormulariosPesaje().subscribe((resp) => {
      this.outVerFormulariosPesajeQuantity.emit(resp)
    }));

    this.cloneIconClick = this.cloneIconClick.bind(this);
    this.formularioPesajeOnClick = this.formularioPesajeOnClick.bind(this);

    this.validateUniqueId = this.validateUniqueId.bind(this);
    //this.validateForeignKey = this.validateForeignKey.bind(this);
  }

  ngOnInit(): void {
  }

  private static isChief(position: any) {
    return position && ["CEO", "CMO"].indexOf(position.trim().toUpperCase()) >= 0;
  };

  rowValidating(e: any) {
    var position = e.newData.Position;

    if (FormulariosPesajeComponent.isChief(position)) {
      e.errorText = "The company can have only one " + position.toUpperCase() + ". Please choose another position.";
      e.isValid = false;
    }
  }

  editorPreparing(e: any) {
    if (e.parentType === "dataRow" && e.dataField === "Position") {
      e.editorOptions.readOnly = FormulariosPesajeComponent.isChief(e.value);
    }
    else if (e.parentType === "searchPanel") {
      e.editorOptions.onValueChanged = undefined;
      e.editorOptions.onEnterKey = (function (this: any, arg: any) {
        this.onSearch.emit({ value: arg.component.option("value") });
      }).bind(this);
    }
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

  allowDeleting(e: any) {
    return !FormulariosPesajeComponent.isChief(e.row.data.Position);
  }

  allowAdding(e: any) {
    return !FormulariosPesajeComponent.isChief(e.row.data.Position);
  }

  allowUpdating(e: any) {
    return !FormulariosPesajeComponent.isChief(e.row.data.Position);
  }

  esFormularioPesajeVisible(e: any) {
    return e.row.data.bitProcesado > 0;
  }

  cloneIconClick(e: any) {

  }

  formularioPesajeOnClick(e: any) {
    console.log('lanzando...');
    this.formularioPesajeState.setFormularioPesaje(e.row.data);
    this.outVerFormularioPesaje.emit(e);
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
    //console.log('RowInserted');
    //console.log(event.data);
    ////let entidad: FormularioPesajeViewModel = event.data;
    ////if (entidad.dtFechaCreacion != null)
    ////  entidad.dtFechaCreacion = formatDate(entidad.dtFechaCreacion , 'yyyy-MM-dd HH:mm:ss', 'en_US');
    this.pesajesFacade.agregarFormularioPesaje(event.data).subscribe(
      (next) => {
        if (next != undefined) {
          //notify("Se ha guardado el registro", 'success', 3000);
        } else {
          //notify("Ha ocurrido un error al guardar el registro", 'error', 3000);
        }
      });
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
    //console.log('RowUpdated');
    //console.log(event.data);
    ////let entidad: FormularioPesajeViewModel = event.data;
    ////if (entidad.dtFechaCreacion != null)
    ////  entidad.dtFechaCreacion = formatDate(entidad.dtFechaCreacion , 'yyyy-MM-dd HH:mm:ss', 'en_US');
    this.pesajesFacade.actualizarFormularioPesaje(event.data).subscribe(
      (next) => {
        if (next != undefined) {
          //notify("Se ha actualizado el registro", 'success', 3000);
        } else {
          //notify("Ha ocurrido un error al actualizar el registro", 'error', 3000);
        }
      });
  }

  rowRemoving(event: any) {
    //console.log('rowRemoving');
    //console.log(event.data);
  }

  rowRemoved(event: any) {
    //console.log('rowRemoved');
    //console.log(event.data);
    this.pesajesFacade.eliminarFormularioPesaje(event.data).subscribe(
      (next) => {
        if (next != undefined) {
          //notify("Se ha borrado el registro", 'success', 3000);
        } else {
          //notify("Ha ocurrido un error al borrar el registro", 'error', 3000);
        }
      });
  }

  validateId(e: any) {
    return e.value != null && e.value !== 0;
  }

  validateUniqueId(e: any) {
    var value = e.value;
    return new Promise((resolve, reject) => {
      this.pesajesFacade.getFormulariosPesaje$()
        .subscribe((resp) => {
          this.coleccionFormulariosPesaje = resp;
          //console.log(this.coleccionFormulariosPesaje);

          for (let viewModel of this.coleccionFormulariosPesaje)
            if (value == viewModel.intId)
              reject();

          resolve('');
        });
    });
  }

  /*
  validateForeignKey(e: any) {
    var value = e.value;
    return new Promise((resolve, reject) => {
      if (e.value == null)
        resolve('');
      this.pesajesFacade.cargarForeignKeys()
        .subscribe((resp) => {
          this.coleccionForeignKeys = resp;
          //console.log(this.coleccionForeignKeys);

          for (let viewModel of resp)
            if (value == viewModel.idForeignKey)
              resolve('');

          reject();
        });
    });
  }

  updateForeignKeys() {
    this.pesajesFacade.cargarForeignKeys()
      .subscribe((resp) => {
        this.coleccionForeignKeys = resp;
        //console.log(this.coleccionForeignKeys);
      });
  }
  */

}
