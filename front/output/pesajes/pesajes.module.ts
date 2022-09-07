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

import { PesajesFacade } from './pesajes.facade';

import { FormularioPesajeService } from './servicios/formularioPesaje.service';
import { FormulariosPesajeComponent } from './componentes/formulariosPesaje/formulariosPesaje.component';
import { FormularioPesajeComponent } from './componentes/formularioPesaje/formularioPesaje.component';
import { FormularioPesajeContainerComponent } from './contenedores/formularioPesaje-container/formularioPesaje-container.component';
import { FormulariosPesajeContainerComponent } from './contenedores/formulariosPesaje-container/formulariosPesaje-container.component';
import { FormularioPesajeViewComponent } from './vistas/formularioPesaje-view/formularioPesaje-view.component';
import { FormulariosPesajeViewComponent } from './vistas/formulariosPesaje-view/formulariosPesaje-view.component';

import { PesajeService } from './servicios/pesaje.service';
import { PesajesComponent } from './componentes/pesajes/pesajes.component';
import { PesajeComponent } from './componentes/pesaje/pesaje.component';
import { PesajeContainerComponent } from './contenedores/pesaje-container/pesaje-container.component';
import { PesajesContainerComponent } from './contenedores/pesajes-container/pesajes-container.component';
import { PesajeViewComponent } from './vistas/pesaje-view/pesaje-view.component';
import { PesajesViewComponent } from './vistas/pesajes-view/pesajes-view.component';

import { SharedModule } from '@app/shared/shared.module';
import { PesajesRoutingModule } from '@app/modulos/pesajes/pesajes.routing.module';
import { DocumentViewerContainerComponent } from './contenedores/document-viewer-container/document-viewer-container.component';

@NgModule({
  declarations: [
    DocumentViewerContainerComponent,

    FormulariosPesajeComponent,
    FormularioPesajeComponent,
    FormularioPesajeContainerComponent,
    FormulariosPesajeContainerComponent,
    FormularioPesajeViewComponent,
    FormulariosPesajeViewComponent,

    PesajesComponent,
    PesajeComponent,
    PesajeContainerComponent,
    PesajesContainerComponent,
    PesajeViewComponent,
    PesajesViewComponent,
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
    PesajesRoutingModule,
    SharedModule
  ],
  exports:
    [
      FormularioPesajeComponent,
      FormularioPesajeContainerComponent,
      FormulariosPesajeContainerComponent,

      PesajeComponent,
      PesajeContainerComponent,
      PesajesContainerComponent,
    ],
  providers:
    [
      PesajesFacade,

      FormularioPesajeService,
      PesajeService,
    ]
})
export class PesajesModule { }
