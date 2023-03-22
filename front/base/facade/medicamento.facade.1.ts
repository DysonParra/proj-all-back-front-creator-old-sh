/*
 * @fileoverview    {FileName} se encarga de la comunicacion con el BackEnd y la gestion de estados.
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
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { ResponseWrapper } from 'src/app/shared/models/response-wrapper.model';
