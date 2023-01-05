/*
 * @fileoverview    {PesajeState} se encarga del manejo de estados en los datos obtenidos desde el BackEnd.
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
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PesajeViewModel } from "../modelos/pesaje.model";
/**
 * @desc esta clase tendrá funciones para la interacción con el BackEnd
 * por ejemplo getActualizando$(), setActualizando(), getPesajes$(), setPesajes(), getPesaje(), setPesaje(),
 * agregarPesaje(), actualizarPesaje(), actualizarPesajeXId(), eliminarPesaje(), getCantidadPesajes(), setCantidadPesajes()
 * @author Dyson Arley Parra Tilano dysontilano@gmail.com
 * @required pesaje.config.ts
 */
@Injectable({
  providedIn: 'root'
})
export class PesajeState {
  private actualizando$ = new BehaviorSubject<boolean>(false);
  private pesajeSubject$ = new BehaviorSubject<PesajeViewModel[]>(null as any);
  private pesajeActualSubject$ = new BehaviorSubject<PesajeViewModel>(null as any);
  private cantidadPesajes$ = new BehaviorSubject<number>(null as any);

  /**
   * @description Obtiene un valor booleano indicando si el estado esta en actualizando o no
   * @return {Observable<Boolean>}
   */
  getActualizando$() {
    return this.actualizando$.asObservable();
  }

  /**
   * @description Estable un valor booleano indicando si el estado esta en actualizando o no
   */
  setActualizando(actualizando: boolean) {
    this.actualizando$.next(actualizando);
  }

  /**
   * @description Obtiene un observable con la lista de objetos tipo Pesaje existentes.
   * @return {Observable<PesajeViewModel[]>}
   */
  getPesajes$() {
    return this.pesajeSubject$.asObservable();
  }

  /**
   * @description Establece una lista de objetos tipo Pesaje a ser gestionados.
   * @param {PesajeViewModel[]} coleccion de objetos que sera gestionado
   */
  setPesajes(entidades: PesajeViewModel[]) {
    console.log('estados...');
    console.log(entidades);
    this.pesajeSubject$.next(entidades);
  }

  /**
   * @description Obtiene un observable con la lista de objetos tipo Pesaje existentes.
   * @return {Observable<PesajeViewModel>}
   */
  getPesaje$() {
    return this.pesajeActualSubject$.asObservable();
  }

  /**
   * @description Establece una lista de objetos tipo Pesaje a ser gestionados.
   * @param {PesajeViewModel[]} coleccion de objetos que sera gestionado
   */
  setPesaje(entidad: PesajeViewModel) {
    console.log('estados...');
    console.log(entidad);
    this.pesajeActualSubject$.next(entidad);
  }

  /**
   * @description Agrega un objeto tipo Pesaje a la gestion realizada por estados
   * @param {PesajeViewModel} objeto que sera agregado y gestionado
   */
  agregarPesaje(entidad: PesajeViewModel) {
    const valorActual = this.pesajeSubject$.getValue();
    this.pesajeSubject$.next([...valorActual, entidad]);
  }

  /**
   * @description Agrega un objeto tipo Pesaje que sera actualizado en la gestion realizada por estados
   * @param {PesajeViewModel} objeto que sera actualizado y gestionado
   */
  actualizarPesaje(entidadActualizar: PesajeViewModel) {
    const entidades = this.pesajeSubject$.getValue();
    if (entidades != undefined) {
      const indiceActualizar = entidades.findIndex(entidad => entidad.intId === entidadActualizar.intId);
      entidades[indiceActualizar] = entidadActualizar;
      this.pesajeSubject$.next([...entidades]);
    } else
      this.pesajeSubject$.next([]);
  }

  /**
   * @description Inserta o clona un objeto tipo Pesaje en la gestion realizada por estados
   * @param {PesajeViewModel} objeto que sera actualizado y gestionado
   */
  actualizarPesajeXId(entidadReemplazar: PesajeViewModel, entidadAgregarXId: PesajeViewModel) {
    const entidades = this.pesajeSubject$.getValue();
    if (entidades != undefined) {
      const indiceLocalizado = entidades.findIndex(entidad => entidad === entidadReemplazar);
      entidades[indiceLocalizado] = entidadAgregarXId;
      this.pesajeSubject$.next([...entidades]);
    } else
      this.pesajeSubject$.next([]);
  }

  /**
   * @description Remueve un objeto tipo Pesaje de la gestion realizada por estados
   * @param {PesajeViewModel} objeto que sera removido y gestionado
   */
  eliminarPesaje(entidadEliminar: PesajeViewModel) {
    const valorActual = this.pesajeSubject$.getValue();
    this.pesajeSubject$.next(valorActual.filter(entidad => entidad !== entidadEliminar));
  }

  /**
   * @description Obtiene la cantidad de objetos tipo Pesaje de la gestion realizada por estados
   * @return {Observable<number>}
   */
  getCantidadPesajes() {
    return this.cantidadPesajes$.asObservable();
  }

  /**
   * @description Almecena la cantidad de objetos tipo Pesaje en la gestion realizada por estados
   * @param {number} objeto es la nueva cantidad de objetos tipo Pesaje.
   */
  setCantidadPesajes(nuevaCantidad: number) {
    this.cantidadPesajes$.next(nuevaCantidad);
  }
}
