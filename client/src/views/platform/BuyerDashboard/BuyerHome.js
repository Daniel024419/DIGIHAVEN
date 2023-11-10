import BuyerDashboardTable from "./BuyerDashboardTable"
import BuyerdashboardTopNavBar from "./includes/BuyerdashboardTopNavBar"

const BuyerHome = () => {
  return (

    < div >
      <BuyerdashboardTopNavBar />
      <h1 className="artitablehome">
        <span className="title-top-platform"  >
          <i className="fas fa-tachometer"></i> Dashbaord {'>'} <i className="fas fa-home"></i>
          Home</span>
      </h1>
      < BuyerDashboardTable />

    </div>

  )
}

export default BuyerHome