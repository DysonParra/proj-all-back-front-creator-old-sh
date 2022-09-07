import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

import { BaseComponent } from '../../../esencial/componentes/base-component';
import { PesajesFacade } from '../../pesajes.facade';
import { PesajeViewModel } from '../../modelos/pesaje.model';

@Component({
  selector: 'app-pesajes-container',
  templateUrl: './pesajes-container.component.html',
  styleUrls: ['./pesajes-container.component.css']
})
export class PesajesContainerComponent extends BaseComponent implements OnInit, OnDestroy {

  @Output() outVerPesaje: EventEmitter<any> = new EventEmitter();

  items: PesajeViewModel[] = [];
  pageNumber: number = 0;
  pageSize: number = 20;
  pesajesQuantity = 0;
  lastSearch: string = "";
  currentSearch: string = "";

  constructor(private pesajesFacade: PesajesFacade) {
    super();

    pesajesFacade.getPesajes$()
      .subscribe((resp) => {
        if (undefined != resp) {
          this.items = resp;
        }
      });
  }

  ngOnInit(): void {
    super.ngOnInit();
    //this.eventSubscriptions.push(this.pesajesFacade.cargarPesajesPaginados(this.pageSize, this.pageNumber).subscribe())
    this.eventSubscriptions.push(this.pesajesFacade.cargarPesajesPaginadosHeaders(this.pageSize, this.pageNumber));

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
      this.pesajesFacade.cargarPesajesPaginados(this.pageSize, this.pageNumber).subscribe();
    }
    else {
      console.log(`/${this.currentSearch}/paginas?page=${this.pageNumber}&size=${this.pageSize}`);
      //this.pesajesFacade.buscarPesajesPaginados(this.currentSearch, this.pageSize, this.pageNumber).subscribe();
      this.pesajesFacade.buscarPesajesPaginadosHeaders(this.currentSearch, this.pageSize, this.pageNumber);
    }
  }

  outVerPesajesQuantity(quantity: any) {
    this.pesajesQuantity = quantity;
  }

  onSearch(search: any) {
    this.lastSearch = this.currentSearch;
    this.currentSearch = search.value;
    this.pageNumber = 1;

    console.log(`/${this.currentSearch}/paginas?page=${this.pageNumber}&size=${this.pageSize}`);

    // Se buscó "" y la anterior búsqueda no era "" (Se cargan todos los registros).
    if (this.currentSearch === "" && this.lastSearch !== this.currentSearch) {
      //this.pesajesFacade.cargarPesajesPaginados(this.pageSize, this.pageNumber).subscribe();
      this.pesajesFacade.cargarPesajesPaginadosHeaders(this.pageSize, this.pageNumber);
    }
    // No se buscó "" y la anterior búsqueda no es igual a la actual (Se realiza la búsqueda).
    else if (this.currentSearch !== "" && this.lastSearch !== this.currentSearch) {
      //this.pesajesFacade.buscarPesajesPaginados(this.currentSearch, this.pageSize, this.pageNumber).subscribe();
      this.pesajesFacade.buscarPesajesPaginadosHeaders(this.currentSearch, this.pageSize, this.pageNumber);
    }
  }
}
