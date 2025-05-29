import { Box } from '@mui/material'
import { IconPlayerPlay } from '@tabler/icons-react'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { FC } from 'react'

import { useWorkflow } from '../../../hooks/workflow'

const NodeStart: FC<NodeProps> = ({ id }) => {
  const { setStepInfoId, stepInfoId } = useWorkflow()

  const isNodeUnfocused = stepInfoId != null && stepInfoId !== id

  return (
    <Box component="div" sx={{ opacity: isNodeUnfocused ? 0.3 : 1 }}>
      <div
        className="bg-[#474e93] p-[15px] rounded-[15px] text-white"
        style={{ color: 'white' }}
        onClick={() => setStepInfoId(id)}
      >
        <IconPlayerPlay />
      </div>
      <Handle type="source" position={Position.Right} />
      <div className="absolute w-full text-center font-bold">Start</div>
    </Box>
  )
}

export default NodeStart
