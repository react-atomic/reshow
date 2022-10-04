//@ts-check

import { lazy } from "react";
import { ReshowMessage, Return } from "reshow";
import { ClientRoute } from "reshow-url";
import { PopupPool } from "organism-react-popup";
import { PageLoadProgressHandler } from "organism-react-progress";

import Doc from "../templates/Doc";

const themes = {
  Page1: lazy(() => import("../pages/Page1")),
  Page2: lazy(() => import("../pages/Page2")),
};

const Index = (props) => (
  <>
    <Return initStates={["tplProps", "pageName"]}>
      {({ tplProps, pageName }) => (
        <Doc {...tplProps} className={pageName}>
          <ClientRoute {...props} themes={themes} defaultThemePath="Page1" />
        </Doc>
      )}
    </Return>
    <PageLoadProgressHandler ajax={true} />
    <ReshowMessage />
    <PopupPool />
  </>
);

export default Index;
