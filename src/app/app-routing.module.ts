import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//User Login
import { UserLoginComponent } from './login/user-login/user-login.component'
import { UserSignupComponent } from './login/user-signup/user-signup.component'
import { UserForgotPasswordComponent } from './login/user-forgot-password/user-forgot-password.component'
import { HomeComponent } from './meaai/home/home.component'
import { AdminComponent } from './users/admin/admin.component'
import { MemberComponent } from './users/member/member.component'
import { TravelTableComponent } from './users/admin/travel/travel-table/travel-table.component';
import { AddTravelComponent } from './users/admin/travel/add-travel/add-travel.component';
import { AccommodationTableComponent } from './users/admin/accommodation/accommodation-table/accommodation-table.component';
import { AddAccommodationComponent } from './users/admin/accommodation/add-accommodation/add-accommodation.component';
import { AddRestaurantComponent } from './users/admin/restaurant/add-restaurant/add-restaurant.component';
import { RestaurantTableComponent } from './users/admin/restaurant/restaurant-table/restaurant-table.component';
import { NewsTableComponent } from './users/admin/news/news-table/news-table.component';
import { AddNewsComponent } from './users/admin/news/add-news/add-news.component'
import { TravelComponent } from './meaai/travel/travel/travel.component'
import { ProfileComponent } from './users/profile/profile.component'
import { AccComponent } from './meaai/acc/acc/acc.component'
import { ResComponent } from './meaai/res/res/res.component'
import { NewsContentComponent } from './meaai/news-content/news-content.component'
import { AllTravelsComponent } from './meaai/all-travels/all-travels.component'
import { SearchComponent } from './meaai/search/search.component'
import { AllAccComponent } from './meaai/all-acc/all-acc.component'
import { AllResComponent } from './meaai/all-res/all-res.component'


const routes: Routes = [
  // login
  { path: 'login', component: UserLoginComponent },
  { path: 'sign-up', component: UserSignupComponent },
  { path: 'forgot-password', component: UserForgotPasswordComponent },


  { path: 'users/admin', component: AdminComponent },
  { path: 'users/member', component: MemberComponent },
  { path: 'users/profile', component: ProfileComponent  },
  { path: 'users/admin/travel-table', component: TravelTableComponent },
  { path: 'users/admin/add-travel', component: AddTravelComponent },
  { path: 'users/admin/accommodation-table', component: AccommodationTableComponent },
  { path: 'users/admin/add-accommodation', component: AddAccommodationComponent },
  { path: 'users/admin/restaurant-table', component: RestaurantTableComponent},
  { path: 'users/admin/add-restaurant', component: AddRestaurantComponent  },
  { path: 'users/admin/news-table', component: NewsTableComponent },
  { path: 'users/admin/add-news', component: AddNewsComponent  },


  { path: 'travel/:id', component: TravelComponent  },
  { path: 'acc/:id', component: AccComponent },
  { path: 'res/:id', component: ResComponent },
  { path: 'news/news-content', component: NewsContentComponent },
  { path: 'travels', component: AllTravelsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'accommodation', component: AllAccComponent },
  { path: 'restaurant', component: AllResComponent },

  // website
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
