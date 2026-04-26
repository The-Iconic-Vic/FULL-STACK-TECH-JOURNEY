import styles from './ExportImport.module.css'

function ExportImport({ todos, onImport }) {
  const exportData = () => {
    const dataStr = JSON.stringify(todos, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `todos_backup_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        if (Array.isArray(imported)) {
          if (window.confirm(`Import ${imported.length} todos? This will replace current todos.`)) {
            onImport(imported)
          }
        } else {
          alert('Invalid file format')
        }
      } catch {
        alert('Error parsing JSON file')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <div className={styles.actions}>
      <button className={styles.exportBtn} onClick={exportData}>
        📥 Export Todos (JSON)
      </button>
      <label className={styles.importLabel}>
        📤 Import Todos
        <input type="file" accept=".json" onChange={importData} className={styles.fileInput} />
      </label>
    </div>
  )
}

export default ExportImport