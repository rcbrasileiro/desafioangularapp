import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient  } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './home/breadcrumb/breadcrumb.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { ForbiddenComponent } from './security/components/forbidden/forbidden.component';
import { ErrorInterceptor } from './security/interceptors/error-interceptor';
import { LoginComponent } from './security/components/login/login.component';
import { reducers } from './security/store/states';
import { AuthInterceptor } from './security/interceptors/auth.interceptor';
import { HomeComponent } from './home/home/home.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    UserListComponent,
    UserFormComponent,
    CarFormComponent,
    CarListComponent,
    ForbiddenComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
 ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('pt-BR');
  }

}
