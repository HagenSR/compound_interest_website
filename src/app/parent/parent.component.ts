import { Component } from '@angular/core';
import { CompoundInterestLegComponent } from './compound-interest-leg/compound-interest-leg.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CompoundInterestLegComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {

}
