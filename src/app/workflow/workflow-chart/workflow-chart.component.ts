import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workflow-chart',
  templateUrl: './workflow-chart.component.html',
  styleUrls: ['./workflow-chart.component.scss']
})
export class WorkflowChartComponent implements OnInit {

  initialNodes = [
    {
      id: '1',
      type: 'input',
      data: {
        label: 'Input Node',
      },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      data: {
        label: 'Default Node',
      },
      position: { x: 100, y: 100 },
    },
    {
      id: '3',
      type: 'output',
      data: {
        label: 'Output Node',
      },
      position: { x: 400, y: 100 },
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onNodeClick(event: unknown): void {
   console.log(event);
  }

  onConnectStart(event: unknown): void {
    console.log(event);
  }

  onNodeAdd(event: unknown): void {
    console.log('onNodeAdd: ', event);
  }

}
