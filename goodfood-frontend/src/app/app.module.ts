import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { NavbarClientComponent } from './components/navbar-client/navbar-client.component';
import { PantryComponent } from './components/pantry/pantry.component';
import { PantryFormComponent } from './components/pantry-form/pantry-form.component';
import { NavbarNutritionistComponent } from './components/navbar-nutritionist/navbar-nutritionist.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeClientComponent } from './components/home-client/home-client.component';
import { HomeNutritionistComponent } from './components/home-nutritionist/home-nutritionist.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileClientComponent } from './components/profile-client/profile-client.component';
import { HistoryFormComponent } from './components/history-form/history-form.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfileNutritionistComponent } from './components/profile-nutritionist/profile-nutritionist.component';
import { WeeklylogFormComponent } from './components/weeklylog-form/weeklylog-form.component';
import { WeeklylogsComponent } from './components/weeklylogs/weeklylogs.component';
import { WeeklylogCardComponent } from './components/weeklylog-card/weeklylog-card.component';
import { DietFormComponent } from './components/diet-form/diet-form.component';
import { SuggestedMealComponent } from './components/suggested-meal/suggested-meal.component';
import { MealCardComponent } from './components/meal-card/meal-card.component';
import { MealTableComponent } from './components/meal-table/meal-table.component';
import { NutritionistsComponent } from './components/nutritionists/nutritionists.component';
import { NutritionistCardComponent } from './components/nutritionist-card/nutritionist-card.component';
import { RequestsComponent } from './components/requests/requests.component';;
import { RequestClientCardComponent } from './components/request-client-card/request-client-card.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PhonePipe } from './pipes/phone.pipe';
import { DietNutritionistComponent } from './components/diet-nutritionist/diet-nutritionist.component';

export function tokenGetter() {
  return localStorage.getItem('authToken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarClientComponent,
    PantryComponent,
    PantryFormComponent,
    NavbarNutritionistComponent,
    HomeClientComponent,
    HomeNutritionistComponent,
    RegisterComponent,
    ProfileClientComponent,
    HistoryFormComponent,
    HistoryComponent,
    ProfileNutritionistComponent,
    WeeklylogFormComponent,
    WeeklylogsComponent,
    WeeklylogCardComponent,
    DietFormComponent,
    SuggestedMealComponent,
    MealCardComponent,
    MealTableComponent,
    NutritionistsComponent,
    NutritionistCardComponent,
    RequestsComponent,
    RequestClientCardComponent,
    ClientsComponent,
    ClientCardComponent,
    PhonePipe,
    DietNutritionistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['localhost:8080/api/auth/login']
      }
    })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
