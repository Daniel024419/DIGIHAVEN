import { ApproveArtisanController, RejectArtisanController } from "../../controllers/ArtisanActionController";
import { useEffect } from "react";

const PreviewArtisanForm = () => {
  const getResponseMsg = localStorage.getItem('message');
  const reponse_message_code = localStorage.getItem('reponse_message_code');



  const usermail = localStorage.getItem("artisanusermail");
  const username = localStorage.getItem("artisanUsername");
  const artisanId = localStorage.getItem("previewArtisanId");

  const work_days = localStorage.getItem("work_days");
  const last_seen = localStorage.getItem("last_seen");
  const artisanlocation = localStorage.getItem("artisanlocation");

  const tel = localStorage.getItem("artisanTel");
  const role = localStorage.getItem("artisanRole");
  const created_at = localStorage.getItem("artisancreated_at");
  const updated_at = localStorage.getItem("artisanupdated_at");
  const ready_for_work = localStorage.getItem("ready_for_work");

  let action;
  //approve artisan
  const handleApproveArtisan = (event) => {
    action = 1;

    ApproveArtisanController(artisanId, action)

  }


  //reject artisan
  const handleRejectArtisan = (event) => {
    action = 2;
    RejectArtisanController(artisanId, action)

  }

  //clear message after effect
  useEffect(() => {


    setTimeout(() => {
      localStorage.removeItem('message');
      localStorage.removeItem('reponse_message_code');


    }, 6000)


  }, [reponse_message_code]);

  return (
    <>
      <form
        action=""
        className="form-control-container"
        encType="multipart/form-data"

      >
        <div className="form-group-control">

          <div className="form-group">
            <label className="lbl-text">Username:</label>
            <input
              type="text"
              className="input-text"
              value={username}

              name="username"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Mail:</label>
            <input
              type="email"
              className="input-text"
              value={usermail}

              name="usermail"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Tel:</label>
            <input
              type={tel}
              className="input-text"
              value={tel}

              name="tel"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Work Days:</label>
            <input
              type="text"
              className="input-text"
              value={work_days}

              name="work_days"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Role:</label>
            <input
              type="text"
              className="input-text"
              value={role}

              readOnly
              name="role"
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Location:</label>
            <input
              type="text"
              className="input-text"
              value={artisanlocation}

              readOnly
              name="artisanlocation"
            />
          </div>


          <div className="form-group">
            <label className="lbl-text">Availability:</label>
            <input
              type="text"
              className="input-text"
              value={ready_for_work}

              readOnly
              name="ready_for_work"
            />
          </div>
          <div className="form-group">
            <label className="lbl-text">Created_at:</label>
            <input
              type="date"
              className="input-text"
              value={created_at}

              name="created_at"
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="lbl-text">Updated_at:</label>
            <input
              type="text"
              className="input-text"
              value={updated_at}

              name="updated_at"
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="lbl-text">Last Visit:</label>
            <input
              type="text"
              className="input-text"
              value={last_seen}

              name="last_seen"
              readOnly
            />
          </div>

        </div>

        <div className="artisan-action-btn">

          <button className="actionsbtnAprove" type="button" onClick={handleApproveArtisan} >Approve</button>



          <button className="actionsbtnreject" type="button" onClick={handleRejectArtisan} >Reject</button>

        </div>


      </form>


      {!getResponseMsg === "" && reponse_message_code === 200 && (

        <div class="notification-success" id="notification-success">
          <span class="inner-notifications" >
            <div> {getResponseMsg}</div>
            <div class="close-button" id="sucess_close_btn" title="Close" >x</div>
          </span>
        </div>
      )

      }



      {!getResponseMsg === "" && reponse_message_code === 501 && (
        <div class="notification-error" id="notification-error">
          <span class="inner-notifications" >
            <div> {getResponseMsg}</div>
            <div class="close-button" id="error_close_btn" title="Close" >x</div>
          </span>
          </div>
)  }


        </>
      );
}

      export default PreviewArtisanForm