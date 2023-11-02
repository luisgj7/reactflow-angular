import * as React from 'react';
import {
  applyEdgeChanges,
  BaseEdge,
  Edge,
  EdgeChange,
  EdgeLabelRenderer,
  EdgeProps,
  useReactFlow,
  useStoreApi,
  getSmoothStepPath
} from 'reactflow';
import { memo, MouseEvent, useState } from "react";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(
    { sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  const [styleDisplay, setStyleDisplay] = useState({display: 'block'});
  const showButton = (e: MouseEvent) => {
    e.preventDefault();
    setStyleDisplay({display: 'block'});
  };
  const hideButton = (e: MouseEvent) => {
    e.preventDefault();
    setStyleDisplay({display: 'block'});
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="react-flow__edgelabel-renderer__content nodrag nopan"
          style={{transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}}
          onMouseEnter={showButton}
          onMouseLeave={hideButton}>
            <div style={styleDisplay}>
              <Button edgeId={id}/>
            </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

const Button = ({edgeId}) => {
  const { setEdges } = useReactFlow();
  const store = useStoreApi();
  const onEdgeClick = (event: MouseEvent): void => {
    event.stopPropagation();
    const changes: EdgeChange = { id: edgeId, type: "remove" };

    setEdges((currentEdges: Edge[]) => {
      const edges = applyEdgeChanges([changes], currentEdges);
      store.setState({edges});
      return edges;
    });

  };

  return (
    <>
      <button
        className="react-flow__edgelabel-renderer__content--button"
        onClick={onEdgeClick}> × </button>
    </>
  );
}

export const ButtonEdge = memo(CustomEdge);
