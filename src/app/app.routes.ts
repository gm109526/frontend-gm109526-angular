import { Routes } from '@angular/router';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { PlaceholderComponent } from './assignments/placeholder/placeholder.component';  // Composant temporaire
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list-assignments', pathMatch: 'full' },
  { path: 'home', component: AssignmentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list-assignments', component: AssignmentsComponent },
  { path: 'add-assignment', component: AddAssignmentComponent, canActivate: [authGuard], data: { authType: 'admin' } },
  { path: 'assignment-details/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard], data: { authType: 'admin' } },
  { path: 'edit-assignment', component: PlaceholderComponent, canActivate: [authGuard], data: { authType: 'admin' } }, // Placeholderv
  { path: 'delete-assignment', component: PlaceholderComponent, canActivate: [authGuard], data: { authType: 'admin' } }, // Placeholder
  { path: 'generate-test-data', component: PlaceholderComponent, canActivate: [authGuard], data: { authType: 'admin' } }, // Placeholder
  { path: 'assignment-details/:id', component: AssignmentDetailComponent, canActivate: [authGuard], data: { authType: 'loggedIn' } }
];