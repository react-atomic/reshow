import { ReshowMessage, Return } from "reshow";
import { ClientRoute } from "reshow-url";
import { PopupPool } from "organism-react-popup";
import { PageLoadProgressHandler } from "organism-react-progress";

import Doc from "../templates/Doc";
import Atoms from "../pages/Atoms";

const themes = {
  Atoms,
};

const Index = (props) => (
  <Return initStates={["tplProps"]}>
    {({ tplProps }) => {
      return (
        <Doc {...tplProps}>
          <ClientRoute {...props} themes={themes} defaultThemePath="Atoms" />
          <PageLoadProgressHandler ajax={true} />
          <ReshowMessage />
          <PopupPool />
        </Doc>
      );
    }}
  </Return>
);

export default Index;
