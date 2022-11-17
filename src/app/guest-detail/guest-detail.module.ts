import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestDetailPageRoutingModule } from './guest-detail-routing.module';

import { GuestDetailPage } from './guest-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestDetailPageRoutingModule
  ],
  declarations: [GuestDetailPage]
})
export class GuestDetailPageModule {}
