import { useState, useEffect } from "react";

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent ;
            setIsMobile(/android|iphone|ipad/i.test(userAgent) || window.innerWidth <= 640);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        }
    }, []);
    
    return isMobile;
};