import React, { CSSProperties } from "react";
import Header from "../src/Headers/Header";
import Dashboard from "./component/Dashboard";
import { registerIcons } from "@fluentui/react";
import {
  mdiCheck,
  mdiChevronDown,
  mdiChevronRight,
  mdiMenu,
  mdiClose,
  mdiMapMarkerOutline,
  mdiCameraIris,
  mdiCameraOutline,
  mdiFileDocumentOutline
} from "@mdi/js";
import "../src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "../src/component/Map";
import CreateKickoutModal from "../src/Kickouts/CreateKickoutModal";
import NewModal from "../src/component/NewModal";

interface MdiIconProps {
  path: string;
  size?: string;
  style?: CSSProperties;
}

const MdiIcon: React.FC<MdiIconProps> = (props) => {
  return (
    <svg
      style={props.style}
      height={props.size ? props.size : "1em"}
      width={props.size ? props.size : "1em"}
      viewBox={"2 2 20 20"}
    >
      <path d={props.path} style={{ fill: "currentcolor" }} />
    </svg>
  );
};

registerIcons({
  icons: {
    Menu: <MdiIcon path={mdiMenu} />,
    CheckMark: <MdiIcon path={mdiCheck} />,
    ChevronRight: <MdiIcon path={mdiChevronRight} />,
    ChevronDown: <MdiIcon path={mdiChevronDown} />,
    Cancel: <MdiIcon path={mdiClose} />,
    MapMarkerOutline: <MdiIcon path={mdiMapMarkerOutline} size={"1.5em"} />,
    CameraOutline: <MdiIcon path={mdiCameraIris} size={"1.5em"} />,
    FileDocumentOutline: <MdiIcon path={mdiCameraOutline} size={"1.5em"} />,
    DocumentOutline: <MdiIcon path={mdiFileDocumentOutline} size={"1.5em"} />
  }
});

const App: React.FC = () => {
  return (
    /*  <>
      <Header/>
        <div style={{display: 'flex',flexDirection: 'row', height: '100%', width: '100%'}}>
          <Navigation/>
          <AmsMap/>
          <CreateKickoutModal/>
        </div>
    </> */

    <div>
      <Header />
      <Router>
        <NewModal>
          <Routes>
            <Route
              path="/CreateKickoutModal"
              element={<CreateKickoutModal />}
            />
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/" element={<Map />} />
          </Routes>
        </NewModal>
      </Router>
    </div>
  );
};

export default App;
