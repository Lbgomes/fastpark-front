import create from 'zustand'

interface UserState {
    Autenticated: boolean,
    userEmail: string,
    setUserEmail: (email: string) => void
    setAutenticated: () => void,
    
}

export const useUserStore = create<UserState>()((set) => ({
    Autenticated: false,
    userEmail: '',
    setUserEmail: (email) => set({ userEmail: email }),
    setAutenticated: () => set({ Autenticated: true })
}))
