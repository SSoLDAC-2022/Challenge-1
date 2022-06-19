import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapviewComponent } from './mapview/mapview.component';

const routes: Routes = [
  { path: '', component: MapviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
