import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
          },
        ],
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
          },
        ],
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
          },
        ],
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab4/tab4.module').then(m => m.Tab4PageModule)
          }
        ]
      }
    ]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'admin-view',
    loadChildren: () => import('./admin-view/admin-view.module').then( m => m.AdminViewPageModule)
  },
  {
    path: 'guest-detail',
    loadChildren: () => import('./guest-detail/guest-detail.module').then( m => m.GuestDetailPageModule)
  },
  {
    path: 'add-booking',
    loadChildren: () => import('./add-booking/add-booking.module').then( m => m.AddBookingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
