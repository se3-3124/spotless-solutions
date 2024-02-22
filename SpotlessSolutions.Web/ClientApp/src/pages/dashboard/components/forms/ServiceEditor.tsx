import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import TextAreaAutoSize from './TextAreaAutoSize.tsx'
import type { ServiceConfigType } from '../../../../types/ServiceConfigType.ts'
import { type ServiceDefinitionObject } from '../../../../types/ServiceDefinitionObject.ts'

import './ServiceEditor.styles.scss'

interface ServiceEditorProps {
  data: ServiceDefinitionObject
  onSubmit: (data: ServiceConfigType) => void
}

interface FieldObject {
  name: string
  type: string
  value: number | number[]
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

  const handleSubmitModal = () => {
    const serviceObject: ServiceConfigType = {
      targetingServiceId: props.data.id,
      name: editorFields.title,
      description: editorFields.description,
      config: buildConfigFromObject()
    }

    console.log(serviceObject)

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
    <Box>
      <h1 className="editor-header-text">Editor</h1>
      <div className="editor-head">
        <div className="editor-container">
          <div className="editor-text-field">
            <TextField
              sx={{ width: '100%' }}
              label="Title"
              color="warning"
              disabled={!props.data.editable}
              value={editorFields.title}
              onChange={(e) => {
                handleTitleChange((e.currentTarget as HTMLInputElement).value)
              }}
              variant="standard"
            />
          </div>
          <div className="editor-text-field">
            <TextAreaAutoSize
              aria-label="description"
              minRows={15}
              value={editorFields.description}
              disabled={!props.data.editable}
              onInput={(e) => {
                handleDescriptionChange(e.currentTarget.value)
              }}
              placeholder="Description"
            />
          </div>
        </div>
      </div>
      <Divider sx={{ mt: 2 }}/>

      <Box sx={{ width: '100%', p: 2 }}>
        <Grid container spacing={2}>
          {
            Object.keys(editorFields.formObjects)
              .map(x => editorFields.formObjects[x])
              .map((x, i) => (
                <Grid item xs={6} key={i}>
                  {
                    x.type === '(float|float)' && Array.isArray(x.value)
                      ? (
                        <Grid container spacing={1}>
                          {
                            x.value.map((v, ii) => (
                              <Grid item xs={6} key={ii * 10}>
                                <TextField
                                  type="number"
                                  value={v.toString()}
                                  label={`${x.name} value ${ii + 1}`}
                                  onInput={e => {
                                    updateSingleForTupledValues(x.name, ii, Number((e.target as HTMLInputElement).value))
                                  }}
                                  color="warning"
                                  variant="filled"
                                  fullWidth
                                />
                              </Grid>
                            ))
                          }
                        </Grid>
                        )
                      : (
                        <TextField
                          type="number"
                          value={x.value}
                          label={x.name.toString()}
                          onInput={e => {
                            updateSingleFieldValue(x.name, Number((e.target as HTMLInputElement).value))
                          }}
                          color="warning"
                          variant="filled"
                          fullWidth
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
      </Box>

      <Divider sx={{ mb: 2 }}/>
      <div className="editor-bottom">
        <div className="flex-grow"/>
        <div className="button-group">
          {
            props.data.editable
              ? (
                <>
                  <div className="mx-7">
                    <Button variant="contained" disabled={!props.data.editable} style={{
                      borderRadius: 4,
                      backgroundColor: '#EFA25D',
                      color: 'midnightblue'
                    }} onClick={resetValues}>
                      Reset
                    </Button>
                  </div>
                  <div>
                    <Button variant="contained" disabled={!props.data.editable} style={{
                      borderRadius: 4,
                      backgroundColor: 'midnightblue',
                      color: '#EFA25D'
                    }} onClick={handleOpenModal}>
                      Apply
                    </Button>
                  </div>
                </>
                )
              : (
                <p>This service is not editable</p>
                )
          }
        </div>
      </div>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Confirm Changes?</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to save your changes to the service?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmitModal} autoFocus>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
