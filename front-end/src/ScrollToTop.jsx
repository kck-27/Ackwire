// ScrollToTop.jsx
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "./context/ShopContext";

const ScrollToTop = () => {
    const {loading} = useContext(ShopContext);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/purchases") {
        console.log(pathname)
        return;}
    window.scrollTo(0, 0);
  }, [pathname, loading]);
  return null;
};

export default ScrollToTop;