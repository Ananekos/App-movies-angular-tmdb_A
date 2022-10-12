import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails} from 'src/app/core/interface/movie-details';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MoviesService } from 'src/app/services/movies.service';

var movie_id=0;

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  imgUrl:string=myAppConfig.tmdb.imgUrl;
  highqualityImgUrl:string=myAppConfig.tmdb.highQualityImgUrl;

  movieDetails:MovieDetails={} as MovieDetails;

  windowScrolled: boolean=false;

  constructor(private route:ActivatedRoute,private router:Router,private movieservice:MoviesService,private _sanitizer:DomSanitizer) {
    let id=this.route.snapshot?.params['id'];
    movie_id=id;
    this.movieDetails.crewList=[];
  }

  ngOnInit(): void {
    this.router?.navigateByUrl('/moviedetails/'+movie_id);

    this.getMovieDetails(movie_id);
  }

  getMovieDetails(id:number) {


    let api_url=myAppConfig.tmdb.movieBaseUrl+'/movie/'+id+'?'+myAppConfig.tmdb.apikey;
    this.getMovieDetailsData(api_url);

    
    let backdrop_url=myAppConfig.tmdb.movieBaseUrl+"/movie/"+movie_id+"/images?"+myAppConfig.tmdb.apikey;
    this.getMovieImages(backdrop_url)
  }


  getWatchprovider(watch_provider: string) {
    this.movieservice.getWatchProviders(watch_provider);

    let watch:any;
    this.movieservice.watchData.subscribe((data)=>{
      watch=data;
      this.movieDetails.watchprovider=watch.results.IN[0]?.link;
    })
  }

  getMovieImages(backdrop_url: string) {
    this.movieservice.getAllImages(backdrop_url);

    let tempimagesData:any;
    this.movieservice.movieallImageData.subscribe((data)=>{
        tempimagesData=data;

        if(tempimagesData.backdrops.length=='0'){
          this.movieDetails.background_image=null;
        }
        else{
          this.movieDetails.backdropList=tempimagesData.backdrops;

          this.movieDetails.background_image=this.highqualityImgUrl+tempimagesData.backdrops[0].file_path;
        }

        //Movie Posters Images
          this.movieDetails.posterList=tempimagesData.posters;

        //Movie Logo Images
        if(tempimagesData.logos.length<0){
          this.movieDetails.logoList.file_path=null;
        }else{

          this.movieDetails.logoList=tempimagesData.logos[0];
        }
    })
  }

  getMovieDetailsData(url: string) {
    this.movieservice.getMovieDetails(url);

    let tempMovieDetails:any;
    this.movieservice.moviedetailsData.subscribe((data)=>{

      tempMovieDetails=data;

      //Default Movie Details
      this.movieDetails.title=tempMovieDetails.title;
      this.movieDetails.backdrop_path=tempMovieDetails.backdrop_path;
      this.movieDetails.backdrop_path=tempMovieDetails.backdrop_path;
      this.movieDetails.id=tempMovieDetails.id;
      this.movieDetails.original_lan=tempMovieDetails.original_language;
      this.movieDetails.original_title=tempMovieDetails.original_title;
      this.movieDetails.overview=tempMovieDetails.overview;
      this.movieDetails.popularity=tempMovieDetails.popularity;
      this.movieDetails.poster_path=tempMovieDetails.poster_path;
      this.movieDetails.production_companies=tempMovieDetails.production_companies;
      this.movieDetails.production_countries=tempMovieDetails.production_countries;
      this.movieDetails.runtime=tempMovieDetails.runtime;
      this.movieDetails.genre=tempMovieDetails.genres;
      this.movieDetails.release_date=tempMovieDetails.release_date;
      this.movieDetails.status=tempMovieDetails.status;
      this.movieDetails.vote_average=tempMovieDetails.vote_average;

      if(tempMovieDetails.homepage==""){
        var watch_provider=myAppConfig.tmdb.movieBaseUrl+'/movie/'+movie_id+"/watch/providers?"+myAppConfig.tmdb.apikey;
        this.getWatchprovider(watch_provider);
      }else{
        this.movieDetails.watchprovider=tempMovieDetails.homepage;
      }
    })
  }
}
