import { showMessage } from 'react-native-flash-message';

export const customSuccessMessage = message => {
    showMessage({
        message: message,
        description: '',
        type: 'success',
        backgroundColor: '#17D917',
        icon: 'success',
        color: '#fff',
    });
};

export const customFailMessage = message => {
    showMessage({
        message: message,
        description: '',
        type: 'danger',
        backgroundColor: '#f20000',
        icon: 'danger',
        color: '#fff',
    });
};

export const customInfoMessage = message => {
    showMessage({
        message: message,
        description: '',
        type: 'info',
        backgroundColor: 'blue',
        icon: 'info',
        color: '#fff',
    });
};
