import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-workflow-chart',
  templateUrl: './workflow-chart.component.html',
  styleUrls: ['./workflow-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowChartComponent {

  onNodeClick(event: unknown): void {
   console.log(event);
  }

  onNodeAdd(event: unknown): void {
    console.log('onNodeAdd: ', event);
  }

}
