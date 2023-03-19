import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NavigationEnd} from "@angular/router";
import {RouterEventsService} from "../../services/router-events.service";

@Component({
  selector: 'pl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  activeRoute: string | null = '';

  constructor(private routerEventsService: RouterEventsService) {}

  ngOnInit(): void {
    this.routerEventsService.navigationEnd$.subscribe((evt: NavigationEnd) => {
      this.activeRoute = evt.url.slice(1);
    });
  }
}
