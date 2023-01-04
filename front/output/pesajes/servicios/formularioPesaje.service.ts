/**
 * @fileoverview FormularioPesajeService, clase encargada de la comunicacion con el BackEnd
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History
 * v1.0 – Se realizo la implementacion basica, basada en observadores reactivos
 * La primera versión de FormularioPesajeService fue escrita por Dyson A. Parra T.
 */
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
//import { Observable } from 'rxjs/Observable';
import { FormularioPesajeViewModel } from "../modelos/formularioPesaje.model";
import { BaseDataService } from "../../../shared/servicios/base-data.service";
import { ResponseWrapper } from 'src/app/shared/models/response-wrapper.model';
import { createRequestOption } from 'src/app/shared/models/request-util';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

interface IPostOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe: 'response';
}

/**
 * @desc esta clase tendrá funciones para la interacción con el BackEnd
 * por ejemplo obtenerFormulariosPesaje(), obtenerFormulariosPesajePaginados(), buscarFormulariosPesajePaginados,
 * guardarFormularioPesaje(), obtenerFormularioPesajeXModalidad(), actualizarFormularioPesaje(), eliminarFormularioPesaje()
 * @author Dyson Arley Parra Tilano dysontilano@gmail.com
 * @required formularioPesaje.config.ts
 */
@Injectable({
  providedIn: 'root'
})
export class FormularioPesajeService extends BaseDataService {

  /**
   * Propiedad que indica el recurso a consumir.
   * @type {String}
   */

  //TODO: usar constante de configuracion local
  //API: string = `${this.apiServer.rules}servicio-formularioPesaje/api/v1/FormularioPesaje/`;
  API: string = `http://127.0.0.1:8080/api/v1/FormularioPesaje`;
  //API: string = `https://pesajes-back.uc.r.appspot.com/api/v1/FormularioPesaje`;

  private current: HttpHeaders = new HttpHeaders();

  /** @constructor */
  constructor(private httpAux: HttpClient) {
    super();
  }

  /**
   * @description Obtiene un listado de objetos tipo FormularioPesaje.
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  obtenerFormulariosPesaje(): Observable<FormularioPesajeViewModel[]> {
    return new Observable((observer) => {
      this.get<any>(this.API).then((res: any) => {
        console.log(res);
        //let aux = (res._embedded !== undefined) ? res._embedded.formularioPesajeDTOList : [];
        let aux = (res !== undefined) ? res : [];
        observer.next(aux);
        observer.complete();
      }, (error) => {
        console.log('HTTP Error', error);
        observer.next(undefined);
        observer.complete();
      });
    });
  }

  /**
  * @description Obtiene un listado de objetos de tipo FormularioPesaje.
  * @return {Observable<FormularioPesajeViewModel[]>}
  */
  obtener(req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return new Observable((observer) => {
      this.httpAux.get<FormularioPesajeViewModel[]>(`${this.API}/paginas`, { params: options, observe: 'response' }).toPromise()
        .then((res: HttpResponse<FormularioPesajeViewModel[]>) => {
          observer.next(this.convertResponse(res));
          observer.complete();
        }, (error) => {
          console.log('HTTP Error', error);
          observer.next(undefined);
          observer.complete();
        });
    });
  }

  /**
  * @description Busca un listado de objetos de tipo FormularioPesaje.
  * @return {Observable<FormularioPesajeViewModel[]>}
  */
  buscar(currentSearch: string, req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return new Observable((observer) => {
      this.httpAux.get<FormularioPesajeViewModel[]>(`${this.API}/${currentSearch}/paginas`, { params: options, observe: 'response' }).toPromise()
        .then((res: any) => {
          observer.next(this.convertResponse(res));
          observer.complete();
        }, (error) => {
          console.log('HTTP Error', error);
          observer.next(undefined);
          observer.complete();
        });
    });
  }

  /**
   * @description Obtiene un listado de objetos tipo de tipo FormularioPesaje.
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  obtenerFormulariosPesajePaginados(size: number, page: number): Observable<FormularioPesajeViewModel[]> {
    return new Observable((observer) => {
      this.get<any>(`${this.API}/paginas?page=${page - 1}&size=${size}`).then((res: any) => {
        console.log(res);
        //let aux = (res._embedded !== undefined) ? res._embedded.formularioPesajeDTOList : [];
        let aux = (res !== undefined) ? res : [];
        observer.next(aux);
        observer.complete();
      }, (error) => {
        console.log('HTTP Error', error)
        observer.next(undefined);
        observer.complete();
      });
    });
  }

  /**
   * @description Obtiene un listado de objetos de tipo FormularioPesaje.
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  buscarFormulariosPesajePaginados(currentSearch: string, size: number, page: number): Observable<FormularioPesajeViewModel[]> {
    return new Observable((observer) => {
      this.get<any>(`${this.API}/${currentSearch}/paginas?page=${page - 1}&size=${size}`).then((res: any) => {
        console.log(res);
        //let aux = (res._embedded !== undefined) ? res._embedded.formularioPesajeDTOList : [];
        let aux = (res !== undefined) ? res : [];
        observer.next(aux);
        observer.complete();
      }, (error) => {
        console.log('HTTP Error', error)
        observer.next(undefined);
        observer.complete();
      });
    });
  }

  /**
   * @description Obtiene un listado de objetos de tipo FormularioPesaje.
   * @param {number} entidad, Objeto que sera almacenado por el BackEnd
   * @return {Observable<FormularioPesajeViewModel[]>}
   */
  obtenerFormularioPesajeXModalidad(entidad: number): Observable<FormularioPesajeViewModel[]> {
    return new Observable((observer) => {
      this.get<FormularioPesajeViewModel[]>(this.API + 'modalidad/' + entidad)
        .then((res: any) => {
          let list: any = null;
          /*
          if(res['_embedded'] !== undefined)
            list = res['_embedded']['formularioPesajeDTOList'];
          */
          if (res._embedded !== undefined)
            list = res._embedded.formularioPesajeDTOList;

          observer.next(list);
          observer.complete();
        }, (error) => {
          console.log(error)
          observer.next(undefined);
          observer.complete();
        });
    });
  }

  /**
   * @description Guarda un objeto de tipo FormularioPesaje.
   * @param {FormularioPesajeViewModel} entidad, Objeto que sera almacenado por el BackEnd
   * @return {Observable<any>}
   */
  guardarFormularioPesaje(entidad: FormularioPesajeViewModel): Observable<any> {
    //entidad.intId = null;
    return new Observable((observer) => {
      this.post<FormularioPesajeViewModel>(this.API, entidad).then(r => {
        observer.next(r);
        observer.complete();
      }, (error) => {
        console.log(error)
        observer.next(undefined);
        observer.complete();
      });
    });
  }

  /**
   * @description Actualiza un objeto de tipo FormularioPesaje.
   * @param {FormularioPesajeViewModel} entidad, objeto que sera actualizado por el BackEnd
   * @return {Observable<any>}
   */
  actualizarFormularioPesaje(entidad: FormularioPesajeViewModel): Observable<any> {
    return new Observable((observer) => {
      this.put<FormularioPesajeViewModel>(`${this.API}/${entidad.intId}`, entidad).then(r => {
        observer.next(r);
        observer.complete();
      }, (error) => {
        console.log(error)
        observer.next(undefined);
        observer.complete();
      });
    });
  }

  /**
   * @description Elimina un objeto de tipo FormularioPesaje.
   * @param {string} id que sera Eliminado por el BackEnd
   * @return {Observable<any>}
   */
  eliminarFormularioPesaje(id: string): Observable<any> {
    return new Observable((observer) => {
      this.delete(`${this.API}/${id}`, null).then(r => {
        observer.next(id);
        observer.complete();
      }, (error) => {
        console.log(error)
        observer.next(undefined);
        observer.complete();
      });
    });
  }

  /**
   * @description Convierte una respuesta http en un objeto tipo FormularioPesaje.
   */
  private convertResponse(res: HttpResponse<FormularioPesajeViewModel[]>): ResponseWrapper {
    const jsonResponse = res.body;
    const result = [];
    if (jsonResponse != null)
      for (let i = 0; i < jsonResponse.length; i++)
        result.push(this.convertItemFromServer(jsonResponse[i]));

    return new ResponseWrapper(res.headers, result, 200);
  }

  /**
   * @description Convierte un JSON object en un objeto tipo FormularioPesaje.
   */
  private convertItemFromServer(json: any): FormularioPesajeViewModel {
    const entity: FormularioPesajeViewModel = Object.assign(new FormularioPesajeViewModel(), json);
    //TODO: implementar conversion de fechas
    return entity;
  }
}
