import * as React from 'react';
import {Handle, NodeProps, Position} from "reactflow";
import { HandleDirection } from "../reactflow";

export const Bubble = ({data}: NodeProps): React.ReactElement => {
  return (
    <div className={data.isSelected ?  'selected' : ''}>
      <Handle
        type={HandleDirection.TARGET}
        position={Position.Top}
        isConnectable={false}
      />
      Bubble
      <Handle
        type={HandleDirection.SOURCE}
        position={Position.Bottom}
      />
    </div>
  );
};

