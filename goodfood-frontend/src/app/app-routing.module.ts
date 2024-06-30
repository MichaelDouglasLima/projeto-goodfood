import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantryComponent } from './components/pantry/pantry.component';
import { LoginComponent } from './components/login/login.component';
import { HomeClientComponent } from './components/home-client/home-client.component';
import { HomeNutritionistComponent } from './components/home-nutritionist/home-nutritionist.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { RegisterComponent } from './components/register/register.component';
import { ProfileClientComponent } from './components/profile-client/profile-client.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfileNutritionistComponent } from './components/profile-nutritionist/profile-nutritionist.component';
import { WeeklylogsComponent } from './components/weeklylogs/weeklylogs.component';
import { SuggestedMealComponent } from './components/suggested-meal/suggested-meal.component';
import { NutritionistsComponent } from './components/nutritionists/nutritionists.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DietNutritionistComponent } from './components/diet-nutritionist/diet-nutritionist.component';
import { DietClientComponent } from './components/diet-client/diet-client.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home-client', component: HomeClientComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'CLIENT' } },
  { path: 'home-nutritionist', component: HomeNutritionistComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'NUTRITIONIST' } },
  { path: 'pantry', component: PantryComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'CLIENT' } },
  { path: 'experience', component: WeeklylogsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'CLIENT' } },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'CLIENT' } },
  { path: 'nutritionists', component: NutritionistsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'CLIENT' } },
  { path: 'diet-client', component: DietClientComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'CLIENT' } },
  { path: 'diet-nutritionist/:id', component: DietNutritionistComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'NUTRITIONIST' } },
  { path: 'profile-client', component: ProfileClientComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'CLIENT' } },
  { path: 'profile-nutritionist', component: ProfileNutritionistComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'NUTRITIONIST' } },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'NUTRITIONIST' } },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'NUTRITIONIST' } },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
