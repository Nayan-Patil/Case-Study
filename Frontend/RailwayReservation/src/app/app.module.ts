import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { appRoutes } from './routes';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegistrationComponent } from './user/registration/registration.component'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LoginComponent } from './user/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeService } from './shared/home.service';
import { UserService } from './shared/user.service';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import {AdminService} from './shared/admin.service';
import { TicketComponent } from './ticket/ticket.component';
import { ReservationComponent } from './ticket/reservation/reservation.component';
import { TicketService } from './shared/ticket.service';

import { SearchComponent } from './ticket/reservation/search/search.component';
import { ViewTicketsComponent } from './ticket/view-tickets/view-tickets.component';
import { AuthGuard } from './auth.guard';
import {AdminGuard} from './admin.guard';
//import { ReservationComponent } from './ticket/reservation/reservation.component';
import {TokenInterceptorService} from './shared/token-interceptor.service';
import { AdminOperationsComponent } from './admin-operations/admin-operations.component';
//import {MatTableModule} from '@angular/material/table';
import { AddTrainComponent } from './admin-operations/add-train/add-train.component';
import { AdminTrainComponent } from './admin-operations/admin-train/admin-train.component';
import { TrainUpdateComponent } from './admin-operations/train-update/train-update.component';

import {MatGridListModule} from '@angular/material/grid-list';
import { ProfileComponent } from './ticket/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    RegistrationComponent,
    LoginComponent,
    HomePageComponent,
    AdminLoginComponent,
    TicketComponent,
    ReservationComponent,
    SearchComponent,
    ViewTicketsComponent,
    AdminOperationsComponent,
    AddTrainComponent,
    AdminTrainComponent,
    TrainUpdateComponent,
    ProfileComponent
    //AppRoutingModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
   MatAutocompleteModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatSidenavModule,
    MatGridListModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    
  ],
  providers: [HomeService, UserService,AuthGuard,AdminGuard, AdminService, TicketService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent],
  entryComponents:[AddTrainComponent]
})
export class AppModule { }
