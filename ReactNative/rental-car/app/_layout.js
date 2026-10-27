import Navigation from './navigation';
import { AuthProvider } from '../hooks/useAuth';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    )
}