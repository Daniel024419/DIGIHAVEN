import { Api_connect_server } from '../APIs/Api_connect_server'

const SupportController = async (formData) => {

	const api_connect = Api_connect_server();

	let message;
	api_connect.post('/auth/add-support-message',
		{ formData }, { headers: { 'Content-Type': 'multipart/form-data' }, })

		.then((response) => {

			if (response.data.statusCode === 200) {
				message = response.data.message;
				window.location.reload();
				localStorage.setItem('message', message);
				localStorage.setItem('reponse_messasge_code', 200);
			} else if (response.data.statusCode === 501) {
				message = response.data.message;
				window.location.reload();
				localStorage.setItem('message', message);
				localStorage.setItem('reponse_message_code', 501);
			}

		})
		.catch((error) => {

			//error 
			window.location.reload();
			localStorage.setItem('reponse_message_code', 501);
			localStorage.setItem('message', "Couldnt create new user Please, try again");

		})

}

export default SupportController