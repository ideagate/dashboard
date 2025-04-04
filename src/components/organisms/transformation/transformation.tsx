import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { FC } from 'react'
import { Controller, useFieldArray, useForm, UseFormReturn } from 'react-hook-form'

import { Select, TextField } from '#/components/atoms/input'
import { Tvar } from '#/models/variable'

interface TransformationProps {
  defaultData?: Tdata
}

const Transformation: FC<TransformationProps> = (props) => {
  const form = useForm<Tdata>({
    defaultValues: props.defaultData,
  })

  return (
    <div className="w-[700px] bg-white border-solid border-2 p-4 rounded-md">
      <div>
        <Typography>Variable</Typography>
        <Variables form={form} name="vars" />
      </div>

      <div>
        <Typography>Actions</Typography>
        <ActionRest form={form} />
      </div>

      <div>
        <Typography>Outputs</Typography>
        <Variables form={form} name="outputs" />
      </div>

      <div>
        <Typography>Returns</Typography>
      </div>
    </div>
  )
}

export default Transformation

type Tdata = {
  vars?: Array<Tvar>
  // action:
  outputs?: Array<Tvar>
}

const Variables: FC<{ form: UseFormReturn<Tdata>; name: 'vars' | 'outputs' }> = ({ form, name }) => {
  const fieldArray = useFieldArray({
    control: form.control,
    name: name,
  })

  return (
    <div>
      {fieldArray.fields.map((field) => (
        <Accordion key={field.name}>
          <AccordionSummary expandIcon={'^'} aria-controls="panel1-content" id="panel1-header">
            <div>{field.name}</div>
            <div className="ml-2 italic text-slate-300">
              {field.type}: {field.value as string}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-4 gap-2">
              <TextField defaultValue={field.name} />
              <SelectVariableType value={field.type} />
              <TextField defaultValue={field.default as string} />
              <TextField defaultValue={field.value as string} />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

const SelectVariableType: FC<{ value: unknown }> = ({ value }) => {
  return (
    <Select
      value={value}
      options={[
        { label: 'String', value: 'string' },
        { label: 'Integer', value: 'int' },
        { label: 'Float', value: 'float' },
        { label: 'Boolean', value: 'bool' },
      ]}
    />
  )
}

const ActionRest: FC<{ form: UseFormReturn<Tdata> }> = ({ form }) => {
  return (
    <div>
      <div>
        <div>Method:</div>
        <Controller control={form.control} name="vars" render={() => <TextField />} />
      </div>
      <div>
        <div>Path:</div>
        <TextField />
      </div>
    </div>
  )
}
