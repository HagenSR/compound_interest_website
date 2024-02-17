import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { Mode } from 'src/shared/enums/mode.enum';

@Injectable({providedIn: 'root'})
export class ModeService {

  options = [
    { label: 'Compare', value: Mode.COMPARISON },
    { label: 'Leg', value: Mode.LEG }
  ]

  form = this.fb.group({
    mode: this.options[0]
  })

  currentMode$ = new BehaviorSubject(Mode.COMPARISON)

  constructor(private fb: FormBuilder) {
    this.form.get('mode')?.valueChanges?.pipe(
      map((mode) => mode!.value!)
    ).subscribe(this.currentMode$)
  }
}
