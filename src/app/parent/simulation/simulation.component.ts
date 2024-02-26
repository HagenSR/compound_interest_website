import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AsyncPipe, CommonModule } from '@angular/common';
import { OnDestroyComponent } from 'src/shared/ui/subscriber-base-component';
import { LegService } from 'src/shared/services/leg/leg.service';
import { Observable} from 'rxjs';
import { Leg } from 'src/shared/models/leg';
import { Simulation } from 'src/shared/models/simulation';
import { CompoundInterestLegComponent } from "./compound-interest-leg/compound-interest-leg.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-simulation',
  standalone: true,
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss',
  imports: [CommonModule, CardModule, AsyncPipe, CompoundInterestLegComponent, ButtonModule]
})
export class SimulationComponent extends OnDestroyComponent implements OnInit {

  @Input() simulation!: Simulation
  @Input() index!: number

  header = 'Compounding Interest Simulation '
  legs$!: Observable<Leg[]>


  constructor(readonly legService: LegService) {
    super()
  }

  ngOnInit(): void {
    this.header += this.index + 1
    this.legs$ = this.legService.query.selectAll({ filterBy: ({ simulationId }) => simulationId === this.simulation.id })
  }

  addLeg() {
    this.legService.addLeg({ id: 0, simulationId: this.simulation.id })
  }


}
