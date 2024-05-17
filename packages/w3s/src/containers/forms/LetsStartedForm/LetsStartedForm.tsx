import { Field, Form, Formik, FormikHelpers } from "formik"
import { FC } from "react"
import * as Yup from "yup"

import BudgetSlider from "../../../components/BudgetSlider/BudgetSlider"
import { SvgIcon } from "../../../components/elements/Icon"
import { useApp } from "../../../contexts/App"
import { useScrollLock } from "../../../hooks/useScrollLock"

import "./LetsStartedForm.scss"

const LetsStartedForm: FC = () => {
  const { isLetsStartedFormVisible, setLetsStartedFormVisibility } = useApp()

  useScrollLock(isLetsStartedFormVisible)

  const Schema = Yup.object().shape({
    aboutProject: Yup.string().required("an about the project is required"),
    email: Yup.string().email().required("email is required"),
    name: Yup.string().required("name is required"),
  })

  interface IValuesForm {
    aboutProject: string
    budget: {
      from: number
      to: number
    }
    email: string
    hearAboutUs: string
    name: string
    represent: string
  }

  const initialFormValues: IValuesForm = {
    aboutProject: "",
    budget: {
      from: 1_000,
      to: 50_000,
    },
    email: "",
    hearAboutUs: "",
    name: "",
    represent: "",
  }

  const handleSubmit = (values: IValuesForm, actions: FormikHelpers<IValuesForm>) => {
    actions.resetForm()
    setTimeout(() => setLetsStartedFormVisibility(false), 1000)
  }

  return (
    <div className={"lets-started-form__body"}>
      <button
        className={"lets-started-form__close-btn"}
        type={"button"}
        onClick={() => setLetsStartedFormVisibility(false)}
      >
        <SvgIcon name={"lets-started-form-close"} />
      </button>
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
              <div className={"lets-started-form__form-wrapper"}>
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
                  <Field name={"hearAboutUs"} id={"hearAboutUs"} className={"lets-started-form-input__field"} />
                  <label
                    htmlFor={"hearAboutUs"}
                    className={`lets-started-form-input__label ${values.hearAboutUs && "label-top"}`}
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
                  <BudgetSlider />
                </div>
                <div className={"lets-started-form__input lets-started-form-input lets-started-form-input--big"}>
                  <Field name={"aboutProject"} id={"aboutProject"} className={"lets-started-form-input__field"} />
                  <label
                    htmlFor={"aboutProject"}
                    className={`lets-started-form-input__label ${values.aboutProject && "label-top"}`}
                  >
                    Tell us about the project
                  </label>
                  {touched.aboutProject && errors.aboutProject && (
                    <div className={"lets-started-form-input__error"}>{errors.aboutProject}</div>
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
