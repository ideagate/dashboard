import { ButtonBase } from '@mui/material'
import { MdAdd } from 'react-icons/md'

export default function DataSourcePage() {
  return (
    <div className="flex justify-center items-center">
      <div>
        <div>Data source is empty</div>
        <ButtonBase className="h-[48px] bg-secondary">
          <MdAdd /> New
        </ButtonBase>
      </div>
    </div>
  )
}
