'use client'

import { useState } from 'react';
import { Modal, Button, Form, Input, Upload, Row, Col, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddEmployee = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [profileImg, setProfileImg] = useState(null);
    const [installmentDetails, setInstallmentDetails] = useState({});

    const handleUpload = (info) => {
        if (info.file.status === 'done') {
            setProfileImg(info.file.originFileObj);
        }
    };

    const calculateInstallment = (price, advance, numberOfInstallments) => {
        const remainingAmount = price - advance;
        return remainingAmount / numberOfInstallments;
    };

    const handleValuesChange = (changedValues, allValues) => {
        const { price, advance, numberOfInstallments } = allValues;
        if (price && advance && numberOfInstallments) {
            const installmentAmount = calculateInstallment(price, advance, numberOfInstallments);
            setInstallmentDetails({ installmentAmount });
        }
    };

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                console.log('Form Values:', values);
                console.log('Installment Details:', installmentDetails);
                onClose();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Add Employee"
            open={visible}
            onCancel={onClose}
            width={800} // Increased modal width

            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
                <Form.Item label="Profile Image">
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        maxCount={1}
                        onChange={handleUpload}
                        showUploadList={{ showRemoveIcon: false }}
                    >
                        {profileImg ? (
                            <img src={URL.createObjectURL(profileImg)} alt="Profile" style={{ width: '100%' }} />
                        ) : (
                            <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="employeeId" label="Employee ID" rules={[{ required: true, message: 'Please input the Employee ID!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please input the Name!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="cnic" label="CNIC Number" rules={[{ required: true, message: 'Please input the CNIC Number!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please input the Phone Number!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the Email!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input the Password!' }]}>
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item name="installmentDate" label="Installment Date" rules={[{ required: true, message: 'Please select the Installment Date!' }]}>
                            <DatePicker />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the Address!' }]}>
                    <Input.TextArea />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the Price!' }]}>
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="advance" label="Advance" rules={[{ required: true, message: 'Please input the Advance!' }]}>
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="numberOfInstallments" label="Number of Installments" rules={[{ required: true, message: 'Please input the Number of Installments!' }]}>
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                {installmentDetails.installmentAmount && (
                    <Form.Item label="Installment Amount">
                        <Input value={`Each installment: ${installmentDetails.installmentAmount}/ month`} readOnly />
                    </Form.Item>
                )}

            </Form>
        </Modal>
    );
};

export default AddEmployee;
