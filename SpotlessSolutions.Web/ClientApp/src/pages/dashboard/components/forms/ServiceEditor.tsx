import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'

import ConfirmChangeModal from '../modals/ConfirmChangeModal.tsx'
import { type ServiceConfigType, ServiceObjectType } from '../../../../types/ServiceConfigType.ts'
import { type ServiceDefinitionObject } from '../../../../types/ServiceDefinitionObject.ts'
import { ServiceType } from '../../../../types/ServicesDataObject.tsx'

import './ServiceEditor.styles.scss'

interface FieldObject {
  name: string
  type: string
  value: number | number[]
}

interface ServiceEditorProps {
  data: ServiceDefinitionObject
  onSubmit: (data: ServiceConfigType) => void
}

interface ServiceEditorFields {
  title: string
  description: string
  formObjects: Record<string, FieldObject>
}

/**
 * Service Editor Component
 * @constructor
 */
export default function ServiceEditor (props: ServiceEditorProps) {
  const [editorFields, setEditorFields] = useState<ServiceEditorFields>({
    title: '',
    description: '',
    formObjects: {}
  })
  const [open, setOpen] = useState(false)

  const rebuildFormObjectsFromConfig = () => {
    if (props.data.config === undefined || props.data.config === null) {
      return {} as unknown as Record<string, FieldObject>
    }

    if (props.data.config.length <= 0) {
      return {} as unknown as Record<string, FieldObject>
    }

    const fields = props.data.config.split(',')

    const formObjects: Record<string, FieldObject> = {}

    for (let i = 0; i < fields.length; i++) {
      const [name, type, value] = fields[i].split(':')
      formObjects[name] = {
        name,
        type,
        value: Number(value)
      }

      if (type === '(float|float)') {
        formObjects[name].value = value.substring(1, value.length - 1)
          .split('|')
          .map(x => Number(x))
      }
    }

    return formObjects
  }

  useEffect(() => {
    setEditorFields({
      title: props.data.name,
      description: props.data.description,
      formObjects: rebuildFormObjectsFromConfig()
    })
  }, [props.data])

  const handleTitleChange = (text: string) => {
    setEditorFields(l => ({
      ...l,
      title: text
    }))
  }

  const handleDescriptionChange = (text: string) => {
    setEditorFields(l => ({
      ...l,
      description: text
    }))
  }

  const resetValues = () => {
    setEditorFields({
      title: props.data.name,
      description: props.data.description,
      formObjects: rebuildFormObjectsFromConfig()
    })
  }

  const updateSingleFieldValue = (key: string, value: number) => {
    setEditorFields((l) => {
      if (l.formObjects[key] === null || l.formObjects[key] === undefined) {
        return l
      }

      if (isNaN(value)) {
        return l
      }

      return {
        ...l,
        formObjects: {
          ...l.formObjects,
          [key]: {
            ...l.formObjects[key],
            value
          }
        }
      }
    })
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const buildConfigFromObject = () => {
    const config: string[] = []
    for (const key of Object.keys(editorFields.formObjects)) {
      const current = editorFields.formObjects[key]

      if (Array.isArray(current.value)) {
        config.push(`${current.name}:${current.type}:(${current.value[0]}|${current.value[1]})`)
        continue
      }

      config.push(`${current.name}:${current.type}:${current.value}`)
    }

    return config.join(',')
  }

  const mapServiceType = () => {
    switch (props.data.type) {
      case ServiceType.Addon:
        return ServiceObjectType.Addon
      case ServiceType.Main:
        return ServiceObjectType.Main
    }
  }

  const handleSubmitModal = () => {
    const serviceObject: ServiceConfigType = {
      targetingServiceId: props.data.id,
      name: editorFields.title,
      description: editorFields.description,
      config: buildConfigFromObject(),
      type: mapServiceType()
    }

    props.onSubmit(serviceObject)
    setOpen(false)
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  const updateSingleForTupledValues = (key: string, index: number, value: number) => {
    setEditorFields(l => {
      if (l.formObjects[key] === null || l.formObjects[key] === undefined) {
        return l
      }

      if (isNaN(value) || isNaN(index)) {
        return l
      }

      const targetValue = l.formObjects[key].value
      if (!Array.isArray(targetValue)) {
        return l
      }

      const newValues = [...targetValue]
      newValues[index] = value

      return {
        ...l,
        formObjects: {
          ...l.formObjects,
          [key]: {
            ...l.formObjects[key],
            value: newValues
          }
        }
      }
    })
  }

  return (
    <div className="editor-root">
      <p className="config-heading">Service Descriptors</p>
      <div className="editor-head">
        <div className="editor-container">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="form-title-input">Service Name</label>
              <input
                id="form-title-input"
                type="text"
                className="form-input"
                value={editorFields.title}
                disabled={!props.data.editable}
                onChange={(e) => {
                  handleTitleChange(e.currentTarget.value)
                }}
                placeholder="Service title"
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="form-description-input">Service Description</label>
              <textarea
                id="form-description-input"
                className="form-textarea"
                value={editorFields.description}
                disabled={!props.data.editable}
                onChange={(e) => {
                  handleDescriptionChange(e.currentTarget.value)
                }}
                placeholder="Service description"
              />
            </Grid>
          </Grid>
        </div>
      </div>

      <Divider sx={{ mt: 2, mb: 2 }}/>
      <p className="config-heading">Service Configuration</p>

      <Grid container spacing={2}>
        {
          Object.keys(editorFields.formObjects)
            .map(x => editorFields.formObjects[x])
            .map((x, i) => (
              <Grid item xs={12} key={i}>
                <label htmlFor={`form-input-${i}`}>{x.name}</label>
                {
                  x.type === '(float|float)' && Array.isArray(x.value)
                    ? (
                      <Grid container spacing={1}>
                        {
                          x.value.map((v, ii) => (
                            <Grid item xs={6} key={ii * 10}>
                              <input
                                className="config-form"
                                placeholder="Enter a value"
                                type="number"
                                value={v.toString()}
                                onInput={e => {
                                  updateSingleForTupledValues(x.name, ii, Number((e.target as HTMLInputElement).value))
                                }}
                              />
                            </Grid>
                          ))
                        }
                      </Grid>
                      )
                    : (
                      <input
                        id={`form-input-${i}`}
                        className="config-form"
                        placeholder="Enter a value"
                        type="number"
                        value={x.value.toString()}
                        onInput={e => {
                          updateSingleFieldValue(x.name, Number((e.target as HTMLInputElement).value))
                        }}
                      />
                      )
                }
              </Grid>
            ))
        }
        {
          Object.keys(editorFields.formObjects).length <= 0 && (
            <Grid item xs={12}>
              <Box sx={{ p: 4 }}>
                This service doesn&apos;t have editable options.
              </Box>
            </Grid>
          )
        }
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }}/>

      <div className="editor-bottom">
        {
          props.data.editable
            ? (
              <Stack direction="row" justifyContent="right" spacing={2}>
                <Tooltip title="This will reset your changes">
                  <button className="btn-editor-reset" onClick={resetValues}>Reset</button>
                </Tooltip>
                <button className="btn-editor-submit" onClick={handleOpenModal}>Submit</button>
              </Stack>
              )
            : (
              <p>This service is not editable.</p>
              )
        }
      </div>
      <ConfirmChangeModal
        open={open}
        onClose={handleCloseModal}
        onSubmitChanges={handleSubmitModal}
      />
    </div>
  )
}
