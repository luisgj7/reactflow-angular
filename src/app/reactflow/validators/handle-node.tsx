import {CustomNodeTypes, DecisionLabelShape, FlowChangeType, HandleDirection, NodeColor} from "../reactflow";
import {
  Edge,
  getConnectedEdges,
  Node,
  ReactFlowState,
  useReactFlow,
  useStore,
  ReactFlowInstance,
  NodeChange
} from "reactflow";
import * as React from "react";

export const isConnectableFn = (id: string, direction: HandleDirection, sourceHandle?: string): boolean => {
  const edgesCount: number = useStore((store: ReactFlowState) => store.edges.length);
  const { getNode, getEdges }: ReactFlowInstance = useReactFlow();
  const [hasConnections, setHasConnections] = React.useState(false);

  React.useEffect(() => {
    setHasConnections(() => {
      const node: Node = getNode(id);
      return hasConnectionFn(node, getConnectedEdges([node], getEdges()), direction, sourceHandle);
    });
  }, [direction, edgesCount, sourceHandle]);

  return hasConnections;
};

const hasConnectionFn = (node: Node, edges: Edge[], direction: HandleDirection, sourceHandle?: string): boolean => {
  return node.type === CustomNodeTypes.DECISION && direction === HandleDirection.SOURCE
    ? edges.some((edge) => edge.sourceHandle === sourceHandle)
    : edges.some((edge) => edge[direction] === node.id)
}

export const setNodeDataFn = (node: Node, labels: DecisionLabelShape): Node => {
  const nodeMapping = {
    [CustomNodeTypes.DECISION]: {
      ...node,
      data: {
        ...node.data,
        outLabel: labels,
        outRightConnId: nextId(),
        outBottomConnId: nextId()
      }
    },
    [CustomNodeTypes.MULTI_DECISION]: {
      ...node,
      data: {
        ...node.data,
      }
    }
  };
  return nodeMapping[node.type] || node;
}

export const nodeColorFn = (node: Node): string => {
  const nodeColorMapping = {
    [CustomNodeTypes.START]: NodeColor.START,
    [CustomNodeTypes.END]: NodeColor.END,
    [CustomNodeTypes.DECISION]: NodeColor.DECISION,
  }
  return nodeColorMapping[node.type] || NodeColor.DEFAULT
}

export const getNodeChanges = (changes: NodeChange[], nds: Node[]): NodeChange[] => {
  if (changes.some((change) => change.type === FlowChangeType.REMOVE
    && nds.find((nd) => nd.id === change.id)?.type === CustomNodeTypes.MULTI_DECISION )) {

    const nodes = nds.filter((node) =>
      changes.some((nc) => {
        return nc.type === FlowChangeType.REMOVE ? node.id.includes(nc?.id) : false
      }))

    return nodes.map((nd) => {
      return {
        id: nd.id,
        type: FlowChangeType.REMOVE
      }
    }) as NodeChange[]
  }

  return changes;
}
export const nextId = (): string => {
  return window.crypto.randomUUID().split('-').pop();
}


