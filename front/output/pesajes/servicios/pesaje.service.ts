/**
 * @fileoverview PesajeService, clase encargada de la comunicacion con el BackEnd
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dysontilano@gmail.com>
 * Copyright (C) Dyson Parra
 *
 * @History
 * v1.0 – Se realizo la implementacion basica, basada en observadores reactivos
 * La primera versión de PesajeService fue escrita por Dyson A. Parra T.
 */
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
//import { Observable } from 'rxjs/Observable';
import { PesajeViewModel } from "../modelos/pesaje.model";
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
 * por ejemplo obtenerPesajes(), obtenerPesajesPaginados(), buscarPesajesPaginados,
 * guardarPesaje(), obtenerPesajeXModalidad(), actualizarPesaje(), eliminarPesaje()
 * @author Dyson Arley Parra Tilano dysontilano@gmail.com
 * @required pesaje.config.ts
 */
@Injectable({
  providedIn: 'root'
})
export class PesajeService extends BaseDataService {

  /**
   * Propiedad que indica el recurso a consumir.
   * @type {String}
   */

  //TODO: usar constante de configuracion local
  //API: string = `${this.apiServer.rules}servicio-pesaje/api/v1/Pesaje/`;
  API: string = `http://127.0.0.1:8080/api/v1/Pesaje`;
  //API: string = `https://pesajes-back.uc.r.appspot.com/api/v1/Pesaje`;

  private current: HttpHeaders = new HttpHeaders();

  /** @constructor */
  constructor(private httpAux: HttpClient) {
    super();
  }

  /**
   * @description Obtiene un listado de objetos tipo Pesaje.
   * @return {Observable<PesajeViewModel[]>}
   */
  obtenerPesajes(): Observable<PesajeViewModel[]> {
    return new Observable((observer) => {
      this.get<any>(this.API).then((res: any) => {
        console.log(res);
        //let aux = (res._embedded !== undefined) ? res._embedded.pesajeDTOList : [];
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
  * @description Obtiene un listado de objetos de tipo Pesaje.
  * @return {Observable<PesajeViewModel[]>}
  */
  obtener(req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return new Observable((observer) => {
      this.httpAux.get<PesajeViewModel[]>(`${this.API}/paginas`, { params: options, observe: 'response' }).toPromise()
        .then((res: HttpResponse<PesajeViewModel[]>) => {
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
  * @description Busca un listado de objetos de tipo Pesaje.
  * @return {Observable<PesajeViewModel[]>}
  */
  buscar(currentSearch: string, req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return new Observable((observer) => {
      this.httpAux.get<PesajeViewModel[]>(`${this.API}/${currentSearch}/paginas`, { params: options, observe: 'response' }).toPromise()
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
   * @description Obtiene un listado de objetos tipo de tipo Pesaje.
   * @return {Observable<PesajeViewModel[]>}
   */
  obtenerPesajesPaginados(size: number, page: number): Observable<PesajeViewModel[]> {
    return new Observable((observer) => {
      this.get<any>(`${this.API}/paginas?page=${page - 1}&size=${size}`).then((res: any) => {
        console.log(res);
        //let aux = (res._embedded !== undefined) ? res._embedded.pesajeDTOList : [];
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
   * @description Obtiene un listado de objetos de tipo Pesaje.
   * @return {Observable<PesajeViewModel[]>}
   */
  buscarPesajesPaginados(currentSearch: string, size: number, page: number): Observable<PesajeViewModel[]> {
    return new Observable((observer) => {
      this.get<any>(`${this.API}/${currentSearch}/paginas?page=${page - 1}&size=${size}`).then((res: any) => {
        console.log(res);
        //let aux = (res._embedded !== undefined) ? res._embedded.pesajeDTOList : [];
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
   * @description Obtiene un listado de objetos de tipo Pesaje.
   * @param {number} entidad, Objeto que sera almacenado por el BackEnd
   * @return {Observable<PesajeViewModel[]>}
   */
  obtenerPesajeXModalidad(entidad: number): Observable<PesajeViewModel[]> {
    return new Observable((observer) => {
      this.get<PesajeViewModel[]>(this.API + 'modalidad/' + entidad)
        .then((res: any) => {
          let list: any = null;
          /*
          if(res['_embedded'] !== undefined)
            list = res['_embedded']['pesajeDTOList'];
          */
          if (res._embedded !== undefined)
            list = res._embedded.pesajeDTOList;

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
   * @description Guarda un objeto de tipo Pesaje.
   * @param {PesajeViewModel} entidad, Objeto que sera almacenado por el BackEnd
   * @return {Observable<any>}
   */
  guardarPesaje(entidad: PesajeViewModel): Observable<any> {
    //entidad.intId = null;
    return new Observable((observer) => {
      this.post<PesajeViewModel>(this.API, entidad).then(r => {
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
   * @description Actualiza un objeto de tipo Pesaje.
   * @param {PesajeViewModel} entidad, objeto que sera actualizado por el BackEnd
   * @return {Observable<any>}
   */
  actualizarPesaje(entidad: PesajeViewModel): Observable<any> {
    return new Observable((observer) => {
      this.put<PesajeViewModel>(`${this.API}/${entidad.intId}`, entidad).then(r => {
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
   * @description Elimina un objeto de tipo Pesaje.
   * @param {string} id que sera Eliminado por el BackEnd
   * @return {Observable<any>}
   */
  eliminarPesaje(id: string): Observable<any> {
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
   * @description Convierte una respuesta http en un objeto tipo Pesaje.
   */
  private convertResponse(res: HttpResponse<PesajeViewModel[]>): ResponseWrapper {
    const jsonResponse = res.body;
    const result = [];
    if (jsonResponse != null)
      for (let i = 0; i < jsonResponse.length; i++)
        result.push(this.convertItemFromServer(jsonResponse[i]));

    return new ResponseWrapper(res.headers, result, 200);
  }

  /**
   * @description Convierte un JSON object en un objeto tipo Pesaje.
   */
  private convertItemFromServer(json: any): PesajeViewModel {
    const entity: PesajeViewModel = Object.assign(new PesajeViewModel(), json);
    //TODO: implementar conversion de fechas
    return entity;
  }
}
