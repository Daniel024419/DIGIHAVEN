import { Api_connect_server } from '../APIs/Api_connect_server'
import swal from 'sweetalert';


const api_connect = Api_connect_server();


const UploadNewArtisanController = async (formData, file) => {


	console.log(formData)
	let message;
	api_connect.post('/auth/create-artisan',
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
					window.location.href = "/login-artisan";
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
            alert(error)
			swal({
                title: "Hmmm..!",
                text: message,
                icon: "warning",
                dangerMode: true,
                button: "Aww yiss!",
            });
		})
}

export default UploadNewArtisanController