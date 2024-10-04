import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CONTACT } from '../../graphql/queries'

const UpdateContact = props => {
  const { id, firstName, lastName, onButtonClick } = props

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updateContact] = useMutation(UPDATE_CONTACT)

  useEffect(() => {
    forceUpdate()
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    updateContact({
      variables: {
        id,
        firstName,
        lastName
      }
    })
    onButtonClick()
  }

  return (
    <Form
      name='update-contact-form'
      layout='inline'
      form={form}
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName
      }}
    >
      <Form.Item name='firstName' rules={[{ required: true, message: 'Enter a first name' }]}>
        <Input placeholder='i.e. John' />
      </Form.Item>
      <Form.Item name='lastName' rules={[{ required: true, message: 'Enter a last name' }]}>
        <Input placeholder='i.e. Smith' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Contact
          </Button>
        )}
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateContact
