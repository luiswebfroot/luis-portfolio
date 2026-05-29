import fs from 'fs'
import path from 'path'

export default function DownloadsPage() {
  const dir = path.join(process.cwd(), 'public', 'downloads')
  const files = fs.readdirSync(dir).filter((f) => f !== '.gitkeep')

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Downloads</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>{files.length} file{files.length !== 1 ? 's' : ''}</p>

      {files.length === 0 ? (
        <p style={{ color: '#999' }}>No files available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {files.map((file) => (
            <li key={file} style={{ borderBottom: '1px solid #eee', padding: '14px 0' }}>
              <a
                href={`/downloads/${encodeURIComponent(file)}`}
                download={file}
                style={{ color: '#0070f3', textDecoration: 'none', fontSize: 16 }}
              >
                {file}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
