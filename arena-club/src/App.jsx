import Header       from './components/Header'
import Hero         from './components/Hero'
import Activities   from './components/Activities'
import Quiz         from './components/Quiz'
import About        from './components/About'
import Testimonials from './components/Testimonials'
import FAQ          from './components/FAQ'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Activities />
        <Quiz />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
