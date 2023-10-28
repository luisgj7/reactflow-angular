import * as React from 'react';
import { Handle, NodeProps, Position } from "reactflow";
import { isConnectableFn } from "../validators/handle-node";
import { HandleDirection } from "../reactflow";

export const Start = ({ id }: NodeProps): React.ReactElement => {
    const hasSourceConnections = isConnectableFn(id, HandleDirection.SOURCE);
    return (
        <>
          Start Node
          <Handle
              type={HandleDirection.SOURCE}
              position={Position.Bottom}
              isConnectable={!hasSourceConnections}
          />
        </>
    );
};
