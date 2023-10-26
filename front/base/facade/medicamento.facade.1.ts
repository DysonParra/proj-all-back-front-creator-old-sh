/*
 * @fileoverview    {FileName}
 *
 * @version         2.0
 *
 * @author          Dyson Arley Parra Tilano <dysontilano@gmail.com>
 *
 * @copyright       Dyson Parra
 * @see             github.com/DysonParra
 *
 * History
 * @version 1.0     Implementation done.
 * @version 2.0     Documentation added.
 */
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { ResponseWrapper } from 'src/app/shared/models/response-wrapper.model';
