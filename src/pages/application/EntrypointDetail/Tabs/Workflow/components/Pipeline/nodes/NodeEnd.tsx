import { IconFlag } from '@tabler/icons-react'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { FC } from 'react'

const NodeEnd: FC<NodeProps> = () => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="bg-[#474e93] p-[15px] rounded-[15px] text-white" style={{ color: 'white' }}>
        <IconFlag />
      </div>
      <div className="absolute w-full text-center font-bold">Finish</div>
    </>
  )
}

export default NodeEnd
