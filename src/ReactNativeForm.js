import React from "react"
import { View } from "react-native"
import { getFormObject } from "./core/FormCore"

export default class Form extends React.Component {

  constructor(props) {
    super(props)
    this._refs = []
  }

  handleSubmit() {
    let { action, method, encType } = this.props
    let formObject = getFormObject(this._refs, encType, true)
    action({
      method,
      ...formObject
    })
  }

  handleSetRef(child, ref) {
    if (child.props && child.props.name) {
      this._refs.push([child.props.name, ref])
    }
    if (child.ref) { child.ref(ref) }
  }

  render() {
    let { action, method, SubmitButton } = this.props

    const childrenWithProps = React.Children.map(
      this.props.children, (child) => React.cloneElement(child,  {
        ref: (ref) => this.handleSetRef(child, ref),
      })
    )

    const submit = React.cloneElement(SubmitButton,{
      onPress: () => {
        if (SubmitButton.props.onPress) {
          SubmitButton.props.onPress()
        }
        this.handleSubmit(SubmitButton)
      }
    })

    return (
      <View ref={(c) => this.form = c} >
        {childrenWithProps}
        {submit}
      </View>
    )
  }
}

Form.propTypes = {
  action: React.PropTypes.func,
  encType: React.PropTypes.string,
  SubmitButton: React.PropTypes.element,
  method: React.PropTypes.string,
}

Form.defaultProps = {
  method: "POST"
}
