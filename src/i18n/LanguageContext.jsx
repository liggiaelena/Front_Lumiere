import { createContext, useContext, useState } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]

  const translateNote = (noteText) => {
    if (!noteText) return ''
    if (typeof noteText === 'object') {
      return noteText[lang] ?? noteText.en ?? Object.values(noteText)[0] ?? ''
    }
    let englishKey = noteText
    outerLoop:
    for (const langKey of Object.keys(translations)) {
      const notesMap = translations[langKey].notes
      if (!notesMap) continue
      if (notesMap[noteText]) {
        englishKey = noteText
        break
      }
      for (const [key, val] of Object.entries(notesMap)) {
        if (val === noteText) {
          englishKey = key
          break outerLoop
        }
      }
    }
    return translations[lang]?.notes?.[englishKey] ?? noteText
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, translateNote }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
