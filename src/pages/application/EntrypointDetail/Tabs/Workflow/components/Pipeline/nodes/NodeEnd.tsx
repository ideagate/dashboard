import { IconFlag } from '@tabler/icons-react'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { FC } from 'react'

import { useWorkflow } from '../../../hooks/workflow'

const NodeEnd: FC<NodeProps> = ({ id }) => {
  const { showStepInfo } = useWorkflow()

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="bg-[#474e93] p-[15px] rounded-[15px] text-white"
        style={{ color: 'white' }}
        onClick={() => showStepInfo(id)}
      >
        <IconFlag />
      </div>
      <div className="absolute w-full text-center font-bold">Finish</div>
    </>
  )
}

export default NodeEnd
