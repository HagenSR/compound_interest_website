import { Component } from '@angular/core';
import { ParentComponent } from './parent/parent.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [ParentComponent]
})
export class AppComponent {
  title = 'compound interest website';
}
