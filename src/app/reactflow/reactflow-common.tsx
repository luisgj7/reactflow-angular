import { useCallback } from 'react';
import { useReactFlow, getConnectedEdges } from 'reactflow';

/**
 * Common usage functions for react-flow
 */
export const useValidatorFn = () => {
      const { getNode, getEdges } = useReactFlow();
    
      return useCallback(
        (connection) => {
          const edges = getConnectedEdges([getNode(connection.target)], getEdges());
          const sourceNode = getNode(connection.source)
          const sourceNodeType = sourceNode?.type ?? 'default';
          const edgesSource = getConnectedEdges([sourceNode], getEdges());
          
          // if (sourceNodeType === 'default') {
          //   if (edgesSource.length > 1)
          //       return false;
          // }
          // else {
          //   return !edgesSource.length;
          // }

          
          // switch (sourceNodeType) {
          //   case 'default': return !(edgesSource.length > 1);
          //   case 'decision': return !(edgesSource.length > 2);
          //   default: return !edgesSource.length;
          // }

          //return (sourceNodeType === 'default' && edgesSource.length > 1) ? false : !edgesSource.length;
          

          for (let i = 0; i < edges.length; i++) {
            if (edges[i].sourceHandle === connection.sourceHandle || edges[i].targetHandle === connection.targetHandle) {
              console.log('handle already used')
              return false;
            }
          }
          return true;
        },
        [getNode, getEdges]
      );
    };
