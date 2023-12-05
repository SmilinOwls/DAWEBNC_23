export const user = JSON.parse(localStorage.getItem("user")) || {accessToken: ''};
export const configAxios = { headers: {token: `Bearer ${user.accessToken}`, api: true}};
export const dateFormat = "DD/MM/YYYY HH:mm";
export const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 6
        }
    },

    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
};

export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 6
        }
    }
};
