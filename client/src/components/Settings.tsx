import * as React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikErrors, FormikValues } from 'formik'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import Actions from '../redux/actions'

import { IGameSettings, IState, IUpdateGameSetting } from '../tsconf'

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, void, Action>) => ({
  updateSetting: (value: IUpdateGameSetting) => dispatch(Actions.Setting.updateSetting(value)),
})

const mapStateToProps = (state: IState) => ({
  Setting: state.Setting,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)

function Settings(
  props: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
): JSX.Element {
  const { Setting } = props

  function onSubmission(values: FormikValues, callback: Function): void {
    if (values.speed !== Setting.speed) {
      props.updateSetting({ key: 'speed', value: values.speed })
    }
    if (values.steps !== Setting.steps) {
      props.updateSetting({ key: 'steps', value: values.steps })
    }
    callback(false)
  }

  return (
    <section className="settings">
      <Formik
        initialValues={{ speed: Setting.speed, steps: Setting.steps }}
        validate={(values: FormikValues) => {
          const errors: FormikErrors<FormikValues> = {}
          if (!values.speed) {
            errors.speed = 'Required'
          } else if (values.speed < 6 || values.speed > 100000) {
            errors.speed = 'Must be between 10 and 100000 ms'
          }
          if (!values.steps) {
            errors.steps = 'Required'
          } else if (values.steps < 6 || values.steps > 200) {
            errors.steps = 'Must be between 10 and 200 units'
          }
          return errors
        }}
        onSubmit={(values: FormikValues, { setSubmitting }) => onSubmission(values, setSubmitting)}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Speed in Ms.</label>
              <Field
                type="number"
                name="speed"
                min={4}
                max={100000}
                placeholder="Speed in Ms."
                required={true}
              />
              <ErrorMessage name="speed" component="div" />
            </div>
            <div>
              <label>Units per axis</label>
              <Field as="select" name="steps">
                <option value="160">160</option>
                <option value="100">100</option>
                <option value="80">80</option>
                <option value="50">50</option>
                <option value="40">40</option>
                <option value="20">20</option>
              </Field>
              <ErrorMessage name="steps" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Update
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}
