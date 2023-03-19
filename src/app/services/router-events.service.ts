import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterEventsService implements OnDestroy {
  private unsubscribe$: Subject<any> = new Subject<any>();
  navigationEnd$: Subject<NavigationEnd> = new Subject<NavigationEnd>();

  constructor(private router: Router) {
    this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          this.navigationEnd$.next(evt);
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
