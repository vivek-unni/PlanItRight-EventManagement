import { Routes } from '@angular/router';
import { EventsComponent } from './user/events/events.component';
import { DashboardComponent } from './user/events/dashboard/dashboard.component';
import { GuestlistComponent } from './user/events/guestlist/guestlist.component';
import { ScheduleComponent } from './user/events/schedule/schedule.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { BudgetVendorsComponent } from './user/events/budget-vendors/budget-vendors.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'events', component: EventsComponent },
    { path: 'dashboard/:eventId', component: DashboardComponent },
    { path: 'guestlist', component: GuestlistComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'budget', component: BudgetVendorsComponent },
    { path: 'home', component: HomepageComponent},
    // { path: '**', redirectTo: '/home' },
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path : 'login', component: LoginComponent}
];
