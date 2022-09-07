import { Component, OnInit } from '@angular/core';
import { stubTrue } from 'lodash';

@Component({
  selector: 'app-medicamentos-view',
  templateUrl: './medicamentos-view.component.html',
  styleUrls: ['./medicamentos-view.component.css']
})
export class MedicamentosViewComponent implements OnInit {

  popupVisible: any;
  popupDocVisible: any;
  base64Content: any;

  constructor() { }

  ngOnInit(): void {
  }

  mostrarDetalle(e: any) {
    this.popupVisible = !this.popupVisible;
  }

  mostrarContenido(e: any) {
    console.log(e);
    this.popupDocVisible = !this.popupDocVisible;
    this.base64Content = e;
  }
}
