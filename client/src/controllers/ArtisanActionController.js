import { Api_connect_server } from '../APIs/Api_connect_server'

let message;

const ApproveArtisanController = async (artisanId, action) => {


    let api_connect = Api_connect_server();

    //send respond to delete user 
    api_connect.get('/auth/artisan-action/' + artisanId + '/' + action)
        .then((response) => {

            if (response) {
                if (response.data.statusCode === 200) {
                    message = response.data.message;
                    localStorage.setItem('message', message);
                    localStorage.setItem('reponse_message_code', response.data.statusCode);
                    localStorage.setItem('verified', 1);

                    //window.location.reload();

                } else if (response.data.statusCode === 501) {
                    message = response.data.message;
                    localStorage.setItem('message', message);
                    localStorage.setItem('reponse_message_code', response.data.statusCode);
                    localStorage.setItem('verified', 0);

                    //window.location.reload();

                }
            }


        })
        .catch((error) => {
            if (error) {


                alert('internal error..' + error);
                message = error.data.message;
                localStorage.setItem('message', message);
                localStorage.setItem('reponse_message_code', error.data.statusCode);

            }
        })

}



const RejectArtisanController = async (artisanId, action) => {
    let api_connect = Api_connect_server();

    //send respond to delete user 
    api_connect.get('/auth/artisan-action/' + artisanId + '/' + action)
        .then((response) => {

            if (response) {
                if (response.data.statusCode === 200) {
                    message = response.data.message;
                    localStorage.setItem('message', message);
                    localStorage.setItem('reponse_message_code', response.data.statusCode);
                    localStorage.setItem('verified', 2);

                    //window.location.reload();

                } else if (response.data.statusCode === 501) {
                    message = response.data.message;
                    localStorage.setItem('message', message);
                    localStorage.setItem('reponse_message_code', response.data.statusCode);
                    localStorage.setItem('verified', 0);

                    //window.location.reload();

                }
            }


        })
        .catch((error) => {
            if (error) {
                message = error.data.message;
                localStorage.setItem('message', message);
                localStorage.setItem('reponse_message_code', error.data.statusCode);

            }
        })

}

export { ApproveArtisanController, RejectArtisanController }