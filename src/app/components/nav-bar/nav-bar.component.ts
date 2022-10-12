import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  windowScrolled: boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  onActivate(event:any) {

    window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
     });
 }


   scrollToTop(){
     window.scroll({
           top: 0,
           left: 0,
           behavior: 'smooth'
     });
 }

}
