import { SharedModule } from './../../_common/shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [];

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    TranslateModule
    //SharedModule
  ],
  exports: [
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    RouterModule
  ]
})
export class ThemeModule { }
