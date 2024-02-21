import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Node} from "reactflow";

@Component({
  selector: 'app-workflow-chart',
  templateUrl: './workflow-chart.component.html',
  styleUrls: ['./workflow-chart.component.scss'],
})
export class WorkflowChartComponent {

  selectedNode = new BehaviorSubject<Node<any, string>>(null)
  onNodeClick(event: unknown): void {
    const [_, node] = event as [ any, Node<any,string>];
    this.selectedNode.next(node);
  }

  onNodeAdd(event: unknown): void {
    const [_, node] = event as [ any, Node<any,string>];
    this.selectedNode.next(node);
  }

}
