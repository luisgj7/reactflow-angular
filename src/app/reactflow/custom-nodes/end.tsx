import * as React from 'react';
import { Handle, NodeProps, Position } from "reactflow";
import { isConnectableFn } from "../validators/handle-node";
import { HandleDirection } from "../reactflow";

export const End = ({ id }: NodeProps): React.ReactElement => {
    return (
        <>
          End Node
          <Handle
              type={HandleDirection.TARGET}
              position={Position.Top}
          />
        </>
    );
};
