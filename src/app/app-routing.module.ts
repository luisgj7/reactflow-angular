import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowWrapperComponent } from './reactflow/reactflow';

const routes: Routes = [
  { path: '', loadChildren: async() => (await import('./workflow/workflow.module')).WorkflowModule  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
