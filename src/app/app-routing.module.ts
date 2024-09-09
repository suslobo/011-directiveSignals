import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//carga perezosa
const routes: Routes = [
  { path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  {
    path: '**',
    redirectTo: 'products',
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
