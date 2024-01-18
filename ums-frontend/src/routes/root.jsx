// Import the Outlet component from the 'react-router-dom' library
import { Outlet} from "react-router-dom";

export default function Root() {
   // Render the component
    return (
      <>
        <div id="detail"><Outlet /></div>
      </>
    );
  }