import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthorizationFormComponent } from './authorization-form/authorization-form.component';
import { MainComponent } from './main/main.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/components/common/messageservice';
import {GrowlModule} from 'primeng/growl';
import {PanelModule} from 'primeng/panel';
import {AutoCompleteModule, DataListModule, DropdownModule, FileUploadModule, OrderListModule, SidebarModule} from 'primeng/primeng';
import { JwtInterceptor } from './interception/jwt.interceptor';
import {AuthenticationService} from './services/auth.service';
import {UsersService} from './services/users.service';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {InplaceModule} from 'primeng/inplace';
import { AdminComponent } from './admin/admin.component';
import {TableModule} from 'primeng/table';
import { UserCredentialsComponent } from './user-credentials/user-credentials.component';
import { FreshComponent } from './fresh/fresh.component';
import { UserFanficsComponent } from './user-fanfics/user-fanfics.component';
import {MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule} from '@angular/material';
import {AdminGuard} from './guard/admin.guard';
import {FanfictionsService} from './services/fanfictions.service';
import { FanficEditComponent } from './fanfic-edit/fanfic-edit.component';
import {EditorModule} from 'primeng/editor';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipe } from './filter.pipe';
import {PaginatorModule} from 'primeng/paginator';
import {HttpInterceptor} from './interception/HttpInterceptor';
import { Error404Component } from './error-404/error-404.component';
import {UploadsService} from './services/uploads.service';
import { TagsCloudComponent } from './tags-cloud/tags-cloud.component';
import {TagCloudModule} from 'angular-tag-cloud-module';
import {UserGuard} from './guard/user.guard';
import { ReadComponent } from './read/read.component';
import {RatingModule} from 'primeng/rating';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'cabinet', component: UserCabinetComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'user/:email', component: UserCabinetComponent},
  { path: 'fresh', component: FreshComponent},
  { path: 'fanfiction/edit/:id', component: FanficEditComponent},
  { path: 'fanfiction/edit', component: FanficEditComponent},
  { path: 'fanfiction/edit/:email/:id', component: FanficEditComponent, canActivate: [AdminGuard]},
  { path: 'tag', component: TagsCloudComponent},
  { path: 'read/:id', component: ReadComponent},
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
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
