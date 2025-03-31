import { create } from "zustand";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface AuthState {
    user: any | null;
    accessToken: string | null;
    login: (user: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: localStorage.getItem("user") || null,
    accessToken: localStorage.getItem("accessToken") || null,

    login: async (user, password) => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user, password }),
            });

            if (!response.ok) throw new Error("Credenciales incorrectas");

            const data = await response.json();
            console.log(data)
            if (data.user.role !== "SUPER_ADMIN") {
                throw new Error("Acceso denegado: No tienes permisos para ingresar.");
            }

            set({ user: data.user, accessToken: data.backendTokens.accessToken });

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("accessToken", data.backendTokens.accessToken);
        } catch (error) {
            console.log(error)
        }
    },
    logout: () => {
        set({ user: null, accessToken: null });
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    },
}));
