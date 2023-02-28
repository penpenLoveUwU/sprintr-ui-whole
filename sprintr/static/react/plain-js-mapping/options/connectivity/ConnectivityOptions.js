import { useCapabilitiesSupported } from "../../CapabilitiesProvider";
import { Capability } from "../../api";
import React from "react";
import { LinkListMenuItem } from "../../components/list_menu/LinkListMenuItem";
import { MQTTIcon } from "../../components/CustomIcons";
import { AccessTime as NTPIcon, VpnKey as AuthIcon, Wifi as WifiIcon, AutoFixHigh as NetworkAdvertisementIcon } from "@mui/icons-material";
import { ListMenu } from "../../components/list_menu/ListMenu";
import { SpacerListMenuItem } from "../../components/list_menu/SpacerListMenuItem";
import PaperContainer from "../../components/PaperContainer";
const ConnectivityOptions = () => {
  const [wifiConfigurationCapabilitySupported] = useCapabilitiesSupported(Capability.WifiConfiguration);
  const listItems = React.useMemo(() => {
    const items = [];
    if (wifiConfigurationCapabilitySupported) {
      items.push( /*#__PURE__*/React.createElement(LinkListMenuItem, {
        key: "wifiConfiguration",
        url: "/options/connectivity/wifi",
        primaryLabel: "Wi-Fi Connectivity",
        secondaryLabel: "Check connection details and modify the configuration",
        icon: /*#__PURE__*/React.createElement(WifiIcon, null)
      }));
      items.push( /*#__PURE__*/React.createElement(SpacerListMenuItem, {
        key: "spacer1"
      }));
    }
    items.push( /*#__PURE__*/React.createElement(LinkListMenuItem, {
      key: "mqttConnectivity",
      url: "/options/connectivity/mqtt",
      primaryLabel: "MQTT Connectivity",
      secondaryLabel: "Connect Valetudo to your MQTT Broker",
      icon: /*#__PURE__*/React.createElement(MQTTIcon, null)
    }));
    items.push( /*#__PURE__*/React.createElement(LinkListMenuItem, {
      key: "ntpConnectivity",
      url: "/options/connectivity/ntp",
      primaryLabel: "NTP Connectivity",
      secondaryLabel: "Configure the integrated Network Time Protocol (NTP) client",
      icon: /*#__PURE__*/React.createElement(NTPIcon, null)
    }));
    items.push( /*#__PURE__*/React.createElement(LinkListMenuItem, {
      key: "networkAdvertisementSettings",
      url: "/options/connectivity/networkadvertisement",
      primaryLabel: "Network Advertisement",
      secondaryLabel: "Control Bonjour/mDNS and SSDP/UPnP discoverability",
      icon: /*#__PURE__*/React.createElement(NetworkAdvertisementIcon, null)
    }));
    items.push( /*#__PURE__*/React.createElement(LinkListMenuItem, {
      key: "authSettings",
      url: "/options/connectivity/auth",
      primaryLabel: "Auth Settings",
      secondaryLabel: "Restrict access to Valetudo",
      icon: /*#__PURE__*/React.createElement(AuthIcon, null)
    }));
    return items;
  }, [wifiConfigurationCapabilitySupported]);
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(ListMenu, {
    primaryHeader: "Connectivity Options",
    secondaryHeader: "Configure how Valetudo and your robot communicate with the outside world",
    listItems: listItems
  }));
};
export default ConnectivityOptions;