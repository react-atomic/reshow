import { ReshowMessage, Return } from "reshow";
import { ClientRoute } from "reshow-url";
import { PopupPool } from "organism-react-popup";
import { PageLoadProgressHandler } from "organism-react-progress";

import Doc from "../templates/Doc";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";

const themes = {
  Page1,
  Page2,
};

const Index = (props) => (
  <Return initStates={["tplProps"]}>
    {({ tplProps }) => {
      return (
        <Doc {...tplProps}>
          <ClientRoute {...props} themes={themes} defaultThemePath="Page1" />
          <PageLoadProgressHandler ajax={true} />
          <ReshowMessage />
          <PopupPool />
        </Doc>
      );
    }}
  </Return>
);

export default Index;
