function getMultipartData(refs, is_native) {
  if (is_native) {
    let formData = new FormData()
    refs.map((ref) => {
      let [ key, node ] = ref
      if (node["getFormValue"]) {
        formData.append(key, node.getFormValue())
      }
    })
    return formData
  } else {
    return new FormData(instance)
  }
}

function getApplicationJson(refs) {
  let formData = {}
  refs.map(ref => {
    let value
    let [ key, node ] = ref
    if(node['getFormValue']) {
      value = node.getFormValue()
    } else {
      value = node.value
    }

    if (formData[key]) {
      if (formData[key] instanceof Array) {
        formData[key].append(value)
      } else {
        formData[key] = [formData[key], value]
      }
    } else {
      formData[key] = value
    }

  })
  return JSON.stringify(formData)
}

function getFormObject(refs, encType, is_native) {
  let formData
  if (encType === "multipart/form-data") {
    formData = getMultipartData(refs, is_native)
  } else if (encType === "application/json") {
    formData = getApplicationJson(refs)
  }
  return {
    encType,
    body: formData,
  }
}

export { getFormObject }
