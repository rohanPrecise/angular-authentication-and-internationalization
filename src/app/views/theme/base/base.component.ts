import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public currentRoute: any = "";
  public showHeader = true;
  public showFooter = true;

  constructor(private router: Router) { 
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.url;

        if (this.currentRoute.includes('/admin')) {
          this.showFooter = false;
        } else {
          this.showFooter = true;
        }
        
      }
    });
  }

  ngOnInit(): void {
  }

}
