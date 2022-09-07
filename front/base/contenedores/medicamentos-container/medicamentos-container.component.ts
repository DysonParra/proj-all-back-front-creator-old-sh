import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

import { BaseComponent } from '../../../esencial/componentes/base-component';
import { TayudoFacade } from '../../tayudo.facade';
import { MedicamentoViewModel } from '../../modelos/medicamento.model';

@Component({
  selector: 'app-medicamentos-container',
  templateUrl: './medicamentos-container.component.html',
  styleUrls: ['./medicamentos-container.component.css']
})
export class MedicamentosContainerComponent extends BaseComponent implements OnInit, OnDestroy {

  @Output() outVerMedicamento: EventEmitter<any> = new EventEmitter();

  items: MedicamentoViewModel[] = [];
  pageNumber: number = 0;
  pageSize: number = 20;
  medicamentosQuantity = 0;
  lastSearch: string = "";
  currentSearch: string = "";

  constructor(private tayudoFacade: TayudoFacade) {
    super();

    tayudoFacade.getMedicamentos$()
      .subscribe((resp) => {
        if (undefined != resp) {
          this.items = resp;
        }
      });
  }

  ngOnInit(): void {
    super.ngOnInit();
    //this.eventSubscriptions.push(this.tayudoFacade.cargarMedicamentosPaginados(this.pageSize, this.pageNumber).subscribe())
    this.eventSubscriptions.push(this.tayudoFacade.cargarMedicamentosPaginadosHeaders(this.pageSize, this.pageNumber));

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
      this.tayudoFacade.cargarMedicamentosPaginados(this.pageSize, this.pageNumber).subscribe();
    }
    else {
      console.log(`/${this.currentSearch}/paginas?page=${this.pageNumber}&size=${this.pageSize}`);
      //this.tayudoFacade.buscarMedicamentosPaginados(this.currentSearch, this.pageSize, this.pageNumber).subscribe();
      this.tayudoFacade.buscarMedicamentosPaginadosHeaders(this.currentSearch, this.pageSize, this.pageNumber);
    }
  }

  outVerMedicamentosQuantity(quantity: any) {
    this.medicamentosQuantity = quantity;
  }

  onSearch(search: any) {
    this.lastSearch = this.currentSearch;
    this.currentSearch = search.value;
    this.pageNumber = 1;

    console.log(`/${this.currentSearch}/paginas?page=${this.pageNumber}&size=${this.pageSize}`);

    // Se buscó "" y la anterior búsqueda no era "" (Se cargan todos los registros).
    if (this.currentSearch === "" && this.lastSearch !== this.currentSearch) {
      //this.tayudoFacade.cargarMedicamentosPaginados(this.pageSize, this.pageNumber).subscribe();
      this.tayudoFacade.cargarMedicamentosPaginadosHeaders(this.pageSize, this.pageNumber);
    }
    // No se buscó "" y la anterior búsqueda no es igual a la actual (Se realiza la búsqueda).
    else if (this.currentSearch !== "" && this.lastSearch !== this.currentSearch) {
      //this.tayudoFacade.buscarMedicamentosPaginados(this.currentSearch, this.pageSize, this.pageNumber).subscribe();
      this.tayudoFacade.buscarMedicamentosPaginadosHeaders(this.currentSearch, this.pageSize, this.pageNumber);
    }
  }
}