import * as React from 'react';
import { Handle, NodeProps, Position } from "reactflow";
import { HandleDirection } from "../reactflow";
import { isConnectableFn } from "../validators/handle-node";

export const Decision = ({ id, data }: NodeProps): React.ReactElement => {
    return (
        <div className="react-flow__node-decision content">
          <Handle
              className="react-flow__node-decision handle handle-top"
              type={HandleDirection.TARGET}
              position={Position.Top}
          />
          <div className="react-flow__node-decision shape"></div>
          <div className="react-flow__node-decision text">
            Decision
          </div>

          <Handle
            className="react-flow__node-decision handle handle-bottom"
            id={data.outBottomConnId}
            type={HandleDirection.SOURCE}
            position={Position.Bottom}
            isConnectable={!isConnectableFn(id, HandleDirection.SOURCE, data.outBottomConnId)}
          />
          <div className="react-flow__node-decision text__label text__label-bottom">
            {data.outLabel.outBottomConnection}
          </div>

          <Handle
            className="react-flow__node-decision handle handle-right"
            id={data.outRightConnId}
            type={HandleDirection.SOURCE}
            position={Position.Right}
            isConnectable={!isConnectableFn(id, HandleDirection.SOURCE, data.outRightConnId)}
          />
          <div className="react-flow__node-decision text__label text__label-right">
            {data.outLabel.outRightConnection}
          </div>

        </div>
    );
};
