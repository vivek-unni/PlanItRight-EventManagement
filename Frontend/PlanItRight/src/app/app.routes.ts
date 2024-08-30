import { Routes } from '@angular/router';
import { EventsComponent } from './user/events/events.component';
import { DashboardComponent } from './user/events/dashboard/dashboard.component';
import { GuestlistComponent } from './user/events/guestlist/guestlist.component';

export const routes: Routes = [
    { path: 'events', component: EventsComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'guestlist', component: GuestlistComponent },

];
