import { useEffect } from "react";
const PreviewBuyerForm = () => {
    const getResponseMsg = localStorage.getItem('message');
    const reponse_message_code = localStorage.getItem('reponse_message_code');
  
  
  
    const usermail = localStorage.getItem("Previewuserusermail");
    const username = localStorage.getItem("previewbuyerusername");
  
    const last_seen = localStorage.getItem("previewlastVisit");
    const buyerlocation = localStorage.getItem("previewlocations");
  
    const tel = localStorage.getItem("previewusertel");
    const created_at = localStorage.getItem("previewusercreated_at");
    const updated_at = localStorage.getItem("previewuserupdated_at");
  
    
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
              <label className="lbl-text">Location:</label>
              <input
                type="text"
                className="input-text"
                value={buyerlocation}
  
                readOnly
                name="buyerlocation"
              />
            </div>

            <div className="form-group">
              <label className="lbl-text">Created_at:</label>
              <input
                type="text"
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
  


export default PreviewBuyerForm