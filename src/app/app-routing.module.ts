import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';

const routes: Routes = [
  {path:'',component:MoviesComponent},
  {path:'tvshows',component:TvshowsComponent},
  {path:'moviedetails/:id',component:MovieDetailsComponent},
  {path:'tvshowdetails/:id',component:TvshowDetailsComponent},
  {path:'**',component:MoviesComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
