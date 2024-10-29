import { NgModule } from '@angular/core';
import { NgxSuperDashboardComponent } from './ngx-super-dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [NgxSuperDashboardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, GoogleChartsModule],
  exports: [NgxSuperDashboardComponent],
})
export class NgxSuperDashboardModule {
}
