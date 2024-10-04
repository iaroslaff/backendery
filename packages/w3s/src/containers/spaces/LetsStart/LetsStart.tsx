import { Field, Form, Formik, FormikHelpers } from "formik"
import { FC } from "react"
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
    email: Yup.string().email().required("email is required"),
    projectDescription: Yup.string().required("an about the project is required"),
  })

  const initialFormValues: ILetsStartFormValues = {
    name: "",
    email: "",
    budgetMin: BUDGET_MIN,
    budgetMax: BUDGET_MAX,
    projectDescription: "",
  }

  const handleSendMessage = (values: ILetsStartFormValues, actions: FormikHelpers<ILetsStartFormValues>) => {
    actions.resetForm()
  }

  return (
    <div className={"virtual-space-lets-start"}>
      <h2 className={"virtual-space-lets-start__title"}>Let&apos;s start_</h2>
      <h3 className={"virtual-space-lets-start__description"}>Fill in the blanks and we&apos;ll respond in one business day</h3>
      <AnimateSignalStrip
        symbol={"."}
        maxNumberOfSymbols={5}
        minInterval={1_250}
        maxInterval={2_500}
        initialSymbols={"....."}
        style={{ color: "#67df8f" }}
      />
      <p className='virtual-space-lets-start__test-text'>These sessions give you direct</p>
      <div className='virtual-space-lets-start__deco' />

      <Formik
        validationSchema={Schema}
        initialValues={initialFormValues}
        onSubmit={(values, actions) => handleSendMessage(values, actions)}
      >
        {({ values, errors, touched }) => (
          <div className='virtual-space-lets-start__form'>
            <Form>
              <div className={"virtual-space-lets-start__form-wrapper"}>
                <div className={"lets-started-form__input lets-started-form-input"}>
                  <Field name={"name"} id={"name"} className={"lets-started-form-input__field"} />
                  <label htmlFor={"name"} className={`lets-started-form-input__label ${values.name && "label-top"}`}>
                    What&apos;s your name?
                  </label>
                  {touched.name && errors.name && <div className={"lets-started-form-input__error"}>{errors.name}</div>}
                </div>

                <div className={"lets-started-form__input lets-started-form-input"}>
                  <Field name={"email"} id={"email"} className={"lets-started-form-input__field"} />
                  <label htmlFor={"email"} className={`lets-started-form-input__label ${values.email && "label-top"}`}>
                    What&apos;s your Email?
                  </label>
                  {touched.email && errors.email && (
                    <div className={"lets-started-form-input__error"}>{errors.email}</div>
                  )}
                </div>

                <div className={"virtual-space-lets-start__budg"}>
                  <label className={"lets-started-form-input__label"}>What&apos;s your budget?</label>
                  <BudgetRange currencyUnit={"$"} max={BUDGET_MAX} measureUnit={"k"} min={BUDGET_MIN} />
                </div>

                <div className={"virtual-space-lets-start__tell"}>
                  <Field
                    name={"projectDescription"}
                    id={"projectDescription"}
                    className={"lets-started-form-input__field"}
                  />
                  <label
                    htmlFor={"projectDescription"}
                    className={`lets-started-form-input__label ${values.projectDescription && "label-top"}`}
                  >
                    Tell us about the project
                  </label>
                  {touched.projectDescription && errors.projectDescription && (
                    <div className={"lets-started-form-input__error"}>{errors.projectDescription}</div>
                  )}
                </div>
              </div>
            </Form>
            <button className={"virtual-space-lets-start__send-message-btn"} type={"submit"}>
              <span>Send Message</span>
              <SvgIcon name='arrow-right' />
            </button>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default LetsStart
