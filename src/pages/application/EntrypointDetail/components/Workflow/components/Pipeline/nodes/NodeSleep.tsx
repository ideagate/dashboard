import { IconZzz } from '@tabler/icons-react'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

const NodeSleep: FC<NodeProps> = ({ id }) => {
  const [, setSearchParams] = useSearchParams()

  const handleClicked = () => {
    setSearchParams((prev) => ({ ...prev, step_id: id }), { replace: true })
  }

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="bg-[#7e5cad] p-[15px] rounded-[15px] text-white"
        style={{ color: 'white' }}
        onClick={handleClicked}
      >
        <IconZzz />
      </div>
      <Handle type="source" position={Position.Right} />
      <div className="absolute w-full text-center font-bold">Sleep</div>
    </>
  )
}

export default NodeSleep
