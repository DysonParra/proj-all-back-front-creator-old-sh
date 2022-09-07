import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseComponent } from '../../../esencial/componentes/base-component';
import { PesajesFacade } from '../../pesajes.facade';
import { FormularioPesajeViewModel } from '../../modelos/formularioPesaje.model';
import { FormularioPesajeState } from '../../estados/formularioPesaje.state';

@Component({
    selector: 'app-formularioPesaje',
    templateUrl: './formularioPesaje.component.html',
    styleUrls: ['./formularioPesaje.component.css']
})
export class FormularioPesajeComponent extends BaseComponent implements OnInit, OnDestroy {

    actualizando$: Observable<boolean>;
    procesoSubcription: Subscription = undefined as any;

    constructor(pesajesFacade: PesajesFacade) {

        super();

        this.actualizando$ = pesajesFacade.getFormularioPesajeActualizando$();

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

        if (FormularioPesajeComponent.isChief(position)) {
            e.errorText = 'The company can have only one ' + position.toUpperCase() + '. Please choose another position.';
            e.isValid = false;
        }
    }

    editorPreparing(e: any) {
        if (e.parentType === "dataRow" && e.dataField === "Position") {
            e.editorOptions.readOnly = FormularioPesajeComponent.isChief(e.value);
        }
    }

    allowDeleting(e: any) {
        return !FormularioPesajeComponent.isChief(e.row.data.Position);
    }

    allowAdding(e: any) {
        return !FormularioPesajeComponent.isChief(e.row.data.Position);
    }

    allowUpdating(e: any) {
        return !FormularioPesajeComponent.isChief(e.row.data.Position);
    }

    esFormularioPesajeVisible(e: any) {
        return e.row.data.bitProcesado > 0;
    }

    cloneIconClick(e: any) {

    }

    formularioPesajeOnClick(e: any) {

    }
}
