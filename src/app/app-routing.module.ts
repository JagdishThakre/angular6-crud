import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesListComponent} from './component/devices-list/devices-list.component';
const routes: Routes = [{
  path: '',
  component: DevicesListComponent
}, {
  path: 'admin',
  component: DevicesListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }