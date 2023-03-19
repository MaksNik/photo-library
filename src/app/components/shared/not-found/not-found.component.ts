import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'pl-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  @Input() message: string = 'Looks like this page doesn\'t exist.';

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
