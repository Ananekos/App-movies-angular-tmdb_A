import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  genre:Observable<any[]> = of([{id:10759,name:'Action & Adventures'},{id:16,name:'Animation'},{id:35,name:'Comedy'},{id:80,name:'Crime'},{id:99,name:'Documentary'},{id:18,name:'Drama'},{id:10751,name:'Family'},{id:10762,name:'Kids'},{id:9648,name:'Mystery'},{id:10763,name:'News'},{id:10764,name:'Reality'},{id:10765,name:'Science-Fiction & Fantacy'},{id:10766,name:'Soap'},{id:10767,name:'Talk'},{id:10768,name:'War & Politics'},{id:37,name:'Western'}]);
  sortBy:Observable<any[]> = of([{order:'airingtoday.desc',desc:'Airing Today'},{order:'ontheair.desc',desc:'On The Air'},{  order:'popularity.desc',  desc:'Trending Now'},{  order:'popularity.asc',  desc:'Old Low Trend'},{  order:'vote_average.desc',  desc:'Top Rated'},{  order:'vote_average.asc',  desc:'Low Rated'},{  order:'first_air_date.desc',  desc:'Release Date Des'},{  order:'first_air_date.asc',  desc:'Release Date Asc'}]);
  networks:Observable<any[]>=of([])

  private tvshowSource = new Subject();
  tvshowsData = this.tvshowSource.asObservable();

  private searchtvshowSource = new Subject();
  searchtvshowsData = this.searchtvshowSource.asObservable();

  //Particular tvshow details
  private tvshowdetailSource=new Subject();
  tvshowdetailsData=this.tvshowdetailSource.asObservable();

  //backdrop image
  private tvshowallImagesSource=new Subject();
  tvshowallImageData=this.tvshowallImagesSource.asObservable();

  //tvshow review
  private tvshowreviewSource=new Subject();
  tvshowreviewData=this.tvshowreviewSource.asObservable();

  //tvshow credit
  private tvshowcreditSource=new Subject();
  tvshowcreditData=this.tvshowcreditSource.asObservable();

  //similar tvshow
  private similartvshowSource=new Subject();
  similartvshowData=this.similartvshowSource.asObservable();

  //Recommended tvshow
  private rectvshowSource=new Subject();
  rectvshowData=this.rectvshowSource.asObservable();

  //Videos
  private videoSource=new Subject();
  videoData=this.videoSource.asObservable();

  //Watch providers
  private watchSource=new Subject();
  watchData=this.watchSource.asObservable();

  //Episodes
  private episodeSource=new Subject();
  episodeData=this.episodeSource.asObservable();

  constructor(private http:HttpClient) { }

  getGenreList():Observable<any[]>{
    return this.genre;
  }

  getOrderList():Observable<any[]>{
    return this.sortBy;
  }

  getNetworkList():Observable<any[]>{
    return this.networks;
  }


  getSearchTvshows(url:any){
    let searchtvshows:any;
    this.http.get(url).subscribe((res)=>{
      searchtvshows=res;
      this.searchtvshowSource.next(searchtvshows);
    })
  }
  getallTvshows(url:any){
    let  tvshow:any;
    this.http.get(url).subscribe((res)=>{
      tvshow=res;
      this.tvshowSource.next(tvshow)
    })
  }

  gettvshowDetails(url:any){
    let tvshowdetails:any;
    this.http.get(url).subscribe((res)=>{
      tvshowdetails=res;
      this.tvshowdetailSource.next(tvshowdetails);
    })
  }

  getAllImages(url:any){
    let tvshowimage:any;
    this.http.get(url).subscribe((res)=>{
      tvshowimage=res;
      this.tvshowallImagesSource.next(tvshowimage);
    })
  }


  gettvshowReviews(url:any){
    let tvshowreview:any;
    this.http.get(url).subscribe((res)=>{
      tvshowreview=res;
      this.tvshowreviewSource.next(tvshowreview);
    })
  }

  gettvshowCredits(url:any){
    let tvshowcredit:any;
    this.http.get(url).subscribe((res)=>{
      tvshowcredit=res;
      this.tvshowcreditSource.next(tvshowcredit);
    })
  }

  getSimilartvshows(url:any){
    let similartvshow:any;
    this.http.get(url).subscribe((res)=>{
      similartvshow=res;
      this.similartvshowSource.next(similartvshow);
    })
  }

  getRecommendedtvshows(url:any){
    let rectvshow:any;
    this.http.get(url).subscribe((res)=>{
        rectvshow=res;
        this.rectvshowSource.next(rectvshow);
    })
  }

  getVideos(url:any){
    let videos:any;
    this.http.get(url).subscribe((res)=>{
      videos=res;
      this.videoSource.next(videos);

    })
  }

  getWatchProviders(url:any){
    let watchprovider:any;
    this.http.get(url).subscribe((res)=>{
      watchprovider=res;
      this.watchSource.next(watchprovider);
    })
  }

  getEpisodes(url:any){
      let epi:any;
      this.http.get(url).subscribe((res)=>{
        epi=res;
        this.episodeSource.next(epi);
      })
  }
}
