import swal from 'sweetalert';

const Usersession = async () => {

	//checking user authentication
	let isAuthenticated = localStorage.getItem('isAuthenticated');

	if (isAuthenticated === "false" || isAuthenticated === null || isAuthenticated === '') {
		
		
		swal({
			title: "Hmmm..!",
			text: "Sorryy , You must be authenticated first",
			icon: "warning",
			dangerMode: true,
			button: "Aww yiss!",
		});
		window.location.href = '/';
	}

}



export default Usersession 