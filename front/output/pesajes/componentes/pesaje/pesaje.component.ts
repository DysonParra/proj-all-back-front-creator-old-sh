import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseComponent } from '../../../esencial/componentes/base-component';
import { PesajesFacade } from '../../pesajes.facade';
import { PesajeViewModel } from '../../modelos/pesaje.model';
import { PesajeState } from '../../estados/pesaje.state';

@Component({
    selector: 'app-pesaje',
    templateUrl: './pesaje.component.html',
    styleUrls: ['./pesaje.component.css']
})
export class PesajeComponent extends BaseComponent implements OnInit, OnDestroy {

    actualizando$: Observable<boolean>;
    procesoSubcription: Subscription = undefined as any;

    constructor(pesajesFacade: PesajesFacade) {

        super();

        this.actualizando$ = pesajesFacade.getPesajeActualizando$();

        this.cloneIconClick = this.cloneIconClick.bind(this);
    }

    tareaSubcription: Subscription = undefined as any;
    ngOnInit(): void {

    }

    private static isChief(position: any) {
        return position && ["CEO", "CMO"].indexOf(position.trim().toUpperCase()) >= 0;
    };

    rowValidating(e: any) {
        var position = e.newData.Position;

        if (PesajeComponent.isChief(position)) {
            e.errorText = 'The company can have only one ' + position.toUpperCase() + '. Please choose another position.';
            e.isValid = false;
        }
    }

    editorPreparing(e: any) {
        if (e.parentType === "dataRow" && e.dataField === "Position") {
            e.editorOptions.readOnly = PesajeComponent.isChief(e.value);
        }
    }

    allowDeleting(e: any) {
        return !PesajeComponent.isChief(e.row.data.Position);
    }

    allowAdding(e: any) {
        return !PesajeComponent.isChief(e.row.data.Position);
    }

    allowUpdating(e: any) {
        return !PesajeComponent.isChief(e.row.data.Position);
    }

    esPesajeVisible(e: any) {
        return e.row.data.bitProcesado > 0;
    }

    cloneIconClick(e: any) {

    }

    pesajeOnClick(e: any) {

    }
}
