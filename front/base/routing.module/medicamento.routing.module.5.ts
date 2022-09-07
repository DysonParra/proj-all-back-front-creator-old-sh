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
