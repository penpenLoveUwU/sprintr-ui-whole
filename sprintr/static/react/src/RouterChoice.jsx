import React from "react";
import { Capability, useValetudoInformationQuery, useWifiStatusQuery } from "./api";
import { useCapabilitiesSupported } from "./CapabilitiesProvider";
import ValetudoSplash from "./components/ValetudoSplash";
import { MainApp } from "./MainApp";
//This is either just an artifact of how React works or I'm doing something wrong
const RouterChoiceStageTwo = ({ paletteMode, setPaletteMode, setBypassProvisioning }) => {
    const { data: wifiConfiguration, isLoading: wifiConfigurationLoading, } = useWifiStatusQuery();
    return (<MainApp paletteMode={paletteMode} setPaletteMode={setPaletteMode}/>);
};
const RouterChoice = ({ paletteMode, setPaletteMode }) => {
    const [bypassProvisioning, setBypassProvisioning] = React.useState(false);
    const [wifiConfigSupported] = useCapabilitiesSupported(Capability.WifiConfiguration);
    const { data: valetudoInformation, isLoading: valetudoInformationLoading } = useValetudoInformationQuery();
    if (valetudoInformationLoading || !valetudoInformation) {
        return <ValetudoSplash />;
    }
    if (!bypassProvisioning && wifiConfigSupported) {
        if (valetudoInformation.embedded) {
            return <RouterChoiceStageTwo paletteMode={paletteMode} setPaletteMode={setPaletteMode} setBypassProvisioning={setBypassProvisioning}/>;
        }
    }
    return (<MainApp paletteMode={paletteMode} setPaletteMode={setPaletteMode}/>);
};
export default RouterChoice;
