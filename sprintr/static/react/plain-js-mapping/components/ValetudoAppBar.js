import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";
import { AccessTime as TimeIcon, Equalizer as StatisticsIcon, DarkMode as DarkModeIcon, Map as MapManagementIcon, Home as HomeIcon, Article as LogIcon, Menu as MenuIcon, ArrowBack as BackIcon, PendingActions as PendingActionsIcon, Hub as ConnectivityIcon, SystemUpdateAlt as UpdaterIcon, SettingsRemote as SettingsRemoteIcon, GitHub as GithubIcon, Favorite as DonateIcon, MenuBook as DocsIcon, Wysiwyg as SystemInformationIcon, Info as AboutIcon, Help as HelpIcon } from "@mui/icons-material";
import { Link, useRouteMatch } from "react-router-dom";
import ValetudoEvents from "./ValetudoEvents";
import { Capability } from "../api";
import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import { RobotMonochromeIcon, SwaggerUIIcon, ValetudoMonochromeIcon } from "./CustomIcons";
//Note that order is important here
const menuTree = [{
  kind: "MenuEntry",
  routeMatch: "/",
  title: "Home",
  menuIcon: HomeIcon,
  menuText: "Home"
}, {
  kind: "Subheader",
  title: "Robot"
}, {
  kind: "MenuEntry",
  routeMatch: "/robot/consumables",
  title: "Consumables",
  menuIcon: PendingActionsIcon,
  menuText: "Consumables",
  requiredCapabilities: {
    capabilities: [Capability.ConsumableMonitoring],
    type: "allof"
  }
}, {
  kind: "MenuEntry",
  routeMatch: "/robot/manual_control",
  title: "Manual control",
  menuIcon: SettingsRemoteIcon,
  menuText: "Manual control",
  requiredCapabilities: {
    capabilities: [Capability.ManualControl],
    type: "allof"
  }
}, {
  kind: "MenuEntry",
  routeMatch: "/robot/total_statistics",
  title: "Statistics",
  menuIcon: StatisticsIcon,
  menuText: "Statistics",
  requiredCapabilities: {
    capabilities: [Capability.TotalStatistics],
    type: "allof"
  }
}, {
  kind: "Subheader",
  title: "Options"
}, {
  kind: "MenuEntry",
  routeMatch: "/options/map_management",
  title: "Map Options",
  menuIcon: MapManagementIcon,
  menuText: "Map",
  requiredCapabilities: {
    capabilities: [Capability.PersistentMapControl, Capability.MappingPass, Capability.MapReset, Capability.MapSegmentEdit, Capability.MapSegmentRename, Capability.CombinedVirtualRestrictions],
    type: "anyof"
  }
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/map_management/segments",
  title: "Segment Management",
  parentRoute: "/options/map_management"
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/map_management/virtual_restrictions",
  title: "Virtual Restriction Management",
  parentRoute: "/options/map_management"
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/map_management/robot_coverage",
  title: "Robot Coverage Map",
  parentRoute: "/options/map_management"
}, {
  kind: "MenuEntry",
  routeMatch: "/options/connectivity",
  title: "Connectivity Options",
  menuIcon: ConnectivityIcon,
  menuText: "Connectivity"
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/connectivity/auth",
  title: "Auth Settings",
  parentRoute: "/options/connectivity"
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/connectivity/mqtt",
  title: "MQTT Connectivity",
  parentRoute: "/options/connectivity"
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/connectivity/networkadvertisement",
  title: "Network Advertisement",
  parentRoute: "/options/connectivity"
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/connectivity/ntp",
  title: "NTP Connectivity",
  parentRoute: "/options/connectivity"
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/connectivity/wifi",
  title: "Wi-Fi Connectivity",
  parentRoute: "/options/connectivity"
}, {
  kind: "MenuEntry",
  routeMatch: "/options/robot",
  title: "Robot Options",
  menuIcon: RobotMonochromeIcon,
  menuText: "Robot"
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/robot/misc",
  title: "Misc Options",
  parentRoute: "/options/robot"
}, {
  kind: "MenuSubEntry",
  routeMatch: "/options/robot/quirks",
  title: "Quirks",
  parentRoute: "/options/robot"
}, {
  kind: "MenuEntry",
  routeMatch: "/options/valetudo",
  title: "Valetudo Options",
  menuIcon: ValetudoMonochromeIcon,
  menuText: "Valetudo"
}, {
  kind: "Subheader",
  title: "Misc"
}, {
  kind: "MenuEntry",
  routeMatch: "/valetudo/timers",
  title: "Timers",
  menuIcon: TimeIcon,
  menuText: "Timers"
}, {
  kind: "MenuEntry",
  routeMatch: "/valetudo/log",
  title: "Log",
  menuIcon: LogIcon,
  menuText: "Log"
}, {
  kind: "MenuEntry",
  routeMatch: "/valetudo/updater",
  title: "Updater",
  menuIcon: UpdaterIcon,
  menuText: "Updater"
}, {
  kind: "MenuEntry",
  routeMatch: "/valetudo/system_information",
  title: "System Information",
  menuIcon: SystemInformationIcon,
  menuText: "System Information"
}, {
  kind: "MenuEntry",
  routeMatch: "/valetudo/help",
  title: "General Help",
  menuIcon: HelpIcon,
  menuText: "General Help"
}, {
  kind: "MenuEntry",
  routeMatch: "/valetudo/about",
  title: "About Valetudo",
  menuIcon: AboutIcon,
  menuText: "About Valetudo"
}];
const ValetudoAppBar = ({
  paletteMode,
  setPaletteMode
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const robotCapabilities = useCapabilitiesSupported(...Object.values(Capability));
  const routeMatch = useRouteMatch(menuTree.filter(e => {
    return "routeMatch" in e;
  }).map(e => {
    // Make TS happy
    return "routeMatch" in e ? e.routeMatch : "";
  }).reverse()); // Reverse because order is important (deep => shallow)
  const currentTab = routeMatch?.path;
  const currentMenuEntry = menuTree.find(e => {
    return "routeMatch" in e && e.routeMatch === routeMatch?.path;
  }) ?? menuTree[0];
  const pageTitle = React.useMemo(() => {
    let ret = "";
    menuTree.forEach(value => {
      if ("routeMatch" in value && value.routeMatch === currentTab && value.title) {
        if (ret !== "") {
          ret += " — ";
        }
        ret += value.title;
      }
    });
    if (ret !== "") {
      document.title = `Valetudo - ${ret}`;
    } else {
      document.title = "Valetudo";
    }
    return ret;
  }, [currentTab]);
  const drawerContent = React.useMemo(() => {
    return /*#__PURE__*/React.createElement(Box, {
      sx: {
        width: 250
      },
      role: "presentation",
      onClick: () => {
        setDrawerOpen(false);
      },
      onKeyDown: () => {
        setDrawerOpen(false);
      },
      style: {
        scrollbarWidth: "thin",
        overflowX: "hidden"
      }
    }, /*#__PURE__*/React.createElement(List, null, menuTree.filter(item => {
      return item.kind !== "MenuSubEntry";
    }).map((value, idx) => {
      switch (value.kind) {
        case "Subheader":
          return /*#__PURE__*/React.createElement(ListSubheader, {
            key: `${idx}`,
            sx: {
              background: "transparent"
            }
          }, value.title);
        case "MenuEntry":
          {
            if (value.requiredCapabilities) {
              switch (value.requiredCapabilities.type) {
                case "allof":
                  {
                    if (!value.requiredCapabilities.capabilities.every(capability => {
                      const idx = Object.values(Capability).indexOf(capability);
                      return robotCapabilities[idx];
                    })) {
                      return null;
                    }
                    break;
                  }
                case "anyof":
                  {
                    if (!value.requiredCapabilities.capabilities.some(capability => {
                      const idx = Object.values(Capability).indexOf(capability);
                      return robotCapabilities[idx];
                    })) {
                      return null;
                    }
                    break;
                  }
              }
            }
            const ItemIcon = value.menuIcon;
            return /*#__PURE__*/React.createElement(ListItem, {
              key: value.routeMatch,
              button: true,
              selected: value.routeMatch === currentTab,
              component: Link,
              to: value.routeMatch
            }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(ItemIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
              primary: value.menuText
            }));
          }
      }
    }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(ListItem, null, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(DarkModeIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
      primary: "Dark mode"
    }), /*#__PURE__*/React.createElement(Switch, {
      edge: "end",
      onChange: e => {
        setPaletteMode(e.target.checked ? "dark" : "light");
      },
      checked: paletteMode === "dark"
    })), /*#__PURE__*/React.createElement(ListSubheader, {
      sx: {
        background: "transparent"
      }
    }, "Links"), /*#__PURE__*/React.createElement(ListItem, {
      button: true,
      component: "a",
      href: "./swagger/",
      target: "_blank",
      rel: "noopener"
    }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(SwaggerUIIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
      primary: "Swagger UI"
    })), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(ListItem, {
      button: true,
      component: "a",
      href: "https://valetudo.cloud",
      target: "_blank",
      rel: "noopener"
    }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(DocsIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
      primary: "Docs"
    })), /*#__PURE__*/React.createElement(ListItem, {
      button: true,
      component: "a",
      href: "https://github.com/Hypfer/Valetudo",
      target: "_blank",
      rel: "noopener"
    }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(GithubIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
      primary: "Hypfer/Valetudo"
    })), /*#__PURE__*/React.createElement(ListItem, {
      button: true,
      component: "a",
      href: "https://github.com/sponsors/Hypfer",
      target: "_blank",
      rel: "noopener"
    }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(DonateIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
      primary: "Donate"
    }))));
  }, [currentTab, paletteMode, setPaletteMode, robotCapabilities]);
  const toolbarContent = React.useMemo(() => {
    switch (currentMenuEntry.kind) {
      case "MenuEntry":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
          size: "large",
          edge: "start",
          color: "inherit",
          "aria-label": "menu",
          sx: {
            mr: 2
          },
          onClick: () => {
            setDrawerOpen(true);
          },
          title: "Menu"
        }, /*#__PURE__*/React.createElement(MenuIcon, null)), /*#__PURE__*/React.createElement(Typography, {
          variant: "h6",
          component: "div",
          sx: {
            flexGrow: 1
          }
        }, pageTitle));
      case "MenuSubEntry":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
          size: "large",
          edge: "start",
          color: "inherit",
          "aria-label": "back",
          sx: {
            mr: 2
          },
          component: Link,
          to: currentMenuEntry.parentRoute
        }, /*#__PURE__*/React.createElement(BackIcon, null)), /*#__PURE__*/React.createElement(Typography, {
          variant: "h6",
          component: "div",
          sx: {
            flexGrow: 1
          }
        }, pageTitle));
      case "Subheader":
        //This can never happen
        return /*#__PURE__*/React.createElement(React.Fragment, null);
    }
  }, [currentMenuEntry, setDrawerOpen, pageTitle]);
  return /*#__PURE__*/React.createElement(Box, {
    sx: {
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement(AppBar, {
    position: "fixed"
  }, /*#__PURE__*/React.createElement(Toolbar, null, toolbarContent, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ValetudoEvents, null)))), /*#__PURE__*/React.createElement(Toolbar, null), currentMenuEntry.kind !== "MenuSubEntry" && /*#__PURE__*/React.createElement(Drawer, {
    anchor: "left",
    open: drawerOpen,
    onClose: () => {
      setDrawerOpen(false);
    }
  }, drawerContent));
};
export default ValetudoAppBar;