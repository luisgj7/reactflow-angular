import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import * as React from 'react';
import {
  Connection,
  ConnectionLineComponent,
  ConnectionLineType,
  ConnectionMode,
  CoordinateExtent,
  DefaultEdgeOptions,
  Edge,
  EdgeChange,
  EdgeTypes,
  FitViewOptions,
  HandleType,
  KeyCode,
  MarkerType,
  Node,
  NodeChange,
  NodeOrigin,
  NodeTypes,
  OnConnectStartParams,
  OnError,
  OnSelectionChangeParams,
  PanelPosition,
  PanOnScrollMode,
  ProOptions,
  ReactFlowInstance,
  Viewport
} from 'reactflow';
import { FlowWrapperComponent, IReactFlowProps } from './reactflow';
import { createRoot, Root } from 'react-dom/client';

@Component({
  selector: 'react-flow',
  template: ``,
  styleUrls: ['./react-flow.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactFlowWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  private _root: Root;
  private _defaultEdgeOptions: DefaultEdgeOptions = {
      type: ConnectionLineType.SmoothStep,
      markerEnd: { type: MarkerType.ArrowClosed },
  }

  @Input() nodes?: Node<any, string | undefined>[] | undefined;
  @Input() edges?: Edge<any>[] | undefined;
  @Input() defaultNodes?: Node<any, string | undefined>[] | undefined;
  @Input() defaultEdges?: Edge<any>[] | undefined;
  @Input() set defaultEdgeOptions(value: DefaultEdgeOptions) {
      if (value) {
          this._defaultEdgeOptions = value;
      }
  };

  @Output() onNodeClick = new EventEmitter<[MouseEvent, Node]>();
  @Output() onNodeDoubleClick = new EventEmitter<[MouseEvent, Node]>();
  @Output() onNodeMouseEnter = new EventEmitter<[MouseEvent, Node]>();
  @Output() onNodeMouseMove = new EventEmitter<[MouseEvent, Node]>();
  @Output() onNodeMouseLeave = new EventEmitter<[MouseEvent, Node]>();
  @Output() onNodeContextMenu = new EventEmitter<[MouseEvent, Node]>();
  @Output() onNodeDragStart = new EventEmitter<[MouseEvent, Node, Node[]]>();
  @Output() onNodeDrag = new EventEmitter<[MouseEvent, Node, Node[]]>();
  @Output() onNodeDragStop = new EventEmitter<[MouseEvent, Node, Node[]]>();
  @Output() onEdgeClick = new EventEmitter<[MouseEvent, Node]>();
  @Output() onEdgeUpdate = new EventEmitter<[any, Connection]>();
  @Output() onEdgeContextMenu = new EventEmitter<[MouseEvent, Edge]>();
  @Output() onEdgeMouseEnter = new EventEmitter<[MouseEvent, Edge]>();
  @Output() onEdgeMouseMove = new EventEmitter<[MouseEvent, Edge]>();
  @Output() onEdgeMouseLeave = new EventEmitter<[MouseEvent, Edge]>();
  @Output() onEdgeDoubleClick = new EventEmitter<[MouseEvent, Edge]>();
  @Output() onEdgeUpdateStart = new EventEmitter<[MouseEvent, Edge<any>, HandleType]>();
  @Output() onEdgeUpdateEnd = new EventEmitter<[MouseEvent, Edge<any>, HandleType]>();
  @Output() onNodesChange = new EventEmitter<[NodeChange[]]>();
  @Output() onEdgesChange = new EventEmitter<[EdgeChange[]]>();
  @Output() onNodesDelete = new EventEmitter<[Node[]]>();
  @Output() onEdgesDelete = new EventEmitter<[Edge[]]>();
  @Output() onSelectionDragStart = new EventEmitter<[MouseEvent, Node[]]>();
  @Output() onSelectionDrag = new EventEmitter<[MouseEvent, Node[]]>();
  @Output() onSelectionDragStop = new EventEmitter<[MouseEvent, Node[]]>();
  @Output() onSelectionStart = new EventEmitter<[MouseEvent]>();
  @Output() onSelectionEnd = new EventEmitter<[MouseEvent]>();
  @Output() onSelectionContextMenu = new EventEmitter<[MouseEvent, Node<any, string | undefined>[]]>();
  @Output() onConnect = new EventEmitter<[Connection]>();
  @Output() onConnectStart = new EventEmitter<[MouseEvent, OnConnectStartParams]>();
  @Output() onConnectEnd = new EventEmitter<[MouseEvent]>();
  @Output() onClickConnectStart = new EventEmitter<[MouseEvent, OnConnectStartParams]>();
  @Output() onClickConnectEnd = new EventEmitter<[MouseEvent]>();
  @Output() onInit = new EventEmitter<[ReactFlowInstance<any, any>]>();
  @Output() onMove = new EventEmitter<[MouseEvent, Viewport]>();
  @Output() onMoveStart = new EventEmitter<[MouseEvent, Viewport]>();
  @Output() onMoveEnd = new EventEmitter<[MouseEvent, Viewport]>();
  @Output() onSelectionChange = new EventEmitter<[OnSelectionChangeParams]>();
  @Output() onPaneScroll = new EventEmitter<[WheelEvent]>();
  @Output() onPaneClick = new EventEmitter<[MouseEvent]>();
  @Output() onPaneContextMenu = new EventEmitter<[MouseEvent]>();
  @Output() onPaneMouseEnter = new EventEmitter<[MouseEvent]>();
  @Output() onPaneMouseMove = new EventEmitter<[MouseEvent]>();
  @Output() onPaneMouseLeave = new EventEmitter<[MouseEvent]>();
  @Output() onError = new EventEmitter<OnError>();
  @Output() onNodeAdd = new EventEmitter<Node>();

  @Input() nodeTypes?: NodeTypes | undefined;
  @Input() edgeTypes?: EdgeTypes | undefined;
  @Input() connectionLineType?: ConnectionLineType | undefined;
  @Input() connectionLineStyle?: React.CSSProperties | undefined;
  @Input() connectionLineComponent?: ConnectionLineComponent | undefined;
  @Input() connectionLineContainerStyle?: React.CSSProperties | undefined;
  @Input() connectionMode?: ConnectionMode | undefined;
  @Input() deleteKeyCode?: KeyCode | null | undefined;
  @Input() selectionKeyCode?: KeyCode | null | undefined;
  @Input() selectionOnDrag?: boolean | undefined;
  @Input() selectionMode?: SelectionMode | undefined;
  @Input() panActivationKeyCode?: KeyCode | null | undefined;
  @Input() multiSelectionKeyCode?: KeyCode | null | undefined;
  @Input() zoomActivationKeyCode?: KeyCode | null | undefined;
  @Input() snapToGrid?: boolean | undefined;
  @Input() snapGrid?: [number, number] | undefined;
  @Input() onlyRenderVisibleElements?: boolean | undefined;
  @Input() nodesDraggable?: boolean | undefined;
  @Input() nodesConnectable?: boolean | undefined;
  @Input() nodesFocusable?: boolean | undefined;
  @Input() nodeOrigin?: NodeOrigin | undefined;
  @Input() edgesFocusable?: boolean | undefined;
  @Input() initNodeOrigin?: NodeOrigin | undefined;
  @Input() elementsSelectable?: boolean | undefined;
  @Input() selectNodesOnDrag?: boolean | undefined;
  @Input() panOnDrag?: boolean | number[] | undefined;
  @Input() minZoom?: number | undefined;
  @Input() maxZoom?: number | undefined;
  @Input() defaultViewport?: Viewport | undefined;
  @Input() translateExtent?: CoordinateExtent | undefined;
  @Input() preventScrolling?: boolean | undefined;
  @Input() nodeExtent?: CoordinateExtent | undefined;
  @Input() defaultMarkerColor?: string | undefined;
  @Input() zoomOnScroll?: boolean | undefined;
  @Input() zoomOnPinch?: boolean | undefined;
  @Input() panOnScroll?: boolean | undefined;
  @Input() panOnScrollSpeed?: number | undefined;
  @Input() panOnScrollMode?: PanOnScrollMode | undefined;
  @Input() zoomOnDoubleClick?: boolean | undefined;
  @Input() edgeUpdaterRadius?: number | undefined;
  @Input() noDragClassName?: string | undefined;
  @Input() noWheelClassName?: string | undefined;
  @Input() noPanClassName?: string | undefined;
  @Input() fitView?: boolean | undefined;
  @Input() fitViewOptions?: FitViewOptions | undefined;
  @Input() connectOnClick?: boolean | undefined;
  @Input() attributionPosition?: PanelPosition | undefined;
  @Input() proOptions?: ProOptions | undefined;
  @Input() elevateNodesOnSelect?: boolean | undefined;
  @Input() elevateEdgesOnSelect?: boolean | undefined;
  @Input() disableKeyboardA11y?: boolean | undefined;
  @Input() autoPanOnNodeDrag?: boolean | undefined;
  @Input() autoPanOnConnect?: boolean | undefined;
  @Input() connectionRadius?: number | undefined;

  constructor(private ngContainer: ViewContainerRef) { }

  ngOnChanges(changes: SimpleChanges): void {
      this._render();
  }

  ngAfterViewInit() {
      this._render();
  }

  ngOnDestroy() {
    if (this._root) {
      this._root.unmount();
    }
  }

  private _getInputProperties(keys: string[]) {
      return keys.reduce((filteredProps, key) => {
          filteredProps[key] = this[key];
          return filteredProps;
      }, {});
  }

  private _getEmitters(keys: string[]): Record<string, (...args: unknown[]) => void> {
      return keys.reduce((eventEmitters, key) => {
          eventEmitters[key] = (...args) => this[key].next(args);
          return eventEmitters;
      }, {});
  }

  private _render() {
      if (!this._root) {
          this._root = createRoot(this.ngContainer.element.nativeElement);
      }

      const filteredKeys = Object.keys(this)
        .filter(key => !key.startsWith('_') && !key.startsWith('ng'));
      const propKeys = filteredKeys.filter(key => !key.startsWith("on"));
      const eventKeys = filteredKeys.filter(key => key.startsWith("on"));

      const reactFlow: IReactFlowProps = {
          props: {
              ...this._getInputProperties(propKeys),
              ...this._getEmitters(eventKeys),
          }
      };
      reactFlow.props.defaultEdgeOptions = this._defaultEdgeOptions;

      console.log(reactFlow.props);

      this._root.render(<FlowWrapperComponent props={reactFlow.props} />);
  }
}
