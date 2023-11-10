import swal from 'sweetalert';

	let user_type = localStorage.getItem('user_type');

	const admin = () => {
	//checking user authentication
	if ( user_type === 'admin' ) {
	return;
	}else{
	window.location.href = '/';

	}

	}


	const buyer = () => {
	if ( user_type === 'buyer') {
	return; 
	}else{
    
		swal({
			title: "Hmmm..!",
			text: "Sorryy , You must login first to access artisan service",
			icon: "warning",
			dangerMode: true,
			button: "Aww yiss!",
		});
	window.location.href = '/login-buyer';

	}
}


	const artisan = () => {
	if ( user_type === 'artisan') {
     return ;
	}else{

	window.location.href = '/login-artisan';

	}
	}
	
	export  { admin , buyer , artisan }