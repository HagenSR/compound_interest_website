import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { LegState } from 'src/shared/services/leg/leg.state';
import { SimulationState } from 'src/shared/services/simulation/simulation.state';
import { CompoundInterestResultState } from 'src/shared/services/compound-interest/compound-interest-result.state';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    BrowserAnimationsModule,
    AppRoutingModule,
    ParentComponent,
    NgxsModule.forRoot([LegState, SimulationState, CompoundInterestResultState], {
      developmentMode: isDevMode()
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.app-dark' }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
