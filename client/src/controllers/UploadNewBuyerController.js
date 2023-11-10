import swal from 'sweetalert';

import { Api_connect_server } from '../APIs/Api_connect_server'

const UploadNewBuyerController = async (formData, file) => {

	const api_connect = Api_connect_server();


	
	let message; 

	 api_connect.post('/auth/create-buyer',

		{ formData, file }, { headers: { 'Content-Type': 'multipart/form-data' }, })

		
		.then((response) => {

			if (response.data.statusCode === 200) {
				message = response.data.message;
				swal({
					title: "Good job!",
					text: message,
					icon: "success",
					button: "Aww yiss!",
				});


				setTimeout(() => {
				window.location.href = "/login-buyer";
				}, 3000);


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
			swal({
                title: "Hmmm..!",
                text: message,
                icon: "warning",
                dangerMode: true,
                button: "Aww yiss!",
            });

		})
}

export default UploadNewBuyerController