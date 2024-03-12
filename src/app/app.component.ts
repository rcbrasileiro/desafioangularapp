import { AuthService } from './security/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserAuth } from './interfaces/user-auth';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { UserMe } from './security/interfaces/user-me';
import { AppState } from './security/store/states';
import { Store, select } from '@ngrx/store';
import { selectToken } from './security/store/selectors/auth.selectors';
import { setToken } from './security/store/states/auth.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = this.translate.instant('common.title');

  userMe: UserMe;

  currentRoute: string;

  year: number = new Date().getFullYear();

  constructor(private router: Router, private store: Store<AppState>, private authService: AuthService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.route();
    this.loadUserMe();
    this.router.navigate(['/home']);
  }

  loadUserMe(): void {
    if (this.userMe) {
      return;
    }
    this.store.pipe(select(selectToken)).subscribe(token => {
      if (token) {
        this.authService.getUserMe().subscribe({
          next: (userMe) => {
            this.userMe = userMe;
          },
          error: (error) => {
            if (error.status === 401) {
              this.router.navigate(['/forbidden']);
            }
          }
        });
      }
    });
  }

  route(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects.split('/')[1];
    });
  }

  logout(): void {
    this.store.dispatch(setToken(null));

    this.userMe = null;

    this.router.navigate(['/home']);
  }
}
