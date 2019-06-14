import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-err-message',
  templateUrl: './err-message.component.html',
  styleUrls: ['./err-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrMessageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
