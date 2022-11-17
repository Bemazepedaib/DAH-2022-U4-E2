import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminViewPageRoutingModule } from './admin-view-routing.module';

import { AdminViewPage } from './admin-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminViewPageRoutingModule
  ],
  declarations: [AdminViewPage]
})
export class AdminViewPageModule {}
