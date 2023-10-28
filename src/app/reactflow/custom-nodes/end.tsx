import * as React from 'react';
import { Handle, Position } from "reactflow";
import { HandleDirection } from "../reactflow";

export const End = (): React.ReactElement => {
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
