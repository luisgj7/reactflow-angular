import * as React from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
  Node, Connection,
  OnConnectStartParams,
  NodeChange,
  XYPosition,
  NodeTypes,
  EdgeTypes,
  useStoreApi
} from 'reactflow';
import { nodes as initialNodes, edges as initialEdges } from '../initial-elements';
import { DecisionLabelShape, IReactFlowProps } from '../reactflow';
import { Start, Decision, End } from '../custom-nodes'
import { DragEvent } from "react";
import { nextId, nodeColorFn, setNodeDataFn } from "../validators/handle-node";
import { ButtonEdge } from "../custom-edges/button-edge";

export const Flow: React.FunctionComponent<IReactFlowProps> = ({props}) => {
    const minimapStyle = {
        height: 120,
    };
    const decisionLabel: DecisionLabelShape = {
      outRightConnection: "Yes",
      outBottomConnection: "No"
    }

    const store = useStoreApi();

    const reactFlowWrapper = React.useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
    const [isValidDrawLine, setIsValidDrawLine] = React.useState(false);

    const [nodes, setNodes] = useNodesState(initialNodes as any ?? []);
    const [edges, setEdges] = useEdgesState(initialEdges as any);

    const onConnect = React.useCallback(
      (params: Connection) => setEdges(() => {
        return addEdge({...params}, store.getState().edges)
      }),
      []);

    const onConnectStart = React.useCallback(
        (_, { nodeId, handleType, handleId }: OnConnectStartParams ): void => {

          console.log('on connect start: ', ({ nodeId, handleType, handleId }));
        }, [ nodes, setIsValidDrawLine]
    );

    const onNodesChange = React.useCallback(
        (changes: NodeChange[]): void => {
            setNodes((nds: Node[]) => applyNodeChanges(changes, nds))
        },
        [setNodes]
      );

    const onEdgesChange = React.useCallback(
        (changes: EdgeChange[]) => setEdges(() => {
          return applyEdgeChanges(changes, store.getState().edges)
        }),
        [setEdges]
    );

    const onDragOver = React.useCallback((event: DragEvent): void => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }, []);

    const onDrop = React.useCallback(
        (event: DragEvent): void => {
            event.preventDefault();

            const reactFlowBounds: DOMRect = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position: XYPosition = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode: Node = setNodeDataFn(
              {
                id: nextId(),
                type,
                position,
                data: { label: `${type} node` },
              },
              decisionLabel
            );

            setNodes((nds: Node[]) => {
                props.onNodeAdd(newNode);
                return nds.concat(newNode);
            });
        },[reactFlowInstance, props, decisionLabel]
    );

    return (
        <div className="flow-content" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                defaultNodes={initialNodes}
                defaultEdges={initialEdges}
                defaultEdgeOptions={props.defaultEdgeOptions}
                //isValidConnection={useValidatorFn()}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={props.onNodeClick}
                onNodeDoubleClick={props.onNodeDoubleClick}
                onNodeMouseEnter={props.onNodeMouseEnter}
                onNodeMouseMove={props.onNodeMouseMove}
                onNodeMouseLeave={props.onNodeMouseLeave}
                onNodeContextMenu={props.onNodeContextMenu}
                onNodeDragStart={props.onNodeDragStart}
                onNodeDrag={props.onNodeDrag}
                onNodeDragStop={props.onNodeDragStop}
                onEdgeClick={props.onEdgeClick}
                onEdgeUpdate={props.onEdgeUpdate}
                onEdgeContextMenu={props.onEdgeContextMenu}
                onEdgeMouseEnter={props.onEdgeMouseEnter}
                onEdgeMouseMove={props.onEdgeMouseMove}
                onEdgeMouseLeave={props.onEdgeMouseLeave}
                onEdgeDoubleClick={props.onEdgeDoubleClick}
                onEdgeUpdateStart={props.onEdgeUpdateStart}
                onEdgeUpdateEnd={props.onEdgeUpdateEnd}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodesDelete={props.onNodesDelete}
                onEdgesDelete={props.onEdgesDelete}
                onSelectionDragStart={props.onSelectionDragStart}
                onSelectionDrag={props.onSelectionDrag}
                onSelectionDragStop={props.onSelectionDragStop}
                onSelectionStart={props.onSelectionStart}
                onSelectionEnd={props.onSelectionEnd}
                onSelectionContextMenu={props.onSelectionContextMenu}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={props.onConnectEnd}
                onClickConnectStart={props.onClickConnectStart}
                onClickConnectEnd={props.onClickConnectEnd}
                onMove={props.onMove}
                onMoveStart={props.onMoveStart}
                onMoveEnd={props.onMoveEnd}
                onSelectionChange={props.onSelectionChange}
                onPaneScroll={props.onPaneScroll}
                onPaneClick={props.onPaneClick}
                onPaneContextMenu={props.onPaneContextMenu}
                onPaneMouseEnter={props.onPaneMouseEnter}
                onPaneMouseMove={props.onPaneMouseMove}
                onPaneMouseLeave={props.onPaneMouseLeave}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                connectionLineType={props.connectionLineType}
                connectionLineStyle={props.connectionLineStyle}
                connectionLineComponent={props.connectionLineComponent}
                connectionLineContainerStyle={props.connectionLineContainerStyle}
                connectionMode={props.connectionMode}
                deleteKeyCode={props.deleteKeyCode}
                selectionKeyCode={props.selectionKeyCode}
                selectionOnDrag={props.selectionOnDrag}
                panActivationKeyCode={props.panActivationKeyCode}
                multiSelectionKeyCode={props.multiSelectionKeyCode}
                zoomActivationKeyCode={props.zoomActivationKeyCode}
                snapToGrid={props.snapToGrid}
                snapGrid={props.snapGrid}
                onlyRenderVisibleElements={props.onlyRenderVisibleElements}
                nodesDraggable={props.nodesDraggable}
                nodesConnectable={props.nodesConnectable}
                nodesFocusable={props.nodesFocusable}
                nodeOrigin={props.nodeOrigin}
                edgesFocusable={props.edgesFocusable}
                elementsSelectable={props.elementsSelectable}
                selectNodesOnDrag={props.selectNodesOnDrag}
                panOnDrag={props.panOnDrag}
                minZoom={props.minZoom}
                maxZoom={props.maxZoom}
                defaultViewport={props.defaultViewport}
                translateExtent={props.translateExtent}
                preventScrolling={props.preventScrolling}
                nodeExtent={props.nodeExtent}
                defaultMarkerColor={props.defaultMarkerColor}
                zoomOnScroll={props.zoomOnScroll}
                zoomOnPinch={props.zoomOnPinch}
                panOnScroll={props.panOnScroll}
                panOnScrollSpeed={props.panOnScrollSpeed}
                panOnScrollMode={props.panOnScrollMode}
                zoomOnDoubleClick={props.zoomOnDoubleClick}
                edgeUpdaterRadius={props.edgeUpdaterRadius}
                noDragClassName={props.noDragClassName}
                noWheelClassName={props.noWheelClassName}
                noPanClassName={props.noPanClassName}
                fitView={props.fitView}
                fitViewOptions={props.fitViewOptions}
                connectOnClick={props.connectOnClick}
                attributionPosition={props.attributionPosition}
                proOptions={props.proOptions}
                elevateNodesOnSelect={props.elevateNodesOnSelect}
                elevateEdgesOnSelect={props.elevateEdgesOnSelect}
                disableKeyboardA11y={props.disableKeyboardA11y}
                autoPanOnNodeDrag={props.autoPanOnNodeDrag}
                autoPanOnConnect={props.autoPanOnConnect}
                connectionRadius={props.connectionRadius}
                onError={props.onError}
                >
                <MiniMap style={minimapStyle} nodeColor={nodeColorFn} nodeStrokeWidth={3} zoomable pannable  />
                <Controls showInteractive={false} />
                <Background style={{ background: '#72aadc', opacity: '4%'}} />
            </ReactFlow>
        </div>
    );
}

const nodeTypes: NodeTypes = {
  start: Start,
  end: End,
  decision: Decision
}

const edgeTypes: EdgeTypes = {
  buttonEdge: ButtonEdge
}
