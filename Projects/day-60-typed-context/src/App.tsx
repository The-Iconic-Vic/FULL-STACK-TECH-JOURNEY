import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { TodoProvider } from './contexts/TodoContext'
import { NotificationProvider } from './contexts/NotificationContext'
import Layout from './components/Layout'
import ThemeToggle from './components/ThemeToggle'
import ThemeDisplay from './components/ThemeDisplay'
import LoginForm from './components/LoginForm'
import UserProfile from './components/UserProfile'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'
import NotificationBell from './components/NotificationBell'
import NotificationList from './components/NotificationList'

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <TodoProvider>
            <Layout>
              <div className="app-header">
                <h1>📦 Typed Context & Global State</h1>
                <div className="header-actions">
                  <NotificationBell />
                  <ThemeToggle />
                </div>
              </div>
              
              <div className="app-grid">
                {/* Theme Section */}
                <div className="card">
                  <h2>🎨 Theme System</h2>
                  <ThemeDisplay />
                </div>

                {/* Auth Section */}
                <div className="card">
                  <h2>🔐 Authentication</h2>
                  <LoginForm />
                  <UserProfile />
                </div>

                {/* Todo Section */}
                <div className="card full-width">
                  <h2>✅ Todo List</h2>
                  <TodoForm />
                  <TodoFilter />
                  <TodoList />
                </div>
              </div>

              <NotificationList />
            </Layout>
          </TodoProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App