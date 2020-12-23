
import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import {RegistrationComponent} from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import {AdminLoginComponent} from './admin/admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { TicketComponent } from './ticket/ticket.component';
import { ReservationComponent } from './ticket/reservation/reservation.component';

import { combineAll } from 'rxjs/operators';
import { SearchComponent } from './ticket/reservation/search/search.component';
import { AuthGuard } from './auth.guard';
import { ViewTicketsComponent } from './ticket/view-tickets/view-tickets.component';
import { AdminOperationsComponent } from './admin-operations/admin-operations.component';
import { AddTrainComponent } from './admin-operations/add-train/add-train.component';
import {AdminTrainComponent}from './admin-operations/admin-train/admin-train.component';
import {ProfileComponent} from './ticket/profile/profile.component';
export const appRoutes: Routes = [
  

  {path:'user', component: UserComponent,
  children: [{path:'registration', component: RegistrationComponent}]
},
  {
    path:'user',component:UserComponent,
    children:[{path:'logIn', component: LoginComponent}]
  }
  ,
  {
    path:'', component:HomePageComponent
  },
  {
    path:'admin', component:AdminComponent,
    children:[{path:'login', component:AdminLoginComponent}]
  },
  {
      path:'ticket', component:TicketComponent,
   canActivate:[AuthGuard],
     children:[{path:'reservation', component:ReservationComponent},
     {path:'viewTickets', component:ViewTicketsComponent},
     {path:'profile',component:ProfileComponent}

  ]
},
{
  path:'adminOperations', component:AdminOperationsComponent,
  children:[{path:'addTrain',component:AddTrainComponent},
{path:'allTrain',component:AdminTrainComponent}]
},
  {
    path:'reservation', component:ReservationComponent,
    canActivate:[AuthGuard],
    children:[{path:'search', component:SearchComponent}]
  }
  
];



