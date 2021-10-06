import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    currentYear: number = new Date().getFullYear();

    constructor(
        public injector: Injector,
        public translate: TranslateService,
        private formBuilder: FormBuilder
    ) { 
        const browserLang = injector.get(TranslateCacheService).getCachedLanguage() || injector.get(TranslateService).getBrowserLang();
        //translate.use(translate.getBrowserLang() ? translate.getBrowserLang() : 'en');
        //translate.setDefaultLang('en');

        // redirect to home if already logged in
        if (this.injector.get(AuthenticationService).userValue) { 
            this.injector.get(Router).navigate(['/']);
        }
    }
    
    switchLang(lang: string) {
        this.injector.get(TranslateService).use(lang);
    }  

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.injector.get(AuthenticationService).login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.injector.get(ActivatedRoute).snapshot.queryParams['returnUrl'] || '/';
                    this.injector.get(Router).navigateByUrl(returnUrl);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}
