import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';
import { ModeService } from 'src/shared/services/mode/mode.service';
import { ThemeService } from 'src/shared/services/theme/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule, ToggleButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  modeForm = this.modeService.form
  options = this.modeService.options

  constructor(public readonly modeService: ModeService, private compoundService: CompoundInterestService, private readonly themeService: ThemeService) {
  }

  addSimulation() {
    this.compoundService.addSimulation()
  }

  changeTheme() {
    this.themeService.toggleTheme()
  }

  reset() {
    this.compoundService.reset()
  }
}
