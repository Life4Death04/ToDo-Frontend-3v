import { LoginContainer } from "../containers/LoginContainer"
import { Auth0TestComponent } from "../components/Auth/Auth0TestComponent"

export default function LoginPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">ToDo App - Auth0 Integration Test</h1>

            {/* Auth0 Test Component - Remove this after testing */}
            <div className="border-2 border-blue-200 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold mb-2 text-blue-800">🔒 Auth0 Test Section</h2>
                <Auth0TestComponent />
            </div>

            {/* Original Login Form */}
            <div className="border-2 border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">📝 Original Login Form</h2>
                <LoginContainer />
            </div>
        </div>
    )
}