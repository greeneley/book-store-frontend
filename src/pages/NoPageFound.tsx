import Button from 'antd/es/button/button';
import Result from 'antd/es/result';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NoPageFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="TRANG KHÔNG ĐƯỢC TÌM THẤY"
            subTitle={
                'Thật tiếc! Trang của bạn yêu cầu không tồn tại.\n' +
                'Vui lòng thử với một trang khác hoặc liên hệ để được hỗ trợ nhé!\n' +
                '\n'
            }
            extra={
                <Button onClick={() => navigate('/home')}>Về trang chủ</Button>
            }
        />
    );
};
