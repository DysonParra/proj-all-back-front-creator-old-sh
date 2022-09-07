/**
 * @fileoverview Fachada, clase encargada de la comunicacion con el BackEnd y la gestion de estados.
 *
 * @version             1.0
 *
 * @author              Dyson Arley Parra Tilano <dyson.parra@radartechnologies.com.co>
 * @copyright           sucomunicacion.com
 *
 * History
 * v1.0 – Se realizo la implementacion basica, basada en observadores reactivos
 * ----
 * La primera versión de Facade fue escrita por Dyson A. Parra T.
 */
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { ResponseWrapper } from 'src/app/shared/models/response-wrapper.model';
