import swal from 'sweetalert';

import { Api_connect_server } from '../APIs/Api_connect_server'

const LogoutController = async () => {

	const api_connect = Api_connect_server();

	let message;
	//send respond to clear user session
	api_connect.get('/logout/users', {})
		.then((response) => {

			if (response.data.statusCode === 200) {
				message = response.data.message;
				localStorage.removeItem('message');
				localStorage.removeItem('Userdagetta');
				localStorage.removeItem('username');
				localStorage.removeItem('profile');
				localStorage.removeItem('isAuthenticated');
				localStorage.removeItem('user_type');
				window.location.href = '/';
			} else if (response.data.statusCode === 501) {

				message = response.data.message;
				swal({
                title: "Hmmm..!",
                text: message,
                icon: "warning",
                dangerMode: true,
                button: "Aww yiss!",
            });

			}

		})
		.catch((error) => {

			localStorage.setItem('message', 'Try again..');


		})
}

export { LogoutController }