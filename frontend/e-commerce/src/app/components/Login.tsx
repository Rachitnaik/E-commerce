import { useState } from "react";
import { signInWithGoogle, logout } from "../firebase/auth";

const LoginButton = () => {
    const [user, setUser] = useState<any>(null);

    const handleLogin = async () => {
        try {
            const userData = await signInWithGoogle();
            setUser(userData);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.displayName}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Sign in with Google</button>
            )}
        </div>
    );
};

export default LoginButton;
