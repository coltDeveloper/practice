'use client';

import { Modal, Table } from 'antd';
import { installmentsTableData } from '@/data/constData';

const ViewInstallment = ({ employee, visible, onClose }) => {
    // Filter data for the specific employee
    const employeeInstallments = installmentsTableData.filter(installment => installment.employeeId === employee.employeeId);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'dateTime',
            key: 'dateTime',
        },
        {
            title: 'Paid Amount',
            dataIndex: 'payedAmount',
            key: 'payedAmount',
        },
    ];

    return (
        <Modal
            title="Employee Installments"
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <div className="mb-4">
                <h2 className="text-xl mb-2">Employee Details</h2>
                <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>CNIC:</strong> 1234567890123</p>
                <p><strong>Total Amount:</strong> 10000</p>
                <p><strong>Paid Amount:</strong> 5000</p>
                <p><strong>Remaining Amount:</strong> 5000</p>
            </div>
            <Table
                dataSource={employeeInstallments}
                columns={columns}
                pagination={false}
                rowKey="dateTime"
            />
        </Modal>
    );
};

export default ViewInstallment;
