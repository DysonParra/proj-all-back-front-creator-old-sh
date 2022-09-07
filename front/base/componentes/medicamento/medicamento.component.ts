import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseComponent } from '../../../esencial/componentes/base-component';
import { TayudoFacade } from '../../tayudo.facade';
import { MedicamentoViewModel } from '../../modelos/medicamento.model';
import { MedicamentoState } from '../../estados/medicamento.state';

@Component({
    selector: 'app-medicamento',
    templateUrl: './medicamento.component.html',
    styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent extends BaseComponent implements OnInit, OnDestroy {

    actualizando$: Observable<boolean>;
    procesoSubcription: Subscription = undefined as any;

    constructor(tayudoFacade: TayudoFacade) {

        super();

        this.actualizando$ = tayudoFacade.getMedicamentoActualizando$();

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

        if (MedicamentoComponent.isChief(position)) {
            e.errorText = 'The company can have only one ' + position.toUpperCase() + '. Please choose another position.';
            e.isValid = false;
        }
    }

    editorPreparing(e: any) {
        if (e.parentType === "dataRow" && e.dataField === "Position") {
            e.editorOptions.readOnly = MedicamentoComponent.isChief(e.value);
        }
    }

    allowDeleting(e: any) {
        return !MedicamentoComponent.isChief(e.row.data.Position);
    }

    allowAdding(e: any) {
        return !MedicamentoComponent.isChief(e.row.data.Position);
    }

    allowUpdating(e: any) {
        return !MedicamentoComponent.isChief(e.row.data.Position);
    }

    esMedicamentoVisible(e: any) {
        return e.row.data.bitProcesado > 0;
    }

    cloneIconClick(e: any) {

    }

    medicamentoOnClick(e: any) {

    }
}
