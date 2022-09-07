import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DxBoxModule,
  DxSelectBoxModule,
  DxFormModule,
  DxButtonModule,
  DxDataGridModule,
  DxSchedulerModule,
  DxCalendarModule,
  DxDrawerModule,
  DxListModule,
  DxNavBarModule,
  DxContextMenuModule,
  DxDateBoxModule,
  DxRadioGroupModule,
  DxPopupModule,
  DxTextBoxModule,
  DxTemplateModule,
  DxHtmlEditorModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxToolbarModule,
  DxCheckBoxModule,
  DxValidatorModule,
  DxScrollViewModule,
  DxLoadPanelModule
} from 'devextreme-angular';

import { TayudoFacade } from './tayudo.facade';

import { InicioService } from './servicios/inicio.service';
import { IniciosComponent } from './componentes/inicios/inicios.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { InicioContainerComponent } from './contenedores/inicio-container/inicio-container.component';
import { IniciosContainerComponent } from './contenedores/inicios-container/inicios-container.component';
import { InicioViewComponent } from './vistas/inicio-view/inicio-view.component';
import { IniciosViewComponent } from './vistas/inicios-view/inicios-view.component';

import { LaboratorioService } from './servicios/laboratorio.service';
import { LaboratoriosComponent } from './componentes/laboratorios/laboratorios.component';
import { LaboratorioComponent } from './componentes/laboratorio/laboratorio.component';
import { LaboratorioContainerComponent } from './contenedores/laboratorio-container/laboratorio-container.component';
import { LaboratoriosContainerComponent } from './contenedores/laboratorios-container/laboratorios-container.component';
import { LaboratorioViewComponent } from './vistas/laboratorio-view/laboratorio-view.component';
import { LaboratoriosViewComponent } from './vistas/laboratorios-view/laboratorios-view.component';

import { MedicamentoService } from './servicios/medicamento.service';
import { MedicamentosComponent } from './componentes/medicamentos/medicamentos.component';
import { MedicamentoComponent } from './componentes/medicamento/medicamento.component';
import { MedicamentoContainerComponent } from './contenedores/medicamento-container/medicamento-container.component';
import { MedicamentosContainerComponent } from './contenedores/medicamentos-container/medicamentos-container.component';
import { MedicamentoViewComponent } from './vistas/medicamento-view/medicamento-view.component';
import { MedicamentosViewComponent } from './vistas/medicamentos-view/medicamentos-view.component';

import { SharedModule } from '@app/shared/shared.module';
import { TayudoRoutingModule } from '@app/modulos/tayudo/tayudo-routing.module';
import { DocumentViewerContainerComponent } from './contenedores/document-viewer-container/document-viewer-container.component';

@NgModule({
  declarations: [
    DocumentViewerContainerComponent,

    IniciosComponent,
    InicioComponent,
    InicioContainerComponent,
    IniciosContainerComponent,
    InicioViewComponent,
    IniciosViewComponent,

    LaboratoriosComponent,
    LaboratorioComponent,
    LaboratorioContainerComponent,
    LaboratoriosContainerComponent,
    LaboratorioViewComponent,
    LaboratoriosViewComponent,

    MedicamentosComponent,
    MedicamentoComponent,
    MedicamentoContainerComponent,
    MedicamentosContainerComponent,
    MedicamentoViewComponent,
    MedicamentosViewComponent,
  ],
  imports: [
    // ng modules
    CommonModule,
    DxBoxModule,
    DxSelectBoxModule,
    DxFormModule,
    DxButtonModule,
    DxDataGridModule,
    DxSchedulerModule,
    DxCalendarModule,
    DxDrawerModule,
    DxListModule,
    DxNavBarModule,
    DxContextMenuModule,
    DxDateBoxModule,
    DxRadioGroupModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxHtmlEditorModule,
    DxDropDownBoxModule,
    DxDropDownButtonModule,
    DxToolbarModule,
    DxCheckBoxModule,
    DxValidatorModule,
    DxScrollViewModule,
    DxLoadPanelModule,
    // Own modules
    TayudoRoutingModule,
    SharedModule
  ],
  exports:
    [
      InicioComponent,
      InicioContainerComponent,
      IniciosContainerComponent,

      LaboratorioComponent,
      LaboratorioContainerComponent,
      LaboratoriosContainerComponent,

      MedicamentoComponent,
      MedicamentoContainerComponent,
      MedicamentosContainerComponent,
    ],
  providers:
    [
      TayudoFacade,

      InicioService,
      LaboratorioService,
      MedicamentoService,
    ]
})
export class TayudoModule { }
