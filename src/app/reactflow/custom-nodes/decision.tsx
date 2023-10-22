import * as React from 'react';
import { Handle, NodeProps, Position  } from "reactflow";
import { HandleDirection } from "../reactflow";
import { isConnectableFn } from "../validators/handle-node";

export const Decision = ({ id }: NodeProps): React.ReactElement => {
    const hasTargetConnections = isConnectableFn(id, HandleDirection.TARGET);
    return (
        <div className="react-flow__node-decision content">
          <Handle
              className="react-flow__node-decision handle handle-top"
              type={HandleDirection.TARGET}
              position={Position.Top}
              isConnectable={!hasTargetConnections}
          />
          <div className="react-flow__node-decision shape"></div>
          <div className="react-flow__node-decision text">
            Decision
          </div>

          <Handle
            className="react-flow__node-decision handle handle-bottom"
            id="no"
            type={HandleDirection.SOURCE}
            position={Position.Bottom}
          />
          <div className="react-flow__node-decision text__label text__label-bottom"></div>

          <Handle
            className="react-flow__node-decision handle handle-right"
            id="yes"
            type={HandleDirection.SOURCE}
            position={Position.Right}
          />
          <div className="react-flow__node-decision text__label text__label-right"></div>

        </div>
    );
};
