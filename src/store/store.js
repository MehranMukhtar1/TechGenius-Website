import { create } from 'zustand'

export const useUserStore = create((set) => ({
  isLogin: false,
  username: "",
  email: "",
  avatar: "",
  isAlert: false,
  alertMsg: "",
  alertType: "",
  setIsLogin: (newState) => set({ isLogin:newState}),
  setUsername: (newState) => set({ username:newState}),
  setEmail: (newState) => set({ email:newState}),
  setAvatar: (newState) => set({ avatar:newState}),
  setIsAlert: (newState) => set({ isAlert:newState}),
  setAlertMsg: (newState) => set({ alertMsg:newState }),
  setAlertType: (newState) => set({ alertType:newState })
}))