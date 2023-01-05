/*
 * @fileoverview    {MedicamentoState} se encarga del manejo de estados en los datos obtenidos desde el BackEnd.
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
import { MedicamentoViewModel } from "../modelos/medicamento.model";
/**
 * @desc esta clase tendrá funciones para la interacción con el BackEnd
 * por ejemplo getActualizando$(), setActualizando(), getMedicamentos$(), setMedicamentos(), getMedicamento(), setMedicamento(),
 * agregarMedicamento(), actualizarMedicamento(), actualizarMedicamentoXId(), eliminarMedicamento(), getCantidadMedicamentos(), setCantidadMedicamentos()
 * @author Dyson Arley Parra Tilano dysontilano@gmail.com
 * @required medicamento.config.ts
 */
@Injectable({
  providedIn: 'root'
})
export class MedicamentoState {
  private actualizando$ = new BehaviorSubject<boolean>(false);
  private medicamentoSubject$ = new BehaviorSubject<MedicamentoViewModel[]>(null as any);
  private medicamentoActualSubject$ = new BehaviorSubject<MedicamentoViewModel>(null as any);
  private cantidadMedicamentos$ = new BehaviorSubject<number>(null as any);

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
   * @description Obtiene un observable con la lista de objetos tipo Medicamento existentes.
   * @return {Observable<MedicamentoViewModel[]>}
   */
  getMedicamentos$() {
    return this.medicamentoSubject$.asObservable();
  }

  /**
   * @description Establece una lista de objetos tipo Medicamento a ser gestionados.
   * @param {MedicamentoViewModel[]} coleccion de objetos que sera gestionado
   */
  setMedicamentos(entidades: MedicamentoViewModel[]) {
    console.log('estados...');
    console.log(entidades);
    this.medicamentoSubject$.next(entidades);
  }

  /**
   * @description Obtiene un observable con la lista de objetos tipo Medicamento existentes.
   * @return {Observable<MedicamentoViewModel>}
   */
  getMedicamento$() {
    return this.medicamentoActualSubject$.asObservable();
  }

  /**
   * @description Establece una lista de objetos tipo Medicamento a ser gestionados.
   * @param {MedicamentoViewModel[]} coleccion de objetos que sera gestionado
   */
  setMedicamento(entidad: MedicamentoViewModel) {
    console.log('estados...');
    console.log(entidad);
    this.medicamentoActualSubject$.next(entidad);
  }

  /**
   * @description Agrega un objeto tipo Medicamento a la gestion realizada por estados
   * @param {MedicamentoViewModel} objeto que sera agregado y gestionado
   */
  agregarMedicamento(entidad: MedicamentoViewModel) {
    const valorActual = this.medicamentoSubject$.getValue();
    this.medicamentoSubject$.next([...valorActual, entidad]);
  }

  /**
   * @description Agrega un objeto tipo Medicamento que sera actualizado en la gestion realizada por estados
   * @param {MedicamentoViewModel} objeto que sera actualizado y gestionado
   */
  actualizarMedicamento(entidadActualizar: MedicamentoViewModel) {
    const entidades = this.medicamentoSubject$.getValue();
    if (entidades != undefined) {
      const indiceActualizar = entidades.findIndex(entidad => entidad.intId === entidadActualizar.intId);
      entidades[indiceActualizar] = entidadActualizar;
      this.medicamentoSubject$.next([...entidades]);
    } else
      this.medicamentoSubject$.next([]);
  }

  /**
   * @description Inserta o clona un objeto tipo Medicamento en la gestion realizada por estados
   * @param {MedicamentoViewModel} objeto que sera actualizado y gestionado
   */
  actualizarMedicamentoXId(entidadReemplazar: MedicamentoViewModel, entidadAgregarXId: MedicamentoViewModel) {
    const entidades = this.medicamentoSubject$.getValue();
    if (entidades != undefined) {
      const indiceLocalizado = entidades.findIndex(entidad => entidad === entidadReemplazar);
      entidades[indiceLocalizado] = entidadAgregarXId;
      this.medicamentoSubject$.next([...entidades]);
    } else
      this.medicamentoSubject$.next([]);
  }

  /**
   * @description Remueve un objeto tipo Medicamento de la gestion realizada por estados
   * @param {MedicamentoViewModel} objeto que sera removido y gestionado
   */
  eliminarMedicamento(entidadEliminar: MedicamentoViewModel) {
    const valorActual = this.medicamentoSubject$.getValue();
    this.medicamentoSubject$.next(valorActual.filter(entidad => entidad !== entidadEliminar));
  }

  /**
   * @description Obtiene la cantidad de objetos tipo Medicamento de la gestion realizada por estados
   * @return {Observable<number>}
   */
  getCantidadMedicamentos() {
    return this.cantidadMedicamentos$.asObservable();
  }

  /**
   * @description Almecena la cantidad de objetos tipo Medicamento en la gestion realizada por estados
   * @param {number} objeto es la nueva cantidad de objetos tipo Medicamento.
   */
  setCantidadMedicamentos(nuevaCantidad: number) {
    this.cantidadMedicamentos$.next(nuevaCantidad);
  }
}
