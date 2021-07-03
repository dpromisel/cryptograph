import React, { useContext } from "react";
import Header from "./Header";
import Sider from "./Sider";

export default function Navigation(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Header open={open} handleDrawerOpen={() => setOpen(true)} />

      <Sider
        open={open}
        menuItems={[]}
        handleDrawerClose={() => setOpen(false)}
      />
    </>
  );
}
