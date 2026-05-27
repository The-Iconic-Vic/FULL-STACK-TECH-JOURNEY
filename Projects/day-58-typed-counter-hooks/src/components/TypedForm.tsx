import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { FormData } from '../types'

export interface TypedFormHandle {
  submit: () => void;
  reset: () => void;
  getValues: () => FormData;
  setField: (name: keyof FormData, value: string) => void;
  focusField: (name: keyof FormData) => void;
  validate: () => boolean;
}

interface TypedFormProps {
  onSubmit: (data: FormData) => void;
}

const TypedForm = forwardRef<TypedFormHandle, TypedFormProps>(({ onSubmit }, ref) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState<boolean>(false)
  
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null)
  
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }
  
  const focusField = (field: keyof FormData) => {
    switch(field) {
      case 'name':
        nameInputRef.current?.focus()
        break
      case 'email':
        emailInputRef.current?.focus()
        break
      case 'message':
        messageTextareaRef.current?.focus()
        break
    }
  }
  
  useImperativeHandle(ref, () => ({
    submit: () => {
      if (validate()) {
        onSubmit(formData)
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
      }
    },
    reset: () => {
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    },
    getValues: () => formData,
    setField: (field, value) => {
      handleFieldChange(field, value)
    },
    focusField: (field) => {
      focusField(field)
    },
    validate: validate
  }), [formData, errors])
  
  return (
    <div>
      <div className="form-group">
        <label>Name</label>
        <input
          ref={nameInputRef}
          type="text"
          value={formData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
        />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <input
          ref={emailInputRef}
          type="email"
          value={formData.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
        />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>
      
      <div className="form-group">
        <label>Message</label>
        <textarea
          ref={messageTextareaRef}
          value={formData.message}
          onChange={(e) => handleFieldChange('message', e.target.value)}
          rows={3}
        />
        {errors.message && <div className="field-error">{errors.message}</div>}
      </div>
      
      {submitted && (
        <div className="success-message">
          ✓ Form submitted successfully!
        </div>
      )}
    </div>
  )
})

TypedForm.displayName = 'TypedForm'

const TypedFormWrapper: React.FC = () => {
  const formRef = useRef<TypedFormHandle>(null)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)
  
  const handleSubmit = (data: FormData) => {
    setSubmittedData(data)
    console.log('Form submitted:', data)
  }
  
  const handleReset = () => {
    formRef.current?.reset()
    setSubmittedData(null)
  }
  
  const handleSubmitViaRef = () => {
    formRef.current?.submit()
  }
  
  const handleSetValues = () => {
    formRef.current?.setField('name', 'John Doe')
    formRef.current?.setField('email', 'john@example.com')
    formRef.current?.setField('message', 'This is a test message from the parent component!')
  }
  
  const handleFocusName = () => {
    formRef.current?.focusField('name')
  }
  
  const handleGetValues = () => {
    const values = formRef.current?.getValues()
    console.log('Current form values:', values)
    alert('Check console for current form values')
  }
  
  const handleValidate = () => {
    const isValid = formRef.current?.validate()
    alert(isValid ? 'Form is valid!' : 'Form has errors. Please check all fields.')
  }
  
  return (
    <div className="card">
      <h2>📝 useImperativeHandle Demo</h2>
      <p className="info-text">Parent component controls form via ref</p>
      
      <TypedForm ref={formRef} onSubmit={handleSubmit} />
      
      <div className="button-group" style={{ marginTop: '1rem' }}>
        <button className="btn btn-primary" onClick={handleSubmitViaRef}>
          Submit via Ref
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset via Ref
        </button>
        <button className="btn btn-success" onClick={handleSetValues}>
          Set Values via Ref
        </button>
        <button className="btn btn-info" onClick={handleFocusName}>
          Focus Name Field
        </button>
        <button className="btn btn-secondary" onClick={handleGetValues}>
          Get Values via Ref
        </button>
        <button className="btn btn-warning" onClick={handleValidate}>
          Validate Form
        </button>
      </div>
      
      {submittedData && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#d4edda', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.75rem', color: '#155724', marginBottom: '0.25rem' }}>
            <strong>Last submitted:</strong>
          </p>
          <p style={{ fontSize: '0.7rem', color: '#155724' }}>
            Name: {submittedData.name}<br />
            Email: {submittedData.email}<br />
            Message: {submittedData.message}
          </p>
        </div>
      )}
      
      <div className="code-block">
        <pre>{`// Parent component can call:
formRef.current?.submit();
formRef.current?.reset();
formRef.current?.getValues();
formRef.current?.setField('name', 'John');
formRef.current?.focusField('email');
formRef.current?.validate();

// useImperativeHandle exposes methods
useImperativeHandle(ref, () => ({
  submit: () => { ... },
  reset: () => { ... },
  getValues: () => formData,
  setField: (field, value) => { ... },
  focusField: (field) => { ... },
  validate: () => { ... }
}), [formData]);`}</pre>
      </div>
    </div>
  )
}

export default TypedFormWrapper