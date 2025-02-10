'use client'

import { useState } from 'react';
import { Modal, Button, Form, Input, Upload, DatePicker, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { employeesTableData } from '@/data/constData';

const { Option } = Select;

const AddInstallment = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [attachment, setAttachment] = useState(null);

    const handleUpload = (info) => {
        setAttachment(info.file.originFileObj);
    };

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                console.log('Form Values:', values);
                onClose();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Add Installment"
            open={visible}
            onCancel={onClose}
            width={800}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="employee" label="Search Employee" rules={[{ required: true, message: 'Please select an employee!' }]}>
                    <Select
                        showSearch
                        placeholder="Select an employee"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {employeesTableData.map(employee => (
                            <Option key={employee.employeeId} value={employee.name}>
                                {employee.name}
                            </Option>
                        ))}

                    </Select>
                </Form.Item>
                <Form.Item name="dateTime" label="Date and Time" rules={[{ required: true, message: 'Please select date and time!' }]}>
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item name="paidAmount" label="Paid Amount" rules={[{ required: true, message: 'Please input the paid amount!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input a description!' }]}>
                    <Input.TextArea rows={4} placeholder="Enter a description for the installment" />
                </Form.Item>
                <Form.Item label="Attachment">
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture"
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Upload Attachment</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>

    );
};

export default AddInstallment;
