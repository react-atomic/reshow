import usePage from "../../usePage";

const Page1 = (props) => {
  usePage({ ...props, pageName: "Page1" });
  return <>This is page1</>;
};

export default Page1;
