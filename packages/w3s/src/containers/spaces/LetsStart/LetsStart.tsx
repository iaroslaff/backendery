import { Field, Form, Formik, FormikHelpers } from "formik"
import React, { FC } from "react"
import * as Yup from "yup"

import AnimateSignalStrip from "../../../components/AnimateSignalStrip/AnimateSignalStrip"
import { SvgIcon } from "../../../components/elements/Icon"

import "./LetsStart.scss"

/* prettier-ignore */
const BUDGET_MIN =  1_000 as number
const BUDGET_MAX = 50_000 as number

interface ILetsStartFormValues {
  name: string
  email: string
  projectDescription: string
  budgetMin: number
  budgetMax: number
}

const LetsStart: FC = () => {
  /* prettier-ignore */
  const Schema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string().email().required("@mail is required"),
    projectDescription: Yup.string().required("an about the project is required"),
    budgetMin: Yup.number()
      .required("min is required")
      .min(
        BUDGET_MIN,
        `min can't be less than ${BUDGET_MIN}`
      )
      .lessThan(
        BUDGET_MAX,
        `min can't be more than max`
      ),
    budgetMax: Yup.number()
      .required("max is required")
      .max(
        BUDGET_MAX,
        `max can't be more then ${BUDGET_MAX}`
      ),
  })

  /**
   * initial form values with predefined structure (interface ILetsStartFormValues), including
   * default values for name, email, projectDescription, and budget ranges.
   */
  const initialFormValues: ILetsStartFormValues = {
    name: "",
    email: "",
    projectDescription: "",
    budgetMin: BUDGET_MIN, // default minimum budget value
    budgetMax: BUDGET_MAX, // default maximum budget value
  }

  /**
   * event handler to prevent form submission when the "Enter" key is pressed
   */
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault() // prevent default form submit behavior when Enter is pressed
    }
  }

  /** handler for form submission; resets the form after sending the message
   * (or performing the desired action); this method could also handle actual submission
   * logic, like sending data to an API.
   */
  /* prettier-ignore */
  const handleSendMessage = (
    values: ILetsStartFormValues, actions: FormikHelpers<ILetsStartFormValues>
  ): void => {
    actions.resetForm() // reset the form fields to their initial values after submission
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
          <div className='lets-start__form-wrapper'>
            <Form onKeyDown={handleKeyDown}>
              <div className='lets-start__form'>
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
                  <div className='lets-start__budget'>
                    <p className='lets-start__budget-title'>May we clarify the following?</p>
                  </div>
                  <div className='lets-start-input lets-start__project-description'>
                    <Field name='projectDescription' id='projectDescription' className='lets-start-input__field' />
                    <label
                      htmlFor='projectDescription'
                      className={`lets-start-input__label ${values.projectDescription && "label-top"}`}
                    >
                      Tell us a little about the project?
                    </label>
                    {submitCount > 0 && errors.projectDescription && (
                      <div className='lets-start-input__error'>{errors.projectDescription}</div>
                    )}
                  </div>
                  <div className='lets-start-input'>
                    <Field name='budgetMin' id='budgetMin' className='lets-start-input__field' />
                    <label htmlFor='budgetMin' className={`lets-start-input__label ${values.budgetMin && "label-top"}`}>
                      Minimum budget limit?
                    </label>
                    {submitCount > 0 && errors.budgetMin && (
                      <div className='lets-start-input__error'>{errors.budgetMin}</div>
                    )}
                  </div>
                  <div className='lets-start-input'>
                    <Field name='budgetMax' id='budgetMax' className='lets-start-input__field' />
                    <label htmlFor='budgetMax' className={`lets-start-input__label ${values.budgetMax && "label-top"}`}>
                      Maximum budget limit?
                    </label>
                    {submitCount > 0 && errors.budgetMax && (
                      <div className='lets-start-input__error'>{errors.budgetMax}</div>
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
