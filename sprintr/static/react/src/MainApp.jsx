import React from "react";
import AppRouter from "./AppRouter";
import { useValetudoInformationQuery } from "./api";
import ValetudoSplash from "./components/ValetudoSplash";
export const MainApp = ({ paletteMode, setPaletteMode }) => {
    const { data: valetudoInformation, isLoading: valetudoInformationLoading } = useValetudoInformationQuery();
    const [hideWelcomeDialog, setHideWelcomeDialog] = React.useState(false);
    if (valetudoInformationLoading || !valetudoInformation) {
        return <ValetudoSplash />;
    }
    return (<>
            <AppRouter paletteMode={paletteMode} setPaletteMode={setPaletteMode}/>
            
            {/* {
            valetudoInformation.welcomeDialogDismissed &&
            <WelcomeDialog
                open={!(valetudoInformation.welcomeDialogDismissed || hideWelcomeDialog)}
                hide={() => setHideWelcomeDialog(true)}
            />
        } */}

        </>);
};
