import { Paper } from '@mantine/core'
import { FC } from 'react'
import { Stepper } from './Stepper'
import { Step } from 'src/type/Step'

type Props = {
  label?: string
  active: ('filled' | 'active' | 'blank')[]
  stepList: Step[]
}

/**
 * @package
 */
export const StepperCard: FC<Props> = (props) => {
  return (
    <Paper
      shadow='xs'
      radius='lg'
      p='md'
      className='mx-4 mt-12 pt-8 pb-20 xs:mx-auto xs:mt-20 xs:w-[550px] xs:pt-12 xs:pb-28 md:w-[650px] md:pt-16'
    >
      {props.label ? (
        <div className='mx-auto mb-12 max-w-[450px] xs:text-lg md:mb-16 md:max-w-[550px]'>
          {props.label}
        </div>
      ) : null}
      {props.stepList.map((step) => {
        return (
          <Stepper
            key={step.id}
            active={props.active[step.id]}
            step={{
              id: step.id,
              text: step.text,
              label: step.label,
              icon: step.icon,
              longer: step.longer,
            }}
          >
            {step.children}
          </Stepper>
        )
      })}
    </Paper>
  )
}
