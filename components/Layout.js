import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
            <h1>
              <span>Just Add</span>
              <span>Test Blog</span>
            </h1>
            <h2>Spread The Joy</h2>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2024 by test blog :)</p>
      </footer>
    </div>
  )
}