import { HandleDirection } from "../reactflow";
import { getConnectedEdges, useReactFlow, useStore } from "reactflow";
import * as React from "react";

export const isConnectableFn = (id: string, direction: HandleDirection) => {
  const edgesCount = useStore((store) => store.edges.length);
  const { getNode, getEdges } = useReactFlow();

  const [hasConnections, setHasConnections] = React.useState(false);

  React.useEffect(() => {
    setHasConnections((connection) => {
      const edges = getConnectedEdges([getNode(id)], getEdges()).filter(
        (edge) => edge[direction] === id
      );
      return edges.length > 0;
    });
  }, [getNode, getEdges, id, edgesCount]);

  return hasConnections;
};
