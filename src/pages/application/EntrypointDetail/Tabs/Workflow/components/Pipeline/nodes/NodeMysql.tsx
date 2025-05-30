import { Box } from '@mui/material'
import { IconDatabase } from '@tabler/icons-react'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { FC } from 'react'

import { useWorkflow } from '../../../hooks/workflow'
import { Node } from '../../../types/graph'

const NodeMysql: FC<NodeProps<Node>> = ({ id, data }) => {
  const { setStepInfoId: showStepInfo, stepInfoId } = useWorkflow()

  const isNodeUnfocused = stepInfoId != null && stepInfoId !== id

  return (
    <Box component="div" sx={{ opacity: isNodeUnfocused ? 0.3 : 1 }}>
      <Handle type="target" position={Position.Left} />
      <div
        className="bg-[#7e5cad] p-[15px] rounded-[15px] text-white"
        style={{ color: 'white' }}
        onClick={() => showStepInfo(id)}
      >
        <IconDatabase />
      </div>
      <Handle type="source" position={Position.Right} />
      <div className="absolute w-full text-center font-bold text-[10px]">{data.step.name}</div>
    </Box>
  )
}

export default NodeMysql
