import * as React from 'react';
import { FunctionComponent } from 'react';

export const Sidebar: FunctionComponent<unknown> = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'start')} draggable>
          Start Node
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'end')} draggable>
          End Node
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
          Default Node
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'decision')} draggable>
          Decision Node
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'multiDecision')} draggable>
          Multi Decision Node
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'bubble')} draggable>
          Bubble
        </div>
    </aside>
  );
};
