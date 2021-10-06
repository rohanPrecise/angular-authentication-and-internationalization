import { Component, Injector, OnInit } from '@angular/core';
import { Role, User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  collapsed = true;

  constructor(
    public injector: Injector,
    private authenticationService: AuthenticationService,
    public translate: TranslateService
  ) {
      this.authenticationService.user.subscribe(x => this.user = x);
      const browserLang = injector.get(TranslateCacheService).getCachedLanguage() || injector.get(TranslateService).getBrowserLang();
  }

  ngOnInit(): void {
  }

  get isAdmin() {
      return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }

  switchLang(lang: string) {
    this.injector.get(TranslateService).use(lang);
  }

}
