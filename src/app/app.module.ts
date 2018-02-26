import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';
import { MainComponent } from './components/main/main.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';
import {GrowlModule} from 'primeng/growl';
import {PanelModule} from 'primeng/panel';
import {AutoCompleteModule, DataListModule, DropdownModule, FileUploadModule, OrderListModule, SidebarModule} from 'primeng/primeng';
import { JwtInterceptor } from './assistance/jwt.interceptor';
import {AuthenticationService} from './services/auth.service';
import {UsersService} from './services/users.service';
import { UserCabinetComponent } from './components/user-cabinet/user-cabinet.component';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {InplaceModule} from 'primeng/inplace';
import { AdminComponent } from './components/admin/admin.component';
import {TableModule} from 'primeng/table';
import { UserCredentialsComponent } from './components/user-credentials/user-credentials.component';
import { FreshComponent } from './components/fresh/fresh.component';
import { UserFanficsComponent } from './components/user-fanfics/user-fanfics.component';
import {MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule} from '@angular/material';
import {AdminGuard} from './guard/admin.guard';
import {FanfictionsService} from './services/fanfictions.service';
import { FanficEditComponent } from './components/fanfic-edit/fanfic-edit.component';
import {EditorModule} from 'primeng/editor';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipe } from './assistance/filter.pipe';
import {PaginatorModule} from 'primeng/paginator';
import {HttpInterceptor} from './assistance/HttpInterceptor';
import { Error404Component } from './components/error-404/error-404.component';
import {UploadsService} from './services/uploads.service';
import { TagsCloudComponent } from './components/tags-cloud/tags-cloud.component';
import {TagCloudModule} from 'angular-tag-cloud-module';
import {UserGuard} from './guard/user.guard';
import { ReadComponent } from './components/read/read.component';
import {RatingModule} from 'primeng/rating';
import {SafeHtmlPipe} from './assistance/dom-sanitizer.pipe';
import { MainFanficsComponent } from './components/main-fanfics/main-fanfics.component';
import {RatingService} from './services/rating.service'

const appRoutes: Routes = [
  { path: '', redirectTo: 'hot', pathMatch: 'full'},
  { path: 'cabinet', component: UserCabinetComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'user/:email', component: UserCabinetComponent},
  { path: 'fresh', component: MainComponent},
  { path: 'hot', component: MainComponent},
  { path: 'fanfiction/edit/:id', component: FanficEditComponent},
  { path: 'fanfiction/edit', component: FanficEditComponent},
  { path: 'fanfiction/edit/:email/:id', component: FanficEditComponent, canActivate: [AdminGuard]},
  { path: 'tag', component: TagsCloudComponent},
  { path: 'read/:id', component: ReadComponent},
  { path: 'tag/:tag', component: MainComponent},
  { path: '**', component: Error404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthorizationFormComponent,
    MainComponent,
    LoginComponent,
    RegistrationComponent,
    UserCabinetComponent,
    AdminComponent,
    UserCredentialsComponent,
    FreshComponent,
    UserFanficsComponent,
    FanficEditComponent,
    FilterPipe,
    Error404Component,
    TagsCloudComponent,
    ReadComponent,
    SafeHtmlPipe,
    MainFanficsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OrderModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    TabViewModule,
    CardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    GrowlModule,
    PanelModule,
    OrderListModule,
    DataListModule,
    InplaceModule,
    TableModule,
    DropdownModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    EditorModule,
    PaginatorModule,
    AutoCompleteModule,
    FileUploadModule,
    SidebarModule,
    TagCloudModule,
    RatingModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthenticationService,
    UsersService,
    FanfictionsService,
    AdminGuard,
    UploadsService,
    UserGuard,
    RatingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
