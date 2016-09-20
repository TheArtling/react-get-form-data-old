import React from "react"
import { getFormObject } from "./core/FormCore"

export default class Form extends React.Component {

  constructor(props) {
    super(props)
    this._refs = []
  }

  handleSubmit(e) {
    let { action, method, encType } = this.props
    e.preventDefault()
    let formObject = getFormObject(this._refs, encType, false)
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
    let { action, method, encType } = this.props

    const childrenWithProps = React.Children.map(
      this.props.children, (child) => React.cloneElement(child,  {
        ref: (ref) => this.handleSetRef(child,ref),
    }))

    return (
      <form
        action={action}
        method={method}
        encType={encType}
        onSubmit={(e) => this.handleSubmit(e)}
        ref={(c) => this.form = c}
      >
        {childrenWithProps}
      </form>
    )
  }
}

Form.propTypes = {
  action: React.PropTypes.func,
  name: React.PropTypes.string,
  encType: React.PropTypes.string,
  method: React.PropTypes.string,
}

Form.defaultProps = {
  method: "POST"
}
