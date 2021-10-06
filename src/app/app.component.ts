import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularSetup';

  constructor(public translate: TranslateService, translateCacheService: TranslateCacheService) {
    translateCacheService.init();
    translate.addLangs(['en', 'hi', 'gu']);
    const browserLang = translateCacheService.getCachedLanguage() || translate.getBrowserLang();
    console.log("translateCacheService.getCachedLanguage() = ", translateCacheService.getCachedLanguage());
    //translate.use(translate.getBrowserLang() ? translate.getBrowserLang() : 'en');
    //translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }  

}
