/*
 * @fileoverview    {PesajesFacade} se encarga de la comunicacion con el BackEnd y la gestion de estados.
 *
 * @version         2.0
 *
 * @author          Dyson Arley Parra Tilano <dysontilano@gmail.com>
 *
 * @copyright       Dyson Parra
 * @see             github.com/DysonParra
 *
 * History
 * @version 1.0     Implementación realizada, basada en observadores reactivos.
 * @version 2.0     Documentación agregada.
 */
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { ResponseWrapper } from 'src/app/shared/models/response-wrapper.model';

import { FormularioPesajeService } from './servicios/formularioPesaje.service';
import { FormularioPesajeState } from './estados/formularioPesaje.state';
import { FormularioPesajeViewModel } from './modelos/formularioPesaje.model';

import { PesajeService } from './servicios/pesaje.service';
import { PesajeState } from './estados/pesaje.state';
import { PesajeViewModel } from './modelos/pesaje.model';

/**
 * @desc esta clase tendrá funciones para la interacción con los estados y los servicios
 * por ejemplo getMedicamentoActualizando$(), getMedicamentos(), cargarMedicamentos(), cargarMedicamentosPaginados(),
 * buscarMedicamentosPaginados(), cargarMedicamentosPaginadosHeaders(), buscarMedicamentosPaginadosHeaders()
 * agregarMedicamento(), actualizarMedicamento(), eliminarMedicamento()
 * @author Dyson Arley Parra Tilano dysontilano@gmail.com
 * @required medicamento.service, medicamento.state, medicamento.model
 */
@Injectable({
  providedIn: 'root'
})
export class PesajesFacade {
  constructor
    (
      private formularioPesajeService: FormularioPesajeService,
      private formularioPesajeState: FormularioPesajeState,
      private pesajeService: PesajeService,
      private pesajeState: PesajeState,
  ) {

  }

  /**
   * @description Obtiene un observable encargado de la evolucion de la entidad que se este ejecutando
   * @return {Observable<boolean>}
   */
  getFormularioPesajeActualizando$(): Observable<boolean> {
    return this.formularioPesajeState.getActualizando$();
  }

  /**
   * @description Obtiene un observable con el listado de objetos tipo FormularioPesaje
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  getFormulariosPesaje$(): Observable<FormularioPesajeViewModel[]> {
    // aquí solo pasamos el estado sin proyecciones
    // Puede suceder que sea necesario combinar dos o más flujos y exponerlos a los componentes.
    return this.formularioPesajeState.getFormulariosPesaje$();
  }

  /**
   * @description Obtiene un listado de objetos tipo FormularioPesaje que seran gestionados por una coleccion de estado
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  cargarFormulariosPesaje() {
    console.log('Cargando FormulariosPesaje...');
    return this.formularioPesajeService.obtenerFormulariosPesaje()
      .pipe(tap(response => this.formularioPesajeState.setFormulariosPesaje(response)));
  }

  /**
   * @description Obtiene un listado de objetos tipo FormularioPesaje que seran gestionados por una coleccion de estado
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  cargarFormulariosPesajePaginados(size: number, page: number) {
    console.log('Cargando FormulariosPesaje...');
    return this.formularioPesajeService.obtenerFormulariosPesajePaginados(size, page)
      .pipe(tap(response => this.formularioPesajeState.setFormulariosPesaje(response)));
  }

  /**
   * @description Obtiene un listado de objetos tipo FormularioPesaje que seran gestionados por una coleccion de estado
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  buscarFormulariosPesajePaginados(currentSearch: string, size: number, page: number) {
    console.log('Cargando FormulariosPesaje...');
    return this.formularioPesajeService.buscarFormulariosPesajePaginados(currentSearch, size, page)
      .pipe(tap(response => this.formularioPesajeState.setFormulariosPesaje(response)));
  }

  /**
   * @description Obtiene un listado de objetos tipo FormularioPesaje que seran gestionados por una coleccion de estado
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
   cargarFormulariosPesajePaginadosHeaders(size: number, page: number) {
    console.log('Cargando FormulariosPesaje...');
    return this.formularioPesajeService.obtener({
        page: page - 1,
        size: size,
        sort: "desc"}).subscribe(
        (res: ResponseWrapper) => {
          if (res != undefined) {
            this.formularioPesajeState.setFormulariosPesaje(res.json);
            //Obtengo la cantidad total
            console.log(res.headers.get('X-Total-Count'));
            this.formularioPesajeState.setCantidadFormulariosPesaje(parseInt(res.headers.get('X-Total-Count')));
          }
          else {
            this.formularioPesajeState.setFormulariosPesaje(undefined as any);
            console.log(0);
            this.formularioPesajeState.setCantidadFormulariosPesaje(0);
          }
        },
        (res: ResponseWrapper) => console.log(res.json)
    );
  }

  /**
   * @description Obtiene un listado de objetos tipo FormularioPesaje que seran gestionados por una coleccion de estado
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  buscarFormulariosPesajePaginadosHeaders(currentSearch: string, size: number, page: number) {
    console.log('Cargando FormulariosPesaje...');
    return this.formularioPesajeService.buscar(currentSearch, {
        page: page - 1,
        size: size,
        sort: "desc"}).subscribe(
        (res: ResponseWrapper) => {
          if (res != undefined) {
            this.formularioPesajeState.setFormulariosPesaje(res.json);
            //Obtengo la cantidad total
            console.log(res.headers.get('X-Total-Count'));
            this.formularioPesajeState.setCantidadFormulariosPesaje(parseInt(res.headers.get('X-Total-Count')));
          }
          else {
            this.formularioPesajeState.setFormulariosPesaje(undefined as any);
            console.log(0);
            this.formularioPesajeState.setCantidadFormulariosPesaje(0);
          }
        },
        (res: ResponseWrapper) => console.log(res.json)
    );
  }

  // Actualizacion optimista
  // 1. Actualiza el estado de la UI
  // 2. Invoca el API
  /**
   * @description Agrega un nuevo objeto a la coleccion de estado e invoca el API
   */
  agregarFormularioPesaje(requisito: FormularioPesajeViewModel) {
    return new Observable((observer) => {
      this.formularioPesajeService.guardarFormularioPesaje(requisito)
        .subscribe(
          (addedCategoryWithId: FormularioPesajeViewModel) => {
            // success callback - we have id generated by the server, let's update the state
            this.formularioPesajeState.actualizarFormularioPesajeXId(requisito, addedCategoryWithId);
            observer.next(addedCategoryWithId);
          },
          (error) => {
            // error callback - we need to rollback the state change
            this.formularioPesajeState.eliminarFormularioPesaje(requisito);
            console.log(error);
            observer.next(undefined);
          }
        );
      }
    );
  }

  // Actualizacion pesimista
  // 1. Invoca el API
  // 2. Actualiza el estado de la UI
  /**
   * @description Actualiza un objeto invoca el API y actualiza el objeto de la coleccion de estado
   */
  actualizarFormularioPesaje(requisito: FormularioPesajeViewModel) {
    return new Observable((observer) => {
      this.formularioPesajeState.setActualizando(true);
      this.formularioPesajeService.actualizarFormularioPesaje(requisito)
        .subscribe(
          (next) => {
            this.formularioPesajeState.actualizarFormularioPesaje(requisito)
            observer.next(next);
          }, (error) => {
            console.log(error);
            observer.next(undefined);
          },
          () => this.formularioPesajeState.setActualizando(false)
        );
    });
  }

  // Eliminación pesimista
  // 1. Invoca el API
  // 2. Actualiza el estado de la UI
  /**
   * @description Elimina un objeto invoca el API y remueve el objeto de la coleccion de estado
   */
  eliminarFormularioPesaje(requisito: FormularioPesajeViewModel) {
    return new Observable((observer) => {
      this.formularioPesajeState.setActualizando(true);
      this.formularioPesajeService.eliminarFormularioPesaje(requisito.intId.toString())
        .subscribe(
          (next) => {
            this.formularioPesajeState.eliminarFormularioPesaje(requisito)
            observer.next(next);
          }, (error) => {
            console.log(error);
            observer.next(undefined);
          },
          () => this.formularioPesajeState.setActualizando(false)
        );
    });
  }

  /**
   * @description Obtiene un observable encargado de la evolucion de la entidad que se este ejecutando
   * @return {Observable<boolean>}
   */
  getPesajeActualizando$(): Observable<boolean> {
    return this.pesajeState.getActualizando$();
  }

  /**
   * @description Obtiene un observable con el listado de objetos tipo Pesaje
   * @return {Observable<PesajeViewModel[]>}
   */
  getPesajes$(): Observable<PesajeViewModel[]> {
    // aquí solo pasamos el estado sin proyecciones
    // Puede suceder que sea necesario combinar dos o más flujos y exponerlos a los componentes.
    return this.pesajeState.getPesajes$();
  }

  /**
   * @description Obtiene un listado de objetos tipo Pesaje que seran gestionados por una coleccion de estado
   * @return {Observable<PesajeViewModel[]>}
   */
  cargarPesajes() {
    console.log('Cargando Pesajes...');
    return this.pesajeService.obtenerPesajes()
      .pipe(tap(response => this.pesajeState.setPesajes(response)));
  }

  /**
   * @description Obtiene un listado de objetos tipo Pesaje que seran gestionados por una coleccion de estado
   * @return {Observable<PesajeViewModel[]>}
   */
  cargarPesajesPaginados(size: number, page: number) {
    console.log('Cargando Pesajes...');
    return this.pesajeService.obtenerPesajesPaginados(size, page)
      .pipe(tap(response => this.pesajeState.setPesajes(response)));
  }

  /**
   * @description Obtiene un listado de objetos tipo Pesaje que seran gestionados por una coleccion de estado
   * @return {Observable<PesajeViewModel[]>}
   */
  buscarPesajesPaginados(currentSearch: string, size: number, page: number) {
    console.log('Cargando Pesajes...');
    return this.pesajeService.buscarPesajesPaginados(currentSearch, size, page)
      .pipe(tap(response => this.pesajeState.setPesajes(response)));
  }

  /**
   * @description Obtiene un listado de objetos tipo Pesaje que seran gestionados por una coleccion de estado
   * @return {Observable<PesajeViewModel[]>}
   */
   cargarPesajesPaginadosHeaders(size: number, page: number) {
    console.log('Cargando Pesajes...');
    return this.pesajeService.obtener({
        page: page - 1,
        size: size,
        sort: "desc"}).subscribe(
        (res: ResponseWrapper) => {
          if (res != undefined) {
            this.pesajeState.setPesajes(res.json);
            //Obtengo la cantidad total
            console.log(res.headers.get('X-Total-Count'));
            this.pesajeState.setCantidadPesajes(parseInt(res.headers.get('X-Total-Count')));
          }
          else {
            this.pesajeState.setPesajes(undefined as any);
            console.log(0);
            this.pesajeState.setCantidadPesajes(0);
          }
        },
        (res: ResponseWrapper) => console.log(res.json)
    );
  }

  /**
   * @description Obtiene un listado de objetos tipo Pesaje que seran gestionados por una coleccion de estado
   * @return {Observable<PesajeViewModel[]>}
   */
  buscarPesajesPaginadosHeaders(currentSearch: string, size: number, page: number) {
    console.log('Cargando Pesajes...');
    return this.pesajeService.buscar(currentSearch, {
        page: page - 1,
        size: size,
        sort: "desc"}).subscribe(
        (res: ResponseWrapper) => {
          if (res != undefined) {
            this.pesajeState.setPesajes(res.json);
            //Obtengo la cantidad total
            console.log(res.headers.get('X-Total-Count'));
            this.pesajeState.setCantidadPesajes(parseInt(res.headers.get('X-Total-Count')));
          }
          else {
            this.pesajeState.setPesajes(undefined as any);
            console.log(0);
            this.pesajeState.setCantidadPesajes(0);
          }
        },
        (res: ResponseWrapper) => console.log(res.json)
    );
  }

  // Actualizacion optimista
  // 1. Actualiza el estado de la UI
  // 2. Invoca el API
  /**
   * @description Agrega un nuevo objeto a la coleccion de estado e invoca el API
   */
  agregarPesaje(requisito: PesajeViewModel) {
    return new Observable((observer) => {
      this.pesajeService.guardarPesaje(requisito)
        .subscribe(
          (addedCategoryWithId: PesajeViewModel) => {
            // success callback - we have id generated by the server, let's update the state
            this.pesajeState.actualizarPesajeXId(requisito, addedCategoryWithId);
            observer.next(addedCategoryWithId);
          },
          (error) => {
            // error callback - we need to rollback the state change
            this.pesajeState.eliminarPesaje(requisito);
            console.log(error);
            observer.next(undefined);
          }
        );
      }
    );
  }

  // Actualizacion pesimista
  // 1. Invoca el API
  // 2. Actualiza el estado de la UI
  /**
   * @description Actualiza un objeto invoca el API y actualiza el objeto de la coleccion de estado
   */
  actualizarPesaje(requisito: PesajeViewModel) {
    return new Observable((observer) => {
      this.pesajeState.setActualizando(true);
      this.pesajeService.actualizarPesaje(requisito)
        .subscribe(
          (next) => {
            this.pesajeState.actualizarPesaje(requisito)
            observer.next(next);
          }, (error) => {
            console.log(error);
            observer.next(undefined);
          },
          () => this.pesajeState.setActualizando(false)
        );
    });
  }

  // Eliminación pesimista
  // 1. Invoca el API
  // 2. Actualiza el estado de la UI
  /**
   * @description Elimina un objeto invoca el API y remueve el objeto de la coleccion de estado
   */
  eliminarPesaje(requisito: PesajeViewModel) {
    return new Observable((observer) => {
      this.pesajeState.setActualizando(true);
      this.pesajeService.eliminarPesaje(requisito.intId.toString())
        .subscribe(
          (next) => {
            this.pesajeState.eliminarPesaje(requisito)
            observer.next(next);
          }, (error) => {
            console.log(error);
            observer.next(undefined);
          },
          () => this.pesajeState.setActualizando(false)
        );
    });
  }

}