import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../esencial/proteccion/auth.guard";

import { IniciosViewComponent } from "./vistas/inicios-view/inicios-view.component";
import { InicioViewComponent } from "./vistas/inicio-view/inicio-view.component";

import { LaboratoriosViewComponent } from "./vistas/laboratorios-view/laboratorios-view.component";
import { LaboratorioViewComponent } from "./vistas/laboratorio-view/laboratorio-view.component";

import { MedicamentosViewComponent } from "./vistas/medicamentos-view/medicamentos-view.component";
import { MedicamentoViewComponent } from "./vistas/medicamento-view/medicamento-view.component";

const routes: Routes =
  [
    /*
    {
      path: 'home',
      component: IniciosViewComponent,
      canActivate: [AuthGuard]
    },
    */
    {
      path: 'laboratorios',
      component: LaboratoriosViewComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'medicamentos',
      component: MedicamentosViewComponent,
      canActivate: [AuthGuard]
    },
    /*
    {
      path: '**',
      redirectTo: 'home'
      // canActivate: [ AuthGuardService ]
    }
    */
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TayudoRoutingModule { }
