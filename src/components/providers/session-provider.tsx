import { Fragment, PropsWithChildren, useEffect } from "react";
// import { AuthServices } from "@/services/auth.services";
import { useNavigate } from "react-router";
import { setAuthInterceptor } from "@/config/axios.config";


export function SessionProvider({ children }: PropsWithChildren) {
    const nav = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!accessToken) {
            localStorage.clear();
            nav("/");
            return
        };
        const validateSession = async () => {
            try {
                await setAuthInterceptor(accessToken);
                // const res = await AuthServices.me();
                nav("/dashboard");
            } catch (error) {
                console.log("falla el /me", error);
                localStorage.clear();
                nav("/");
            }
        };

        validateSession();
    }, []);
    return <Fragment>{children}</Fragment>;
}