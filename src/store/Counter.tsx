import { create } from 'zustand'

interface IStore {
    count: number
    inc: () => void
}

export const useStore = create<IStore>()((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
}))
