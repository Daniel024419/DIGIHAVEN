import { Api_connect_server } from '../APIs/Api_connect_server'
import swal from 'sweetalert';

const UploadNewServiceArtisan = async (formData , file) => {


    
	const api_connect = Api_connect_server();
	let message; 
	api_connect.post('/auth/artisan-create-services',
		{ formData , file }, { headers: { 'Content-Type': 'multipart/form-data' }, })

		.then((response) => {

			if (response.data.statusCode === 200) {
				message = response.data.message;

			     swal({
                    title: "Good job!",
                    text: message,
                    icon: "success",
                    button: "Aww yiss!",
                });

                window.location.href='/auth/artisan/dashboard/home';


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
                text: "Something happened, Try again.",
                icon: "warning",
                dangerMode: true,
                button: "Aww yiss!",
            });
			 
		})
}

const DeletServiceArtisan = (serviceId) => {
 

}



export {  UploadNewServiceArtisan ,DeletServiceArtisan } 