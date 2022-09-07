import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../esencial/proteccion/auth.guard";

import { FormulariosPesajeViewComponent } from "./vistas/formulariosPesaje-view/formulariosPesaje-view.component";
import { FormularioPesajeViewComponent } from "./vistas/formularioPesaje-view/formularioPesaje-view.component";

import { PesajesViewComponent } from "./vistas/pesajes-view/pesajes-view.component";
import { PesajeViewComponent } from "./vistas/pesaje-view/pesaje-view.component";

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
      path: 'pesajes/formulariosPesaje',
      component: FormulariosPesajeViewComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'pesajes/pesajes',
      component: PesajesViewComponent,
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
export class PesajesRoutingModule { }
