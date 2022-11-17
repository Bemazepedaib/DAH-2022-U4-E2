import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBookingPage } from './add-booking.page';

const routes: Routes = [
  {
    path: '',
    component: AddBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBookingPageRoutingModule {}
