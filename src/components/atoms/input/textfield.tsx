import { FC, InputHTMLAttributes } from 'react'

export const TextField: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input className="border-solid border-[1px] border-slate-400 rounded-[4px] px-3" {...props} />
}
