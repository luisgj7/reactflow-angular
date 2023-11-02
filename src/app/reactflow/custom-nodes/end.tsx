import * as React from 'react';
import { Handle, Position } from "reactflow";
import { HandleDirection } from "../reactflow";
import { ComponentType, memo, MemoExoticComponent } from "react";

const EndNode = (): React.ReactElement => {
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

export const End: MemoExoticComponent<ComponentType> = memo(EndNode);
