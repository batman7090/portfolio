import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Blog from './pages/Blog'
import PostDetail from './pages/PostDetail'
import Courses from './pages/Courses'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/** Every route fades and lifts on the same curve — page changes feel like one app, not five. */
function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/projects" element={<Page><Projects /></Page>} />
        <Route path="/projects/:slug" element={<Page><ProjectDetail /></Page>} />
        <Route path="/blog" element={<Page><Blog /></Page>} />
        <Route path="/blog/:slug" element={<Page><PostDetail /></Page>} />
        <Route path="/courses" element={<Page><Courses /></Page>} />
        <Route path="/contact" element={<Page><Contact /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}
