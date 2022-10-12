import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';
import { BackdropComponent } from './shared/components/backdrop/backdrop.component';
import { CardComponent } from './shared/components/card/card.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PosterComponent } from './shared/components/poster/poster.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    MoviesComponent,
    NavBarComponent,
    TvshowDetailsComponent,
    TvshowsComponent,
    BackdropComponent,
    CardComponent,
    HeaderComponent,
    PosterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
