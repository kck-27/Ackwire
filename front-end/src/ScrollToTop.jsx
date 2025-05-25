// ScrollToTop.jsx
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "./context/ShopContext";

const ScrollToTop = () => {
  const shopContext = useContext(ShopContext);
  const loading = shopContext?.loading;
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/purchases") return;
    window.scrollTo(0, 0);
  }, [pathname, loading]);

  return null;
};

export default ScrollToTop;