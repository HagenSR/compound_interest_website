import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [DialogModule, ButtonModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {

    visible = false

    constructor() {
    }

    showDialog() {
        this.visible = !this.visible;
    }
}
