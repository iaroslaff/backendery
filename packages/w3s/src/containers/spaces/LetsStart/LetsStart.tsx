import { Field, Form, Formik, FormikHelpers } from "formik"
import React, { FC, KeyboardEventHandler } from "react"
import * as Yup from "yup"

import AnimateSignalStrip from "../../../components/AnimateSignalStrip/AnimateSignalStrip"
import BudgetRange from "../../../components/BudgetRange/BudgetRange"
import { SvgIcon } from "../../../components/elements/Icon"

import "./LetsStart.scss"

/* prettier-ignore */
const BUDGET_MIN =  1_000 as number
const BUDGET_MAX = 50_000 as number

interface ILetsStartFormValues {
  name: string
  email: string
  budgetMin: number
  budgetMax: number
  projectDescription: string
}

const LetsStart: FC = () => {
  const Schema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string().email().required("@mail is required"),
    projectDescription: Yup.string().required("an about the project is required"),
  })

  const initialFormValues: ILetsStartFormValues = {
    name: "",
    email: "",
    budgetMin: BUDGET_MIN,
    budgetMax: BUDGET_MAX,
    projectDescription: "",
  }

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  const handleSendMessage = (values: ILetsStartFormValues, actions: FormikHelpers<ILetsStartFormValues>): void => {
    actions.resetForm()
  }

  return (
    <div className='lets-start'>
      <h2 className='lets-start__title'>Let&apos;s start_</h2>
      <h3 className='lets-start__description'>Fill in the blanks and we&apos;ll respond in one business day</h3>
      <div className='lets-start__animate-signal-strip-wrapper'>
        <AnimateSignalStrip
          symbol='.'
          maxNumberOfSymbols={5}
          minInterval={1_250}
          maxInterval={2_500}
          initialSymbols='.....'
          style={{
            color: "#67df8f",
            width: "50px",
          }}
        />
      </div>
      <p className='lets-start__decorative-text'>These sessions give you direct</p>
      <div className='lets-start__decorative-rectangle' />

      <Formik
        initialValues={initialFormValues}
        onSubmit={(values, actions) => handleSendMessage(values, actions)}
        validationSchema={Schema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, errors, submitCount }) => (
          <div className='lets-start__form'>
            <Form onKeyDown={handleKeyDown}>
              <div className='lets-start__form-wrapper'>
                <div className='lets-start__inputs-wrapper'>
                  <div className='lets-start-input'>
                    <Field name='name' id='name' className='lets-start-input__field' />
                    <label htmlFor='name' className={`lets-start-input__label ${values.name && "label-top"}`}>
                      What&apos;s your name?
                    </label>
                    {submitCount > 0 && errors.name && <div className='lets-start-input__error'>{errors.name}</div>}
                  </div>
                  <div className='lets-start-input'>
                    <Field name='email' id='email' className='lets-start-input__field' />
                    <label htmlFor='email' className={`lets-start-input__label ${values.email && "label-top"}`}>
                      Your @mail?
                    </label>
                    {submitCount > 0 && errors.email && <div className='lets-start-input__error'>{errors.email}</div>}
                  </div>
                  {/**
                   * attention! not a standard for a form.
                   * components are used here to determine the project budget
                   */}
                  <div className='lets-start__budget'>
                    <p className='lets-start__budget-title'>What's your project budget?</p>
                    <BudgetRange currencyUnit='$' max={BUDGET_MAX} measureUnit='k' min={BUDGET_MIN} />
                  </div>
                  {/**
                   * end attention
                   */}
                  <div className='lets-start-input lets-start__project-description'>
                    <Field name='projectDescription' id='projectDescription' className='lets-start-input__field' />
                    <label
                      htmlFor='projectDescription'
                      className={`lets-start-input__label ${values.projectDescription && "label-top"}`}
                    >
                      Tell us about the project
                    </label>
                    {submitCount > 0 && errors.projectDescription && (
                      <div className='lets-start-input__error'>{errors.projectDescription}</div>
                    )}
                  </div>
                </div>
                <button className='lets-start__send-message-btn' type='submit'>
                  <span>Send Message</span>
                  <SvgIcon name='arrow-right' />
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default LetsStart
