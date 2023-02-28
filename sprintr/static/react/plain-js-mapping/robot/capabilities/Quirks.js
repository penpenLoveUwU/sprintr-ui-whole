import React from "react";
import { Box, Divider, FormControl, Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useQuirksQuery, useSetQuirkValueMutation } from "../../api";
import { QuirksHelp } from "./res/QuirksHelp";
import { Star as QuirksIcon } from "@mui/icons-material";
import PaperContainer from "../../components/PaperContainer";
import DetailPageHeaderRow from "../../components/DetailPageHeaderRow";
const QuirkControl = props => {
  const {
    mutate: setQuirkValue,
    isLoading: quirkValueSetting
  } = useSetQuirkValueMutation();
  const handleChange = React.useCallback(event => {
    setQuirkValue({
      id: props.quirk.id,
      value: event.target.value
    });
  }, [props.quirk.id, setQuirkValue]);
  return /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: props.style,
    sx: {
      width: {
        "xs": "100%",
        "sm": "60%"
      },
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, /*#__PURE__*/React.createElement(Paper, {
    sx: {
      boxShadow: 3,
      padding: "1rem"
    }
  }, /*#__PURE__*/React.createElement(FormControl, {
    variant: "standard",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "body1",
    sx: {
      mb: 0
    }
  }, props.quirk.title), /*#__PURE__*/React.createElement(Divider, {
    sx: {
      mt: 1
    },
    style: {
      marginBottom: "1rem"
    }
  }), /*#__PURE__*/React.createElement(Select, {
    id: props.quirk.id + "-select",
    value: props.quirk.value,
    onChange: handleChange,
    disabled: quirkValueSetting
  }, props.quirk.options.map((o, i) => {
    return /*#__PURE__*/React.createElement(MenuItem, {
      value: o,
      key: `${o}_${i}`
    }, o);
  })), /*#__PURE__*/React.createElement(Typography, {
    variant: "body2",
    sx: {
      mb: 1
    },
    style: {
      marginTop: "1rem"
    }
  }, props.quirk.description))));
};
const Quirks = () => {
  const {
    data: quirks,
    isError: quirksLoadingError,
    isLoading: quirksLoading,
    isFetching: quirksFetching,
    refetch: refetchQuirks
  } = useQuirksQuery();
  const quirksContent = React.useMemo(() => {
    if (quirksLoadingError) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error",
        style: {
          textAlign: "center"
        }
      }, "Error loading quirks.");
    }
    if (!quirksLoading && (!quirks || Array.isArray(quirks) && quirks.length === 0)) {
      return /*#__PURE__*/React.createElement(Typography, {
        style: {
          textAlign: "center"
        }
      }, "No quirks. You might want to reload");
    }
    if (!quirks) {
      return;
    }
    quirks.sort((qA, qB) => {
      return qA.title.localeCompare(qB.title);
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, quirks.map((quirk, i) => {
      return /*#__PURE__*/React.createElement(QuirkControl, {
        quirk: quirk,
        key: quirk.id,
        style: i === quirks.length - 1 ? {} : {
          paddingBottom: "1rem"
        }
      });
    }));
  }, [quirksLoadingError, quirksLoading, quirks]);
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Box, {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(DetailPageHeaderRow, {
    title: "Quirks",
    icon: /*#__PURE__*/React.createElement(QuirksIcon, null),
    helpText: QuirksHelp,
    onRefreshClick: () => {
      refetchQuirks().catch(() => {
        /* intentional */
      });
    },
    isRefreshing: quirksFetching
  }), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column",
    style: {
      marginTop: "1rem"
    }
  }, quirksContent))));
};
export default Quirks;