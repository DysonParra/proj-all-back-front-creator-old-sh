/*
 * @fileoverview    {MedicamentoService} se encarga de la comunicacion con el BackEnd.
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
import { Observable } from "rxjs";
//import { Observable } from 'rxjs/Observable';
import { MedicamentoViewModel } from "../modelos/medicamento.model";
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
 * por ejemplo obtenerMedicamentos(), obtenerMedicamentosPaginados(), buscarMedicamentosPaginados,
 * guardarMedicamento(), obtenerMedicamentoXModalidad(), actualizarMedicamento(), eliminarMedicamento()
 * @author Dyson Arley Parra Tilano dysontilano@gmail.com
 * @required medicamento.config.ts
 */
@Injectable({
  providedIn: 'root'
})
export class MedicamentoService extends BaseDataService {

  /**
   * Propiedad que indica el recurso a consumir.
   * @type {String}
   */

  //TODO: usar constante de configuracion local
  //API: string = `${this.apiServer.rules}servicio-medicamento/api/v1/Medicamento/`;
  API: string = `http://127.0.0.1:8080/api/v1/Medicamento`;
  //API: string = `https://tayudo-back.uc.r.appspot.com/api/v1/Medicamento`;

  private current: HttpHeaders = new HttpHeaders();

  /** @constructor */
  constructor(private httpAux: HttpClient) {
    super();
  }

  /**
   * @description Obtiene un listado de objetos tipo Medicamento.
   * @return {Observable<MedicamentoViewModel[]>}
   */
  obtenerMedicamentos(): Observable<MedicamentoViewModel[]> {
    return new Observable((observer) => {
      this.get<any>(this.API).then((res: any) => {
        console.log(res);
        //let aux = (res._embedded !== undefined) ? res._embedded.medicamentoDTOList : [];
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
  * @description Obtiene un listado de objetos de tipo Medicamento.
  * @return {Observable<MedicamentoViewModel[]>}
  */
  obtener(req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return new Observable((observer) => {
      this.httpAux.get<MedicamentoViewModel[]>(`${this.API}/paginas`, { params: options, observe: 'response' }).toPromise()
        .then((res: HttpResponse<MedicamentoViewModel[]>) => {
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
  * @description Busca un listado de objetos de tipo Medicamento.
  * @return {Observable<MedicamentoViewModel[]>}
  */
  buscar(currentSearch: string, req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return new Observable((observer) => {
      this.httpAux.get<MedicamentoViewModel[]>(`${this.API}/${currentSearch}/paginas`, { params: options, observe: 'response' }).toPromise()
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
   * @description Obtiene un listado de objetos tipo de tipo Medicamento.
   * @return {Observable<MedicamentoViewModel[]>}
   */
  obtenerMedicamentosPaginados(size: number, page: number): Observable<MedicamentoViewModel[]> {
    return new Observable((observer) => {
      this.get<any>(`${this.API}/paginas?page=${page - 1}&size=${size}`).then((res: any) => {
        console.log(res);
        //let aux = (res._embedded !== undefined) ? res._embedded.medicamentoDTOList : [];
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
   * @description Obtiene un listado de objetos de tipo Medicamento.
   * @return {Observable<MedicamentoViewModel[]>}
   */
  buscarMedicamentosPaginados(currentSearch: string, size: number, page: number): Observable<MedicamentoViewModel[]> {
    return new Observable((observer) => {
      this.get<any>(`${this.API}/${currentSearch}/paginas?page=${page - 1}&size=${size}`).then((res: any) => {
        console.log(res);
        //let aux = (res._embedded !== undefined) ? res._embedded.medicamentoDTOList : [];
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
   * @description Obtiene un listado de objetos de tipo Medicamento.
   * @param {number} entidad, Objeto que sera almacenado por el BackEnd
   * @return {Observable<MedicamentoViewModel[]>}
   */
  obtenerMedicamentoXModalidad(entidad: number): Observable<MedicamentoViewModel[]> {
    return new Observable((observer) => {
      this.get<MedicamentoViewModel[]>(this.API + 'modalidad/' + entidad)
        .then((res: any) => {
          let list: any = null;
          /*
          if(res['_embedded'] !== undefined)
            list = res['_embedded']['medicamentoDTOList'];
          */
          if (res._embedded !== undefined)
            list = res._embedded.medicamentoDTOList;

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
   * @description Guarda un objeto de tipo Medicamento.
   * @param {MedicamentoViewModel} entidad, Objeto que sera almacenado por el BackEnd
   * @return {Observable<any>}
   */
  guardarMedicamento(entidad: MedicamentoViewModel): Observable<any> {
    //entidad.intId = null;
    return new Observable((observer) => {
      this.post<MedicamentoViewModel>(this.API, entidad).then(r => {
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
   * @description Actualiza un objeto de tipo Medicamento.
   * @param {MedicamentoViewModel} entidad, objeto que sera actualizado por el BackEnd
   * @return {Observable<any>}
   */
  actualizarMedicamento(entidad: MedicamentoViewModel): Observable<any> {
    return new Observable((observer) => {
      this.put<MedicamentoViewModel>(`${this.API}/${entidad.intId}`, entidad).then(r => {
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
   * @description Elimina un objeto de tipo Medicamento.
   * @param {string} id que sera Eliminado por el BackEnd
   * @return {Observable<any>}
   */
  eliminarMedicamento(id: string): Observable<any> {
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
   * @description Convierte una respuesta http en un objeto tipo Medicamento.
   */
  private convertResponse(res: HttpResponse<MedicamentoViewModel[]>): ResponseWrapper {
    const jsonResponse = res.body;
    const result = [];
    if (jsonResponse != null)
      for (let i = 0; i < jsonResponse.length; i++)
        result.push(this.convertItemFromServer(jsonResponse[i]));

    return new ResponseWrapper(res.headers, result, 200);
  }

  /**
   * @description Convierte un JSON object en un objeto tipo Medicamento.
   */
  private convertItemFromServer(json: any): MedicamentoViewModel {
    const entity: MedicamentoViewModel = Object.assign(new MedicamentoViewModel(), json);
    //TODO: implementar conversion de fechas
    return entity;
  }
}
