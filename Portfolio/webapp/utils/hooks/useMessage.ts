import { message } from 'antd';

const useMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const successMsg = (msg: any) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };

    const errorMsg = (msg: any) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    return (

        {
            contextHolder,
            successMsg,
            errorMsg
        }
    )
}

export default useMessage