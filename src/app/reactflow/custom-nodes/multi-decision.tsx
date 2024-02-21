import * as React from 'react';
import { Handle, NodeProps, Position } from "reactflow";
import { HandleDirection } from "../reactflow";
import { FunctionComponent, memo, ReactElement} from "react";

const MultiDecisionNode: FunctionComponent = ({ id, data }: NodeProps): ReactElement => {
  return (
    <div className="react-flow__node-multiDecision content">
      <Handle
        className="react-flow__node-decision handle handle-top"
        type={HandleDirection.TARGET}
        position={Position.Top}
      />
      <div className="react-flow__node-multiDecision shape"></div>
      <div className="react-flow__node-multiDecision text">
        Multi Decision
      </div>
      <Handle
        className="react-flow__node-multiDecision handle handle-bottom"
        id={data.outBottomConnId}
        type={HandleDirection.SOURCE}
        position={Position.Bottom}
        isConnectable={false}
      />
    </div>
  );
};

export const MultiDecision = memo(MultiDecisionNode);
