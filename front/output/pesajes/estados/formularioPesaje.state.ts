/*
 * @fileoverview    {FormularioPesajeState} se encarga del manejo de estados en los datos obtenidos desde el BackEnd.
 *
 * @version         2.0
 *
 * @author          Dyson Arley Parra Tilano <dysontilano@gmail.com>
 *
 * @copyright       Dyson Parra
 * @see             github.com/DysonParra
 *
 * History
 * @version 1.0     Implementación realizada.
 * @version 2.0     Documentación agregada.
 */
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FormularioPesajeViewModel } from "../modelos/formularioPesaje.model";
/**
 * @desc esta clase tendrá funciones para la interacción con el BackEnd
 * por ejemplo getActualizando$(), setActualizando(), getFormulariosPesaje$(), setFormulariosPesaje(), getFormularioPesaje(), setFormularioPesaje(),
 * agregarFormularioPesaje(), actualizarFormularioPesaje(), actualizarFormularioPesajeXId(), eliminarFormularioPesaje(), getCantidadFormulariosPesaje(), setCantidadFormulariosPesaje()
 * @author Dyson Arley Parra Tilano dysontilano@gmail.com
 * @required formularioPesaje.config.ts
 */
@Injectable({
  providedIn: 'root'
})
export class FormularioPesajeState {
  private actualizando$ = new BehaviorSubject<boolean>(false);
  private formularioPesajeSubject$ = new BehaviorSubject<FormularioPesajeViewModel[]>(null as any);
  private formularioPesajeActualSubject$ = new BehaviorSubject<FormularioPesajeViewModel>(null as any);
  private cantidadFormulariosPesaje$ = new BehaviorSubject<number>(null as any);

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
   * @description Obtiene un observable con la lista de objetos tipo FormularioPesaje existentes.
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  getFormulariosPesaje$() {
    return this.formularioPesajeSubject$.asObservable();
  }

  /**
   * @description Establece una lista de objetos tipo FormularioPesaje a ser gestionados.
   * @param {FormularioPesajeViewModel[]} coleccion de objetos que sera gestionado
   */
  setFormulariosPesaje(entidades: FormularioPesajeViewModel[]) {
    console.log('estados...');
    console.log(entidades);
    this.formularioPesajeSubject$.next(entidades);
  }

  /**
   * @description Obtiene un observable con la lista de objetos tipo FormularioPesaje existentes.
   * @return {Observable<FormularioPesajeViewModel>}
   */
  getFormularioPesaje$() {
    return this.formularioPesajeActualSubject$.asObservable();
  }

  /**
   * @description Establece una lista de objetos tipo FormularioPesaje a ser gestionados.
   * @param {FormularioPesajeViewModel[]} coleccion de objetos que sera gestionado
   */
  setFormularioPesaje(entidad: FormularioPesajeViewModel) {
    console.log('estados...');
    console.log(entidad);
    this.formularioPesajeActualSubject$.next(entidad);
  }

  /**
   * @description Agrega un objeto tipo FormularioPesaje a la gestion realizada por estados
   * @param {FormularioPesajeViewModel} objeto que sera agregado y gestionado
   */
  agregarFormularioPesaje(entidad: FormularioPesajeViewModel) {
    const valorActual = this.formularioPesajeSubject$.getValue();
    this.formularioPesajeSubject$.next([...valorActual, entidad]);
  }

  /**
   * @description Agrega un objeto tipo FormularioPesaje que sera actualizado en la gestion realizada por estados
   * @param {FormularioPesajeViewModel} objeto que sera actualizado y gestionado
   */
  actualizarFormularioPesaje(entidadActualizar: FormularioPesajeViewModel) {
    const entidades = this.formularioPesajeSubject$.getValue();
    if (entidades != undefined) {
      const indiceActualizar = entidades.findIndex(entidad => entidad.intId === entidadActualizar.intId);
      entidades[indiceActualizar] = entidadActualizar;
      this.formularioPesajeSubject$.next([...entidades]);
    } else
      this.formularioPesajeSubject$.next([]);
  }

  /**
   * @description Inserta o clona un objeto tipo FormularioPesaje en la gestion realizada por estados
   * @param {FormularioPesajeViewModel} objeto que sera actualizado y gestionado
   */
  actualizarFormularioPesajeXId(entidadReemplazar: FormularioPesajeViewModel, entidadAgregarXId: FormularioPesajeViewModel) {
    const entidades = this.formularioPesajeSubject$.getValue();
    if (entidades != undefined) {
      const indiceLocalizado = entidades.findIndex(entidad => entidad === entidadReemplazar);
      entidades[indiceLocalizado] = entidadAgregarXId;
      this.formularioPesajeSubject$.next([...entidades]);
    } else
      this.formularioPesajeSubject$.next([]);
  }

  /**
   * @description Remueve un objeto tipo FormularioPesaje de la gestion realizada por estados
   * @param {FormularioPesajeViewModel} objeto que sera removido y gestionado
   */
  eliminarFormularioPesaje(entidadEliminar: FormularioPesajeViewModel) {
    const valorActual = this.formularioPesajeSubject$.getValue();
    this.formularioPesajeSubject$.next(valorActual.filter(entidad => entidad !== entidadEliminar));
  }

  /**
   * @description Obtiene la cantidad de objetos tipo FormularioPesaje de la gestion realizada por estados
   * @return {Observable<number>}
   */
  getCantidadFormulariosPesaje() {
    return this.cantidadFormulariosPesaje$.asObservable();
  }

  /**
   * @description Almecena la cantidad de objetos tipo FormularioPesaje en la gestion realizada por estados
   * @param {number} objeto es la nueva cantidad de objetos tipo FormularioPesaje.
   */
  setCantidadFormulariosPesaje(nuevaCantidad: number) {
    this.cantidadFormulariosPesaje$.next(nuevaCantidad);
  }
}
