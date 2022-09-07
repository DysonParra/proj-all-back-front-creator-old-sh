import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

import { BaseComponent } from '../../../esencial/componentes/base-component';
import { PesajesFacade } from '../../pesajes.facade';
import { FormularioPesajeViewModel } from '../../modelos/formularioPesaje.model';

@Component({
  selector: 'app-formulariosPesaje-container',
  templateUrl: './formulariosPesaje-container.component.html',
  styleUrls: ['./formulariosPesaje-container.component.css']
})
export class FormulariosPesajeContainerComponent extends BaseComponent implements OnInit, OnDestroy {

  @Output() outVerFormularioPesaje: EventEmitter<any> = new EventEmitter();

  items: FormularioPesajeViewModel[] = [];
  pageNumber: number = 0;
  pageSize: number = 20;
  formulariosPesajeQuantity = 0;
  lastSearch: string = "";
  currentSearch: string = "";

  constructor(private pesajesFacade: PesajesFacade) {
    super();

    pesajesFacade.getFormulariosPesaje$()
      .subscribe((resp) => {
        if (undefined != resp) {
          this.items = resp;
        }
      });
  }

  ngOnInit(): void {
    super.ngOnInit();
    //this.eventSubscriptions.push(this.pesajesFacade.cargarFormulariosPesajePaginados(this.pageSize, this.pageNumber).subscribe())
    this.eventSubscriptions.push(this.pesajesFacade.cargarFormulariosPesajePaginadosHeaders(this.pageSize, this.pageNumber));

    this.setOnInitComplete();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onChangePage(page: any) {
    this.pageSize = page.pageSize;
    this.pageNumber = page.pageNumber;
    if(this.currentSearch === "") {
      console.log(`paginas?page=${this.pageNumber}&size=${this.pageSize}`);
      this.pesajesFacade.cargarFormulariosPesajePaginados(this.pageSize, this.pageNumber).subscribe();
    }
    else {
      console.log(`/${this.currentSearch}/paginas?page=${this.pageNumber}&size=${this.pageSize}`);
      //this.pesajesFacade.buscarFormulariosPesajePaginados(this.currentSearch, this.pageSize, this.pageNumber).subscribe();
      this.pesajesFacade.buscarFormulariosPesajePaginadosHeaders(this.currentSearch, this.pageSize, this.pageNumber);
    }
  }

  outVerFormulariosPesajeQuantity(quantity: any) {
    this.formulariosPesajeQuantity = quantity;
  }

  onSearch(search: any) {
    this.lastSearch = this.currentSearch;
    this.currentSearch = search.value;
    this.pageNumber = 1;

    console.log(`/${this.currentSearch}/paginas?page=${this.pageNumber}&size=${this.pageSize}`);

    // Se buscó "" y la anterior búsqueda no era "" (Se cargan todos los registros).
    if (this.currentSearch === "" && this.lastSearch !== this.currentSearch) {
      //this.pesajesFacade.cargarFormulariosPesajePaginados(this.pageSize, this.pageNumber).subscribe();
      this.pesajesFacade.cargarFormulariosPesajePaginadosHeaders(this.pageSize, this.pageNumber);
    }
    // No se buscó "" y la anterior búsqueda no es igual a la actual (Se realiza la búsqueda).
    else if (this.currentSearch !== "" && this.lastSearch !== this.currentSearch) {
      //this.pesajesFacade.buscarFormulariosPesajePaginados(this.currentSearch, this.pageSize, this.pageNumber).subscribe();
      this.pesajesFacade.buscarFormulariosPesajePaginadosHeaders(this.currentSearch, this.pageSize, this.pageNumber);
    }
  }
}
