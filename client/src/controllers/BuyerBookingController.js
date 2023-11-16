import { Api_connect_server } from "../APIs/Api_connect_server";
import swal from "sweetalert";
let message;

const BuyerBookingController = (formData) => {
  const api_connect = Api_connect_server();
  api_connect
    .post(
      "/auth/book-services",
      { formData },
      { headers: { "Content-Type": "multipart/form-data" } }
    )

    .then((response) => {
      if (response.data.statusCode === 200) {
        message = response.data.message;
        swal({
          title: "Good job!",
          text: message,
          icon: "success",
          button: "Aww yiss!",
        });
        //window.location.href='/';
      } else if (response.data.statusCode === 501) {
        message = response.data.message;

        swal({
          title: "Hmmm..!",
          text: "Something happened, Try again.",
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
    });
};

export default BuyerBookingController;
