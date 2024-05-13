import { useUserInfo } from '@hooks/index';
import React from 'react';

export const UserProfile: React.FC = () => {
    const user = useUserInfo();

    return (
        <>
            <h4>{user ? user.email : 'not found info'}</h4>
            <h4>{user ? user.username : 'not found info'}</h4>
        </>
    );
};
