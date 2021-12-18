import usePage from "../../src/usePage";

const Page2 = (props) => {
  usePage({ ...props, pageName: "Page2" });
  return <>This is page2</>;
};

export default Page2;
