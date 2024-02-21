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
  useStoreApi, Edge, ConnectionLineType, MarkerType, NodePositionChange, NodeRemoveChange, EdgeRemoveChange
} from 'reactflow';
import { nodes as initialNodes, edges as initialEdges } from '../initial-elements';
import {CustomNodeTypes, DecisionLabelShape, FlowChangeType, IReactFlowProps} from '../reactflow';
import { Start, Decision, End, Bubble, MultiDecision } from '../custom-nodes'
import {DragEvent, MouseEvent as ReactMouseEvent} from "react";
import { getNodeChanges, nextId, nodeColorFn, setNodeDataFn} from "../validators/handle-node";
import { ButtonEdge } from "../custom-edges/button-edge";
import {asyncScheduler, BehaviorSubject} from "rxjs";
import {Simulate} from "react-dom/test-utils";


const nodeTypes: NodeTypes = {
  start: Start,
  end: End,
  bubble: Bubble,
  decision: Decision,
  multiDecision: MultiDecision,
}

const edgeTypes: EdgeTypes = {
  buttonEdge: ButtonEdge
}

export const Flow: React.FunctionComponent<IReactFlowProps> = ({props}) => {
    const minimapStyle = {
        height: 120,
    };
    const decisionLabel: DecisionLabelShape = {
      outRightConnection: "Yes",
      outBottomConnection: "No"
    }

    const edgeSelected = new BehaviorSubject<Edge>(null);
    const selectedNode: Node<any, string> = props.selectedNode;

    const store = useStoreApi();

    const reactFlowWrapper = React.useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
    const [isValidDrawLine, setIsValidDrawLine] = React.useState(false);

    const [nodes, setNodes] = useNodesState(initialNodes as any ?? []);
    const [edges, setEdges] = useEdgesState(initialEdges as any);

    const onConnect = React.useCallback(
      (params: Connection) => setEdges(() => {
        console.log('params: ', params);
        return addEdge({...params}, store.getState().edges)
      }),
      []);

    const onConnectStart = React.useCallback(
        (_, { nodeId, handleType, handleId }: OnConnectStartParams ): void => {

          console.log('on connect start: ', ({ nodeId, handleType, handleId }));
        }, [ nodes, setIsValidDrawLine]
    );

    const onNodesChange = React.useCallback((changes: NodeChange[]): void => {
      return setNodes((nds: Node[]) => {
        const removeChanges: NodeRemoveChange[] = changes.filter((change) => change.type === FlowChangeType.REMOVE) as NodeRemoveChange[];

        if (removeChanges.length) {
          const isChip = nds.some((node) =>
            removeChanges.some((nc) => node.id === nc.id && node.type === CustomNodeTypes.BUBBLE));

          console.log('isChip:', isChip);
          if (isChip) {
            return applyNodeChanges([], nds);
          }
        }

        return applyNodeChanges(getNodeChanges(changes, nds), nds);
      });
      },
      [setNodes, getNodeChanges]
    );

    const onEdgesChange = React.useCallback(
        (changes: EdgeChange[]) =>
          setEdges((edges: Edge[]) => {

          const removeChanges: EdgeRemoveChange[] = changes.filter((change) => change.type === FlowChangeType.REMOVE) as EdgeRemoveChange[];

          if (removeChanges.length) {
            const [change] = removeChanges;
            const edge = edges.find((ed) => ed.id === change.id);
            const nodeSourceType = nodes.find((node) => node.id === edge.target)?.type;

            if (nodeSourceType === CustomNodeTypes.BUBBLE) {
              return applyEdgeChanges([], edges);
            }
          }
          return applyEdgeChanges([...changes], store.getState().edges);
        }),
        [setEdges, nodes, store]
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


            const nodeId = nextId();

            if (type === CustomNodeTypes.MULTI_DECISION) {

              const group: Node = {
                  id: `${nodeId}-${CustomNodeTypes.GROUP}`,
                  data: {label: 'Group'},
                  position: {
                    x: position.x - 160,
                    y: position.y - 160
                  },
                  type: CustomNodeTypes.GROUP
                };

              const newNode = setNodeDataFn(
                {
                  id: nodeId,
                  type,
                  position: {
                    x: 130,
                    y: 60
                  },
                  data: { label: `${type} node` },
                  parentNode: `${nodeId}-${CustomNodeTypes.GROUP}`,
                  extent: 'parent',
                },
                decisionLabel
              );

              const extras: Node[] = [
                {
                  id: newNode.id + '-1',
                  type: CustomNodeTypes.BUBBLE,
                  position: {x: newNode.position.x - 80, y: newNode.position.y + 200},
                  data: { label: 'bubble 1'},
                  parentNode: `${nodeId}-${CustomNodeTypes.GROUP}`,
                  extent: 'parent'
                },
                {
                  id: newNode.id + '-2',
                  type: CustomNodeTypes.BUBBLE,
                  position: {x: newNode.position.x + 10, y: newNode.position.y + 200},
                  data: { label: 'bubble 2'},
                  parentNode: `${nodeId}-${CustomNodeTypes.GROUP}`,
                  extent: 'parent'
                },
                {
                  id: newNode.id + '-3',
                  type: CustomNodeTypes.BUBBLE,
                  position: {x: newNode.position.x + 100, y: newNode.position.y + 200},
                  data: { label: 'bubble 3'},
                  parentNode: `${nodeId}-${CustomNodeTypes.GROUP}`,
                  extent: 'parent'
                }
              ];


              setNodes((nds: Node[]) => {
                props.onNodeAdd(newNode);
                return nds.concat([group, newNode, ...extras])
              });

              asyncScheduler.schedule(() => {
                const edgesChange = extras.map((bubble, index) => {
                    return {
                      item: {
                        id: nextId(),
                        type: ConnectionLineType.Straight,
                        source: `${newNode.id}`,
                        target: `${newNode.id}-${(1 + index)}`,
                        markerEnd: {
                          type: MarkerType.ArrowClosed,
                        },
                      },
                      type: FlowChangeType.ADD
                    }
                  }) as EdgeChange[]
                setEdges(() => applyEdgeChanges(edgesChange, store.getState().edges));
              });
            }

            else {
              const newNode = setNodeDataFn(
                {
                  id: nodeId,
                  type,
                  position,
                  data: { label: `${type} node` },
                },
                decisionLabel
              );

              setNodes((nds: Node[]) => {
                props.onNodeAdd(newNode);
                return nds.concat([newNode]);
              });
            }

        },[reactFlowInstance, props, decisionLabel, store]
    );

    /*const onEdgeClick = React.useCallback(
      (_, edge) => {
      console.log('useCallback::edge:', edge);
      edgeSelected.next(edge);
      console.log('edgeSelected: ',edgeSelected?.getValue());
    }, [edgeSelected]);*/

    const onNodeClickFn = React.useCallback(
      (event: ReactMouseEvent, node: Node): void => {

        if ([CustomNodeTypes.GROUP.toString(), CustomNodeTypes.BUBBLE.toString()].includes(node.type)) {
          const [nodeId] = node.id.split('-');
          const nodeSelected = nodes.find((nc) => nc.id === nodeId);
          return props.onNodeClick(event, nodeSelected);
        }

        return props.onNodeClick(event, node);
      }, [props.onNodeClick, nodes])



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
                onNodeClick={onNodeClickFn}
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
