import { ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit{

  tooltip: HTMLElement;
  @Input("tooltip") tooltipTitle: string;
  delay = 500;
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.tooltip = this.renderer.createElement("span");
    this.tooltipTitle = "default tooltip";
  }

  ngOnInit(){}

  @HostListener("mouseover") onMouseEnter() {
    this.showTooltip();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.renderer.removeClass(this.tooltip, "tooltip_show");
     // on mouse over it will remove the opacity
  }

  showTooltip() {
    this.tooltip = this.renderer.createElement("span");
    // creating a span
    this.tooltip.appendChild(this.renderer.createElement("span"));
    // appending a span to the tooltip

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle)
      // adding the tooltip text into the tooltip span
    );
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    // getting the hight width and positions of the target element
    let top, left;

    top = hostPos.bottom;
    left = hostPos.left + hostPos.width / 2;
    this.renderer.setStyle(this.tooltip, "top", `${top}px`);
    //adding a top positions value for the tooltip
    this.renderer.setStyle(this.tooltip, "left", `${left}px`);
    // adding the left value
    this.renderer.appendChild(document.body, this.tooltip);
   // appending to the document
    this.renderer.addClass(this.tooltip, "tooltip");
   // adding the tooltip styles
  }
}
