import TopNavBar from "../platform/includes/topNavBar";
import PlatformFooter from "../platform/includes/platformFooter";
import "../../css/platform.css";
import Banner from "./includes/Banner";
import ServiceCategory from "./includes/ServiceCategory";
import ArtisansCard from "./includes/ArtisansCard";


const Index = () => {
	return (
		<div>
	
		<TopNavBar/>
		<Banner/>
		<ServiceCategory/>
		<ArtisansCard/>
	
	
		<PlatformFooter/>
	
			
		</div>
	)
}

export default Index