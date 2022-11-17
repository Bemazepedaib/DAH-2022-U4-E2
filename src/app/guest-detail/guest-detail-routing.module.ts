import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestDetailPage } from './guest-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GuestDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestDetailPageRoutingModule {}
