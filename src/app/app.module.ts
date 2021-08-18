import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TimetableComponent } from './timetable/timetable.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { GetTicketComponent } from './get-ticket/get-ticket.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { TimetableService } from './timetable/timetable.service';
import { TicketsService } from './get-ticket/tickets.service';
import { UsersComponent } from './users/users.component';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimetableComponent,
    NavComponent,
    RegisterComponent,
    AboutComponent,
    GetTicketComponent,
    UserPanelComponent,
    AdminPanelComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule, 

    FlexLayoutModule, 
    NgbModule, 
  
  ],
  providers: [ AuthService, TimetableService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, TicketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
