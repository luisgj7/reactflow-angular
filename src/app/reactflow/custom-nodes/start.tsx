import * as React from 'react';
import { useStore, useReactFlow, getConnectedEdges, Handle, Position  } from "reactflow";


/* const connectableFn = (id, direction) => {
    //const edgesCount = useStore((store) => store.edges.length);
    const { getNode, getEdges } = useReactFlow();
    const node = getNode(id);
    const edgesList = getEdges();
  
    const [hasConnections, setHasConnections] = React.useState(false);
  
    React.useEffect(() => {
      setHasConnections(() => {
        const edges = getConnectedEdges([node], edgesList).filter(
          (e) => e[direction] === id
        );
        console.log('useEffect Call');
  
        return edges.length > 0;
      });
    }, [node, edgesList, id]);
    console.log('function');
  
    return hasConnections;
  }; */

// export const Start = ({ id }) => {
//     const hasSourceConnections = connectableFn(id, "source");

//     return (
//         <>
//         <div>Has connection? {`${hasSourceConnections}`}</div>
//         <Handle
//             type="source"
//             position={Position.Bottom}
//             isConnectable={!hasSourceConnections}
//         />
//         </>
//     );
// };

export const Start = ({ id, isConnectable, type }) => {
    // const { getNode, getEdges } = useReactFlow();
    // const [ hasConnections, setHasConnections ] = React.useState(false);

    // const onConnect = React.useCallback(() => {
    //     setHasConnections(() => {
    //         const edges = getConnectedEdges([getNode(id)], getEdges()).filter(
    //           (e) => e['source'] === id
    //         );
    //         console.log('onConnect Call');
      
    //         return edges.length > 0;
    //       });
    // },[getNode, getEdges, id]);

    return (
        <>
        <div>Has connection? {`${type}`}</div>
        <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={!isConnectable}
        />
        </>
    );
};