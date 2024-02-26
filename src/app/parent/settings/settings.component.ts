import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';
import { LegService } from 'src/shared/services/leg/leg.service';
import { SimulationService } from 'src/shared/services/simulation/simulation.service';
import { ThemeService } from 'src/shared/services/theme/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule, ToggleButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  constructor(private simulationService: SimulationService, private readonly themeService: ThemeService, private readonly legService: LegService, private readonly compService: CompoundInterestService) {
  }

  addSimulation() {
    this.simulationService.addSimulation()
  }

  changeTheme() {
    this.themeService.toggleTheme()
  }

  reset() {
    this.compService.reset()
    this.legService.reset()
    this.simulationService.reset()
  }
}
