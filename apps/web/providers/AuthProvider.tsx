"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { firebaseAuth } from "@/lib/firebase/config";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useCookie } from "next-cookie";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  accessToken: string | null;
}

const publicPaths = ["/", "/login", "/signup"];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_COOKIE_NAME = "auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();
  const pathname = usePathname();
  const cookie = useCookie();

  const setAuthCookie = (token: string) => {
    cookie.set(AUTH_COOKIE_NAME, token, { path: "/" });
  };

  const removeAuthCookie = () => {
    cookie.remove(AUTH_COOKIE_NAME);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      const accessToken = await userCredential.user.getIdToken();
      if (accessToken) {
        setAccessToken(accessToken);
        setAuthCookie(accessToken);
      }

      setUser(userCredential.user);
      push("/session");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      setUser(userCredential.user);
      push("/");
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(firebaseAuth);
      setUser(null);
      removeAuthCookie();
      push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(firebaseAuth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    const accessToken = credential?.accessToken;
    if (accessToken) {
      setAccessToken(accessToken);
    }

    setUser(userCredential?.user);
    push("/");
  };

  const signInWithApple = async () => {
    const provider = new OAuthProvider("apple.com");
    const userCredential = await signInWithPopup(firebaseAuth, provider);

    const credential = OAuthProvider.credentialFromResult(userCredential);
    const accessToken = credential?.accessToken;
    if (accessToken) {
      setAccessToken(accessToken);
    }

    setUser(userCredential?.user);
    push("/");
  };

  // useEffect(() => {
  //   // @FIXME: move logic to middleware
  //   const isPublicPath = publicPaths.includes(pathname);

  //   if (!isLoading) {
  //     if (!user && !isPublicPath) {
  //       push("/login");
  //     } else if (user && isPublicPath) {
  //       push("/");
  //     }
  //   }
  // }, [user, isLoading, pathname, push]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        console.log("firebaseUser", firebaseUser);
        setUser(firebaseUser);
        if (firebaseUser) {
          const accessToken = await firebaseUser.getIdToken();
          if (accessToken) {
            setAccessToken(accessToken);
            setAuthCookie(accessToken);
          }
        } else {
          removeAuthCookie();
        }
        localStorage.setItem("user-uid", JSON.stringify(firebaseUser?.uid));
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    signInWithGoogle,
    signInWithApple,
    accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
