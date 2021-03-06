import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TimetableComponent } from './timetable/timetable.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'profile', component: UserPanelComponent, canActivate : [AuthGuard], canLoad : [AuthGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate : [AuthGuard], canLoad : [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate : [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
