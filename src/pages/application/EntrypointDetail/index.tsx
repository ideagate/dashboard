import { FC } from 'react'
import { useParams } from 'react-router-dom'

const EntrypointDetail: FC = () => {
  const { entrypoint_id } = useParams()
  return <div>EntrypointDetail - {entrypoint_id}</div>
}

export default EntrypointDetail
