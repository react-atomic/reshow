//@ts-check

import { VerticalMenu } from "pmvc_react_admin";
import { SideMenu } from "organism-react-navigation";
import { pageStore, ReLink } from "reshow";
import { KEYS } from "reshow-constant";

/**
 * @returns {React.ReactElement}
 */
const Menu = () => {
  const thisMenus = {};
  const themes = pageStore.getMap("themes");
  KEYS(themes).forEach((item) => {
    thisMenus[item] = {
      text: item,
      href: "#/" + item,
    };
  });
  return (
    <SideMenu
      menus={thisMenus}
      linkComponent={ReLink}
      component={<VerticalMenu />}
    />
  );
};

export default Menu;
