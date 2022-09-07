import { Component, OnInit } from '@angular/core';
import { stubTrue } from 'lodash';

@Component({
  selector: 'app-formulariosPesaje-view',
  templateUrl: './formulariosPesaje-view.component.html',
  styleUrls: ['./formulariosPesaje-view.component.css']
})
export class FormulariosPesajeViewComponent implements OnInit {

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
