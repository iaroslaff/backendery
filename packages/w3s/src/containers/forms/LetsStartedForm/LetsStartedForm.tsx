import { Field, Form, Formik, FormikHelpers } from "formik"
import { FC } from "react"
import * as Yup from "yup"

import FundingDoubleSlider from "../../../components/FundingDoubleSlider/FundingDoubleSlider"

import "./LetsStartedForm.scss"

const FUNDING_MIN: number =  1_000;
const FUNDING_MAX: number = 50_000;

const LetsStartedForm: FC = () => {
  const Schema = Yup.object().shape({
    email: Yup.string().email().required("email is required"),
    name: Yup.string().required("name is required"),
    projectDescription: Yup.string().required("an about the project is required"),
  })

  interface IValuesForm {
    email: string
    fundingMax: number
    fundingMin: number
    name: string
    projectDescription: string
    referralSource: string
    represent: string
  }

  const initialFormValues: IValuesForm = {
    email: "",
    fundingMax: FUNDING_MAX,
    fundingMin: FUNDING_MIN,
    name: "",
    projectDescription: "",
    referralSource: "",
    represent: "",
  }

  const handleSubmit = (values: IValuesForm, actions: FormikHelpers<IValuesForm>) => {
    actions.resetForm()
  }

  return (
    <div className={"lets-started-form__body"}>
      <div className={"lets-started-form__container"}>
        <h2 className={"lets-started-form__title"}>Let&apos;s get started</h2>
        <h3 className={"lets-started-form__description"}>
          Fill in the blanks and we&apos;ll respond in one business day
        </h3>
        <Formik
          validationSchema={Schema}
          initialValues={initialFormValues}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({ values, errors, touched }) => (
            <Form>
              <div className={"lets-started-form__wrap"}>
                <div className={"lets-started-form__input lets-started-form-input"}>
                  <Field name={"name"} id={"name"} className={"lets-started-form-input__field"} />
                  <label htmlFor={"name"} className={`lets-started-form-input__label ${values.name && "label-top"}`}>
                    What&apos;s your name?
                  </label>
                  {touched.name && errors.name && <div className={"lets-started-form-input__error"}>{errors.name}</div>}
                </div>
                <div className={"lets-started-form__input lets-started-form-input"}>
                  <Field name={"represent"} id={"represent"} className={"lets-started-form-input__field"} />
                  <label
                    htmlFor={"represent"}
                    className={`lets-started-form-input__label ${values.represent && "label-top"}`}
                  >
                    Name of your company / organization?
                  </label>
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
                <div className={"lets-started-form__input lets-started-form-input"}>
                  <Field name={"referralSource"} id={"referralSource"} className={"lets-started-form-input__field"} />
                  <label
                    htmlFor={"referralSource"}
                    className={`lets-started-form-input__label ${values.referralSource && "label-top"}`}
                  >
                    How did you hear about us?
                  </label>
                </div>
                <div
                  className={
                    "lets-started-form__input lets-started-form-input lets-started-form-input--big lets-started-form-input--slider"
                  }
                >
                  <label className={"lets-started-form-input__label"}>What&apos;s your budget?</label>
                  <FundingDoubleSlider />
                </div>
                <div className={"lets-started-form__input lets-started-form-input lets-started-form-input--big"}>
                  <Field name={"projectDescription"} id={"projectDescription"} className={"lets-started-form-input__field"} />
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
                <button className={"lets-started-form__submit-btn"} type={"submit"}>
                  <span>Submit</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default LetsStartedForm
