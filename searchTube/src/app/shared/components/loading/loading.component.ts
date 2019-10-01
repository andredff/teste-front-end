import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent {

  @Input()
  public strokeWidth = 2;

  @Input()
  public diameter = 40;

  constructor() {}

}
