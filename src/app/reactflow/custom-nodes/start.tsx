import * as React from 'react';
import { Handle, NodeProps, Position } from "reactflow";
import { isConnectableFn } from "../validators/handle-node";
import { HandleDirection } from "../reactflow";
import { ComponentType, memo, MemoExoticComponent } from "react";

const StartNode = ({ id }: NodeProps): React.ReactElement => {
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

export const Start: MemoExoticComponent<ComponentType> = memo(StartNode);
