export const sendResponse = (res, {
    success,
    message,
    data,
    statusCode
}) => {
    const response = {
        success,
        message
    };

    if (data != undefined) {
        response.data = data;
    };

    return res.status(statusCode).json(response);
}