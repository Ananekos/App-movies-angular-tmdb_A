import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() data:any={};
  imgUrl:string=myAppConfig.tmdb.highQualityImgUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
