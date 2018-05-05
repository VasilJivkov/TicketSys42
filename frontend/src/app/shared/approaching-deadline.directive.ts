import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appApproachingDeadline]'
})
export class ApproachingDeadlineDirective implements OnInit{

  constructor(private el: ElementRef,
    private renderer: Renderer2) {
      renderer.setStyle(el.nativeElement, 'background', 'red');
      
    }
    
  @Input() deadline: Date;

  ngOnInit(): void {
       const one_day = 1000 * 60 * 60 * 24;

    const currentDate = new Date();
 
    const currDate_ms = currentDate.getTime();
    const deadline_ms = this.deadline.getTime();
 
    const difference_ms = deadline_ms - currDate_ms;
 
    const remainingDays = Math.round(difference_ms/one_day);
    if (remainingDays <= 7) {
      this.renderer.setStyle(this.el.nativeElement, 'background', 'red');
    }
  }
  // @Input() set myDir(deadline: Date) {
  //   const one_day = 1000 * 60 * 60 * 24;

  //   const currentDate = new Date();

  //   const currDate_ms = currentDate.getTime();
  //   const deadline_ms = deadline.getTime();

  //   const difference_ms = deadline_ms - currDate_ms;
    
  //   const remainingDays = Math.round(difference_ms/one_day);
  //   if (remainingDays <= 7) {
  //     this.renderer.setStyle(this.el.nativeElement, 'background', 'red');
  //   }
  // }
}
