import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TvshowDetails } from 'src/app/core/interface/tvshow-details';
import myAppConfig from 'src/app/core/config/my-app-config';
import { TvshowsService } from 'src/app/services/tvshow.service';
import { common } from 'src/app/core/interface/common';

var tvshow_id = 0;

@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.scss']
})
export class TvshowDetailsComponent implements OnInit {

  imgUrl: string = myAppConfig.tmdb.imgUrl;
  highqualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  tvshowDetails: TvshowDetails = {} as TvshowDetails;

  windowScrolled: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private tvshowservice: TvshowsService, private _sanitizer: DomSanitizer) {
    let id = this.route.snapshot.params['id'];
    tvshow_id = id;
  }


  ngOnInit(): void {
    this.router.navigateByUrl('/tvshowdetails/' + tvshow_id);
    this.getTvshowDetails(tvshow_id);
  }

  getTvshowDetails(tvshow_id: number) {

    let api_url = myAppConfig.tmdb.tvshowDetailsBaseUrl + tvshow_id + '?' + myAppConfig.tmdb.apikey;
    this.gettvshowDetailsData(api_url);

    let backdrop_url = myAppConfig.tmdb.tvshowDetailsBaseUrl + tvshow_id + "/images?" + myAppConfig.tmdb.apikey;
    this.gettvshowImages(backdrop_url)
  }

  gettvshowImages(backdrop_url: string) {

    this.tvshowservice.getAllImages(backdrop_url);
    let tempimagesData: any;
    this.tvshowservice.tvshowallImageData.subscribe((data) => {
      tempimagesData = data;
      if (tempimagesData.backdrops.length == '0') {
        this.tvshowDetails.background_image = null;
      }
      else {
        this.tvshowDetails.backdropList = tempimagesData.backdrops;
        this.tvshowDetails.background_image = this.highqualityImgUrl + tempimagesData.backdrops[0].file_path;
      }

      //Tvshow Posters Images
      this.tvshowDetails.posterList = tempimagesData.posters;

      //Tvshow Logo Images
      if (tempimagesData.logos.length < 0) {
        this.tvshowDetails.logoList.file_path = null;
      } else {
        this.tvshowDetails.logoList = tempimagesData.logos[0];
      }
    })
  }

  gettvshowDetailsData(url: any) {
    this.tvshowservice.gettvshowDetails(url);
    let tempTvshowDetails: any;
    this.tvshowservice.tvshowdetailsData.subscribe((data) => {
      tempTvshowDetails = data;

      //Default Tvshow Details
      this.tvshowDetails.backdrop_path = tempTvshowDetails.backdrop_path;
      this.tvshowDetails.episode_run_time = tempTvshowDetails.episode_run_time;
      this.tvshowDetails.avg_run_time = this.tvshowDetails.episode_run_time[0];
      for (let i = 0; i < this.tvshowDetails.episode_run_time.length; i++) {
        if (this.tvshowDetails.avg_run_time < this.tvshowDetails.episode_run_time[i]) {
          this.tvshowDetails.avg_run_time = this.tvshowDetails.episode_run_time[i];
        }
      }
      this.tvshowDetails.first_air_date = tempTvshowDetails.first_air_date;
      this.tvshowDetails.genre = tempTvshowDetails.genres;
      this.tvshowDetails.homepage = tempTvshowDetails.homepage;
      this.tvshowDetails.id = tempTvshowDetails.id;
      this.tvshowDetails.original_lan = tempTvshowDetails.original_language;
      this.tvshowDetails.last_air_date = tempTvshowDetails.last_air_date;
      this.tvshowDetails.last_episode_to_air = tempTvshowDetails.last_episode_to_air;
      this.tvshowDetails.no_of_episodes = tempTvshowDetails.number_of_episodes;
      this.tvshowDetails.no_of_seasons = tempTvshowDetails.number_of_seasons;
      this.tvshowDetails.original_title = tempTvshowDetails.original_name;
      this.tvshowDetails.overview = tempTvshowDetails.overview;
      this.tvshowDetails.popularity = tempTvshowDetails.popularity;
      this.tvshowDetails.poster_path = tempTvshowDetails.poster_path;
      this.tvshowDetails.production_companies = tempTvshowDetails.production_companies;
      this.tvshowDetails.production_countries = tempTvshowDetails.production_countries;
      this.tvshowDetails.seasons = tempTvshowDetails.seasons;
      this.tvshowDetails.status = tempTvshowDetails.status;
      this.tvshowDetails.tagline = tempTvshowDetails.tagline;
      this.tvshowDetails.vote_average = tempTvshowDetails.vote_average;
      this.tvshowDetails.vote_count = tempTvshowDetails.vote_count;

      if (this.tvshowDetails.homepage == "") {
        var watch_provider = myAppConfig.tmdb.tvshowDetailsBaseUrl + tvshow_id + "/watch/providers?" + myAppConfig.tmdb.apikey;
        this.getWatchprovider(watch_provider)
      } else {
        this.tvshowDetails.watchprovider = this.tvshowDetails.homepage;
      }
    })
  }

  getWatchprovider(watch_provider: string) {
    this.tvshowservice.getWatchProviders(watch_provider);
    let watch: any;
    this.tvshowservice.watchData.subscribe((data) => {
      watch = data;
      this.tvshowDetails.watchprovider = watch.results.IN.link;
    })
  }
}
