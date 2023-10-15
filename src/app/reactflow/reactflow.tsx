import * as React from 'react';
import { FunctionComponent, ReactEventHandler } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ConnectionLineComponent,
  ConnectionLineType,
  ConnectionMode,
  CoordinateExtent,
  DefaultEdgeOptions,
  EdgeMouseHandler,
  EdgeTypes,
  FitViewOptions,
  HandleType,
  KeyCode,
  NodeDragHandler,
  NodeMouseHandler,
  NodeOrigin,
  NodeTypes,
  OnConnect,
  OnConnectEnd,
  OnConnectStart,
  OnEdgesChange,
  OnEdgesDelete,
  OnEdgeUpdateFunc,
  OnError,
  OnInit,
  OnMove,
  OnNodesChange,
  OnNodesDelete,
  OnSelectionChangeFunc,
  PanelPosition,
  PanOnScrollMode,
  ProOptions,
  SelectionDragHandler,
  Viewport,
  ReactFlowProvider,
  getConnectedEdges,
  useReactFlow,
} from 'reactflow';

import { Sidebar } from './components/sidebar';
import { Flow } from './components/flow';
// import CustomNode from './custom-node';

export interface IReactFlowProps {
    props: {
        nodes?: Node<any, string | undefined>[] | undefined;
        edges?: Edge<any>[] | undefined;
        defaultNodes?: Node<any, string | undefined>[] | undefined;
        defaultEdges?: Edge<any>[] | undefined;
        defaultEdgeOptions?: DefaultEdgeOptions | undefined;
        onNodeClick?: NodeMouseHandler | undefined;
        onNodeDoubleClick?: NodeMouseHandler | undefined;
        onNodeMouseEnter?: NodeMouseHandler | undefined;
        onNodeMouseMove?: NodeMouseHandler | undefined;
        onNodeMouseLeave?: NodeMouseHandler | undefined;
        onNodeContextMenu?: NodeMouseHandler | undefined;
        onNodeDragStart?: NodeDragHandler | undefined;
        onNodeDrag?: NodeDragHandler | undefined;
        onNodeDragStop?: NodeDragHandler | undefined;
        onEdgeClick?: ((event: import("react").MouseEvent<Element, MouseEvent>, node: Edge<any>) => void) | undefined;
        onEdgeUpdate?: OnEdgeUpdateFunc<any> | undefined;
        onEdgeContextMenu?: EdgeMouseHandler | undefined;
        onEdgeMouseEnter?: EdgeMouseHandler | undefined;
        onEdgeMouseMove?: EdgeMouseHandler | undefined;
        onEdgeMouseLeave?: EdgeMouseHandler | undefined;
        onEdgeDoubleClick?: EdgeMouseHandler | undefined;
        onEdgeUpdateStart?: ((event: import("react").MouseEvent<Element, MouseEvent>, edge: Edge<any>, handleType: HandleType) => void) | undefined;
        onEdgeUpdateEnd?: ((event: MouseEvent | TouchEvent, edge: Edge<any>, handleType: HandleType) => void) | undefined;
        onNodesChange?: OnNodesChange | undefined;
        onEdgesChange?: OnEdgesChange | undefined;
        onNodesDelete?: OnNodesDelete | undefined;
        onEdgesDelete?: OnEdgesDelete | undefined;
        onSelectionDragStart?: SelectionDragHandler | undefined;
        onSelectionDrag?: SelectionDragHandler | undefined;
        onSelectionDragStop?: SelectionDragHandler | undefined;
        onSelectionStart?: ((event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
        onSelectionEnd?: ((event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
        onSelectionContextMenu?: ((event: import("react").MouseEvent<Element, MouseEvent>, nodes: Node<any, string | undefined>[]) => void) | undefined;
        onConnect?: OnConnect | undefined;
        onConnectStart?: OnConnectStart | undefined;
        onConnectEnd?: OnConnectEnd | undefined;
        onClickConnectStart?: OnConnectStart | undefined;
        onClickConnectEnd?: OnConnectEnd | undefined;
        onInit?: OnInit<any, any> | undefined;
        onMove?: OnMove | undefined;
        onMoveStart?: OnMove | undefined;
        onMoveEnd?: OnMove | undefined;
        onSelectionChange?: OnSelectionChangeFunc | undefined;
        onPaneScroll?: ((event?: import("react").WheelEvent<Element> | undefined) => void) | undefined;
        onPaneClick?: ((event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
        onPaneContextMenu?: ((event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
        onPaneMouseEnter?: ((event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
        onPaneMouseMove?: ((event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
        onPaneMouseLeave?: ((event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
        onNodeAdd?: (node?: Node) => void;
        nodeTypes?: NodeTypes | undefined;
        edgeTypes?: EdgeTypes | undefined;
        connectionLineType?: ConnectionLineType | undefined;
        connectionLineStyle?: React.CSSProperties | undefined;
        connectionLineComponent?: ConnectionLineComponent | undefined;
        connectionLineContainerStyle?: React.CSSProperties | undefined;
        connectionMode?: ConnectionMode | undefined;
        deleteKeyCode?: KeyCode | null | undefined;
        selectionKeyCode?: KeyCode | null | undefined;
        selectionOnDrag?: boolean | undefined;
        selectionMode?: SelectionMode | undefined;
        panActivationKeyCode?: KeyCode | null | undefined;
        multiSelectionKeyCode?: KeyCode | null | undefined;
        zoomActivationKeyCode?: KeyCode | null | undefined;
        snapToGrid?: boolean | undefined;
        snapGrid?: [number, number] | undefined;
        onlyRenderVisibleElements?: boolean | undefined;
        nodesDraggable?: boolean | undefined;
        nodesConnectable?: boolean | undefined;
        nodesFocusable?: boolean | undefined;
        nodeOrigin?: NodeOrigin | undefined;
        edgesFocusable?: boolean | undefined;
        elementsSelectable?: boolean | undefined;
        selectNodesOnDrag?: boolean | undefined;
        panOnDrag?: boolean | number[] | undefined;
        minZoom?: number | undefined;
        maxZoom?: number | undefined;
        defaultViewport?: Viewport | undefined;
        translateExtent?: CoordinateExtent | undefined;
        preventScrolling?: boolean | undefined;
        nodeExtent?: CoordinateExtent | undefined;
        defaultMarkerColor?: string | undefined;
        zoomOnScroll?: boolean | undefined;
        zoomOnPinch?: boolean | undefined;
        panOnScroll?: boolean | undefined;
        panOnScrollSpeed?: number | undefined;
        panOnScrollMode?: PanOnScrollMode | undefined;
        zoomOnDoubleClick?: boolean | undefined;
        edgeUpdaterRadius?: number | undefined;
        noDragClassName?: string | undefined;
        noWheelClassName?: string | undefined;
        noPanClassName?: string | undefined;
        fitView?: boolean | undefined;
        fitViewOptions?: FitViewOptions | undefined;
        connectOnClick?: boolean | undefined;
        attributionPosition?: PanelPosition | undefined;
        proOptions?: ProOptions | undefined;
        elevateNodesOnSelect?: boolean | undefined;
        elevateEdgesOnSelect?: boolean | undefined;
        disableKeyboardA11y?: boolean | undefined;
        autoPanOnNodeDrag?: boolean | undefined;
        autoPanOnConnect?: boolean | undefined;
        connectionRadius?: number | undefined;
        onError?: ReactEventHandler<HTMLDivElement> & OnError | undefined;
    }
}

export const ReactFlowWrappableComponent: FunctionComponent<IReactFlowProps> = ({props}) => {
    return (
      <ReactFlowProvider>
            <Flow props={props}/>
        <Sidebar />
      </ReactFlowProvider>
    );
}