import axios from "axios"
import axiosRetry from "axios-retry"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { FC, useEffect, useState } from "react"
import { ReactTyped as Typed } from "react-typed"
import * as Yup from "yup"

import AnimateSignalStrip from "../../../components/AnimateSignalStrip/AnimateSignalStrip"
import { SvgIcon } from "../../../components/elements/Icon"

import "./LetsStart.scss"

interface ILetsStartFormValues {
  name: string
  email: string
  projectDescription: string
  budgetMin: number
  budgetMax: number
}

/**
 * Toggles the body's scroll behavior by setting or removing the 'fixed' position style.
 * This is used to disable or enable scrolling when an input field gains or loses focus.
 *
 * @param {boolean} shouldDisable - If true, the body's position is set to 'fixed', disabling scrolling. If false, the
 * position is reset to allow scrolling.
 * @function
 */
const toggleBodyScroll = (shouldDisable: boolean) => {
  if (shouldDisable && document.body.style.position !== "fixed") {
    document.body.style.position = "fixed"
  } else if (!shouldDisable && document.body.style.position === "fixed") {
    document.body.style.position = ""
  }
}

/**
 * Handles the 'focus' and 'blur' events on input fields.
 * When an input field is focused, scrolling is disabled, and when it loses focus, scrolling is re-enabled.
 *
 * @param {Event} event - The event triggered (focus or blur). It is checked if it's a FocusEvent to handle accordingly.
 * @function
 */
const handleInputFocusEvent = (event: Event) => {
  if (event instanceof FocusEvent) {
    switch (event.type) {
      case "focus":
        toggleBodyScroll(true)
        return

      case "blur":
        toggleBodyScroll(false)
        return

      default:
        return
    }
  }
}

/**
 * Event handler to prevent form submission when the "Enter" key is pressed. It checks if the event is a keyboard event
 * targeting the "Enter" key, preventing the default form submission behavior.
 *
 * @param {React.KeyboardEvent<HTMLFormElement>} event - The keyboard event triggered on a form.
 * @function
 */
const handleKeyDownEvent = (event: React.KeyboardEvent<HTMLFormElement>) => {
  if (event.key === "Enter") {
    event.preventDefault() // Prevent default form submit behavior when Enter is pressed
  }
}

/**
 * Updates the content of a modal dialog.
 *
 * @param {string} title - The text to be displayed as the modal's title.
 * @param {string} description - The text to be displayed as the modal's description.
 * @function
 */
const updateModalContent = (title: string, description: string): void => {
  const modalTitle = document.querySelector(".lets-start__modal-title")
  const modalDescription = document.querySelector(".lets-start__modal-description")

  if (modalTitle) {
    modalTitle.textContent = title
  }

  if (modalDescription) {
    modalDescription.textContent = description
  }
}

const budgetMin = 1_000 as number
const budgetMax = 50_000 as number

const maxRedirectsCount = 0 as number
const requestBaseURL = "https://backendery-lets-start-form.shuttleapp.rs/" as string
const requestTimeout = 5_000 as number
const retryCount = 3 as number

// Create an axios instance to set the interceptors
const axiosInstance = axios.create({
  baseURL: requestBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  // Disable automatic redirects
  maxRedirects: maxRedirectsCount,
  // Send cookies with cross-origin requests
  withCredentials: true,
  timeout: requestTimeout,
})

// Retry up to 3 times on failed requests
axiosRetry(axiosInstance, { retries: retryCount })

// Interceptor for processing before request
axiosInstance.interceptors.request.use(
  config => {
    /* prettier-ignore */
    updateModalContent(
      "Wait...",
      "One moment. We're sending your message right now."
    )

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Interceptor for processing after request
axiosInstance.interceptors.response.use(
  response => {
    // Update the title and description after a successful response
    /* prettier-ignore */
    updateModalContent(
      "Thank You!",
      "Your message has been successfully sent! We'll contact you ASAP."
    )

    return response
  },
  error => {
    // Update title and description in case of error
    /* prettier-ignore */
    updateModalContent(
      "Opps!",
      "Sorry, something went wrong. Please try again later."
    )

    return Promise.reject(error)
  }
)

const LetsStart: FC = () => {
  /**
   * Handler for form submission. Resets the form after sending the message (or performing the desired action). This
   * method could also handle actual submission logic, like sending data to an API.
   *
   * @param {ILetsStartFormValues} values - The form values submitted by the user.
   * @param {FormikHelpers<ILetsStartFormValues>} actions - Formik helper methods to manage the
   * form state. These helpers allow you to reset, validate, or set specific form field values.
   * @function
   */
  /* prettier-ignore */
  const handleSendMessage = async (
    values: ILetsStartFormValues, actions: FormikHelpers<ILetsStartFormValues>
  ) => {
    openModal()

    try {
      // Sending data via axios with interceptors
      const response = await axiosInstance.post('/api/v1/send-email', values);
      if (response.status === axios.HttpStatusCode.Ok) {
        // Reset the form fields to their initial values after submission
        actions.resetForm();
      }
    } catch (error) {
      console.error(error);
    } finally {
       // Un-disabled button
      actions.setSubmitting(false);
    }
  }

  /**
   * Opens a modal window.
   * @function
   */
  const openModal = () => {
    setIsModalOpen(true)
  }

  /**
   * Closes the modal window.
   * @function
   */
  const closeModal = () => {
    setIsModalOpen(false)
  }

  /** @states */
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  /* prettier-ignore */
  const Schema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string().email().required("@mail is required"),
    projectDescription: Yup.string().required("an about the project is required"),
    budgetMin: Yup.number()
      .required("min is required")
      .min(
        budgetMin,
        `min can't be less than ${budgetMin}`
      )
      .lessThan(
        budgetMax,
        `min can't be more than max`
      )
      .test(
        "less than the max", "min can't be more than max", function (inputedBudgetMin, ctx) {
          return inputedBudgetMin <= ctx.parent.budgetMax
        }
      ),
    budgetMax: Yup.number()
      .required("max is required")
      .max(
        budgetMax,
        `max can't be more then ${budgetMax}`
      ),
  })

  /**
   * Initial form values with predefined structure (interface `ILetsStartFormValues`), including default values for name,
   * email, projectDescription, and budget ranges.
   */
  const initialFormValues: ILetsStartFormValues = {
    name: "",
    email: "",
    projectDescription: "",
    budgetMin: budgetMin, // Default minimum budget value
    budgetMax: budgetMax, // Default maximum budget value
  }

  useEffect(() => {
    // Find all `input` and `textarea` elements on page
    const inputs = document.querySelectorAll("input, textarea")

    // Add event listeners for focus and blur
    inputs.forEach(input => {
      input.addEventListener("focus", handleInputFocusEvent)
      input.addEventListener("blur", handleInputFocusEvent)
    })

    return () => {
      // Clean up event listeners on component unmount
      inputs.forEach(input => {
        input.removeEventListener("focus", handleInputFocusEvent)
        input.removeEventListener("blur", handleInputFocusEvent)
      })
    }
  }, [])

  return (
    <div className='lets-start'>
      {isModalOpen && (
        <div className='lets-start__modal'>
          <h2 className='lets-start__modal-title'></h2>
          <p className='lets-start__modal-description'></p>
          <button className='lets-start__modal-close-btn' onClick={closeModal}>
            OK
          </button>
        </div>
      )}
      <h2 className='lets-start__title'>
        <Typed strings={["Let's start"]} typeSpeed={50} cursorChar='_' showCursor={true} startWhenVisible />
      </h2>
      <h3 className='lets-start__description'>Fill in the blanks and we&apos;ll respond in one business day</h3>
      <div className='lets-start__decorative-animate-signal-strip-wrapper'>
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
      <p className='lets-start__decorative-abstract-phrase'>You&apos;ve got mail in /var/mail/...</p>
      <div className='lets-start__decorative-rectangle' />
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values, actions) => handleSendMessage(values, actions)}
        validationSchema={Schema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, errors, submitCount, isSubmitting, setFieldValue }) => (
          <div className='lets-start__form-wrapper'>
            <Form onKeyDown={handleKeyDownEvent}>
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
                  <div className='lets-start__budget'>
                    <p className='lets-start__budget-title'>What is the budget range for your project?</p>
                    <div className='lets-start-input'>
                      <Field
                        name='budgetMin'
                        id='budgetMin'
                        className='lets-start-input__field'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          const { value } = event.target
                          if (/^\d*$/.test(value)) {
                            // Allow only numbers
                            setFieldValue("budgetMin", value)
                          }
                        }}
                      />
                      <label
                        htmlFor='budgetMin'
                        className={`lets-start-input__label ${values.budgetMin && "label-top"}`}
                      >
                        $ Min
                      </label>
                      {submitCount > 0 && errors.budgetMin && (
                        <div className='lets-start-input__error'>{errors.budgetMin}</div>
                      )}
                    </div>
                    <div className='lets-start-input'>
                      <Field
                        name='budgetMax'
                        id='budgetMax'
                        className='lets-start-input__field'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          const { value } = event.target
                          if (/^\d*$/.test(value)) {
                            // Allow only numbers
                            setFieldValue("budgetMax", value)
                          }
                        }}
                      />
                      <label
                        htmlFor='budgetMax'
                        className={`lets-start-input__label ${values.budgetMax && "label-top"}`}
                      >
                        $ Max
                      </label>
                      {submitCount > 0 && errors.budgetMax && (
                        <div className='lets-start-input__error'>{errors.budgetMax}</div>
                      )}
                    </div>
                  </div>
                </div>
                <button className='lets-start__send-message-btn' type='submit' disabled={isSubmitting}>
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
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
