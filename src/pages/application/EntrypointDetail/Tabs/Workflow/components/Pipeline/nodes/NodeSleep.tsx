import { IconZzz } from '@tabler/icons-react'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { FC } from 'react'

import { useWorkflow } from '../../../hooks/workflow'
import { Node } from '../../../types/graph'

const NodeSleep: FC<NodeProps<Node>> = ({ id, data }) => {
  const { showStepInfo } = useWorkflow()

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="bg-[#7e5cad] p-[15px] rounded-[15px] text-white"
        style={{ color: 'white' }}
        onClick={() => showStepInfo(id)}
      >
        <IconZzz />
      </div>
      <Handle type="source" position={Position.Right} />
      <div className="absolute w-full text-center font-bold">{data.step.name}</div>
    </>
  )
}

export default NodeSleep
