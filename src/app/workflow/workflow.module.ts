import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowChartComponent } from './workflow-chart/workflow-chart.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactFlowWrapperComponent } from '../reactflow/reactflow-wrapper';
 
const routes: Routes = [
  {
    path: '',
    component: WorkflowChartComponent
  }
]

@NgModule({
  declarations: [
    WorkflowChartComponent,
    ReactFlowWrapperComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class WorkflowModule { }
