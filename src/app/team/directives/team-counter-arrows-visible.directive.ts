import { ChangeDetectorRef, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'team-match-counter[teamCounterArrowsVisible]',
})
export class TeamCounterArrowsVisibleDirective implements OnInit, OnChanges {
  @Input()
  teamCounterArrowsVisible: boolean;

  private setArrowStyles() {
    if (!this.el.nativeElement) {
      return;
    }

    const arrowLinks = this.el.nativeElement.querySelectorAll('a') as HTMLAnchorElement[];
    if (arrowLinks && arrowLinks.length) {
      const display = this.teamCounterArrowsVisible ? 'block' : 'none';
      arrowLinks.forEach(aLink => (aLink.style.display = display));
    }
  }

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setArrowStyles();
  }

  ngOnChanges(changes: SimpleChanges) {
    const {
      teamCounterArrowsVisible: { currentValue },
    } = changes;
    this.teamCounterArrowsVisible = currentValue;
    this.setArrowStyles();
    this.cdr.markForCheck();
  }
}
