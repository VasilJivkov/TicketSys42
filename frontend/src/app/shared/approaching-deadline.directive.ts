import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appApproachingDeadline]',
})
export class ApproachingDeadlineDirective implements OnInit {

  @Input('appApproachingDeadline') private deadline: Date;

  private msInADay = 86400000;
  private daysForWarning = 7;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    ) {}

  public ngOnInit(): void {
    const oneDay = this.msInADay;

    const currentDate = new Date();

    const currDateInMs = currentDate.getTime();
    const deadlineInMs = (new Date(this.deadline)).getTime();

    const differenceInMs = deadlineInMs - currDateInMs;

    const remainingDays = Math.round(differenceInMs / oneDay);
    if (remainingDays <= this.daysForWarning) {
      this.renderer.setStyle(this.el.nativeElement, 'background', 'red');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', '5px');
    }
  }
}
