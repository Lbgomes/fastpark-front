import create from 'zustand'

interface UserState {
    Autenticated: boolean,
    setAutenticated: () => void
}

export const useUserStore = create<UserState>()((set) => ({
    Autenticated: false,
    setAutenticated: () => set({ Autenticated: true })
}))
