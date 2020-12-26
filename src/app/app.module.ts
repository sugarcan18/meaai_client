import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { HttpClientModule } from '@angular/common/http';

import { UserLoginComponent } from './login/user-login/user-login.component';
import { UserForgotPasswordComponent } from './login/user-forgot-password/user-forgot-password.component';
import { UserSignupComponent } from './login/user-signup/user-signup.component';
import { HomeComponent } from './meaai/home/home.component';
import { HeaderComponent } from './meaai/header/header.component';
import { FooterComponent } from './meaai/footer/footer.component';
import { CoreApi } from './services/coreapi.service';
import { MemberComponent } from './users/member/member.component';
import { AdminComponent } from './users/admin/admin.component';
import { SidebarComponent } from './users/admin/sidebar/sidebar.component';
import { TravelTableComponent } from './users/admin/travel/travel-table/travel-table.component';
import { AddTravelComponent } from './users/admin/travel/add-travel/add-travel.component';
import { AccommodationTableComponent } from './users/admin/accommodation/accommodation-table/accommodation-table.component';
import { AddAccommodationComponent } from './users/admin/accommodation/add-accommodation/add-accommodation.component';
import { AddRestaurantComponent } from './users/admin/restaurant/add-restaurant/add-restaurant.component';
import { RestaurantTableComponent } from './users/admin/restaurant/restaurant-table/restaurant-table.component';
import { NewsTableComponent } from './users/admin/news/news-table/news-table.component';
import { AddNewsComponent } from './users/admin/news/add-news/add-news.component';
import { TravelComponent } from './meaai/travel/travel/travel.component';
import { ProfileComponent } from './users/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatSelectModule } from '@angular/material/select';
import { AccComponent } from './meaai/acc/acc/acc.component';
import { ResComponent } from './meaai/res/res/res.component';
import { NewsComponent } from './meaai/news/news.component';
import { NewsContentComponent } from './meaai/news-content/news-content.component';
import { AllTravelsComponent } from './meaai/all-travels/all-travels.component';
import { SearchComponent } from './meaai/search/search.component';
import { AllAccComponent } from './meaai/all-acc/all-acc.component';
import { AllResComponent } from './meaai/all-res/all-res.component';



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserForgotPasswordComponent,
    UserSignupComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MemberComponent,
    AdminComponent,
    SidebarComponent,
    TravelTableComponent,
    AddTravelComponent,
    AccommodationTableComponent,
    AddAccommodationComponent,
    AddRestaurantComponent,
    RestaurantTableComponent,
    NewsTableComponent,
    AddNewsComponent,
    TravelComponent,
    ProfileComponent,
    AccComponent,
    ResComponent,
    NewsComponent,
    NewsContentComponent,
    AllTravelsComponent,
    SearchComponent,
    AllAccComponent,
    AllResComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    NgxScrollTopModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [CoreApi],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
