import { create } from 'zustand'
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Definir interfaces 
interface Users {
    id: string;
    companyName: string;
    userName: string;
    name: string;
    lastName: string,
    membership_status: boolean;
    email: string;
    role: string;
    phone: string
}

interface Account {
    id: string;
    name: string,
    lastName: string,
    tenantName: string;
    membership_status: boolean;
    email: string;
    role: string;
    phone: string;
    createdAt: string;
}

interface Company {
    id: string;
    name: string;
    Services: []
}

// Definir el estado de Zustand con sus acciones
interface IDashboard {
    accounts: Account[];
    users: Users[];
    companies: Company[];
    loading: boolean;
    error: string | null;

    getUsers: () => Promise<void>;
    getCompanies: () => Promise<void>;
    getAccounts: () => Promise<void>;
    updateUserStatus: (userId: string, membership_status: boolean) => Promise<void>;
}

export const useDashboardStore = create<IDashboard>((set) => ({
    //global states
    accounts: [],
    users: [],
    companies: [],
    loading: false,
    error: null,

    //actions
    // Acción: Obtener usuarios
    getUsers: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get<Users[]>(`${BASE_URL}/api/admin/users`);
            set({ users: data });
        } catch (error) {
            set({ error: "Error al obtener usuarios" });
        } finally {
            set({ loading: false });
        }
    },

    // Acción: Obtener compañías
    getCompanies: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get<Company[]>(`${BASE_URL}/api/admin/companies`);
            set({ companies: data });
        } catch (error) {
            set({ error: "Error al obtener compañías" });
        } finally {
            set({ loading: false });
        }
    },

    // Acción: Obtener Cuentas
    getAccounts: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get<Account[]>(`${BASE_URL}/api/admin/accounts`)
            set({ accounts: data })
        } catch (error) {
            set({ error: "Error al obtener las cuentas" })
        } finally {
            set({ loading: false })
        }
    },

    // Acción: Actualizar estado de usuario (activar/inactivar)
    updateUserStatus: async (userId, membership_status) => {
        try {
            await axios.patch(`${BASE_URL}/api/admin/users/${userId}`, { membership_status });

            set((state) => ({
                accounts: state.accounts.map((account) =>
                    account.id === userId ? { ...account, membership_status } : account
                ),
                users: state.users.map((user) =>
                    user.id === userId ? { ...user, membership_status } : user
                ),
                loading: false
            }));
        } catch (error) {
            set({ error: "Error al actualizar estado del usuario", loading: false });
        }
    },



}))