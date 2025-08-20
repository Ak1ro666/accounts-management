import fs from 'fs'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import PDFDocument from 'pdfkit'

import { db } from './data.js'

const app = express()
const PORT = 7000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// Пути к стандартным шрифтам в Ubuntu
const UBUNTU_FONTS = {
  LiberationSans:
    '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
  DejaVuSans: '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
}

app.post('/api/generate-pdf', (req, res) => {
  try {
    const { title = 'Отчёт', content = 'Содержание отчёта' } = req.body
    const doc = new PDFDocument()

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf')

    // Пытаемся использовать Liberation Sans (есть в Ubuntu)
    if (fs.existsSync(UBUNTU_FONTS.LiberationSans)) {
      doc.font(UBUNTU_FONTS.LiberationSans)
    }
    // Fallback на DejaVu Sans (тоже есть в Ubuntu)
    else if (fs.existsSync(UBUNTU_FONTS.DejaVuSans)) {
      doc.font(UBUNTU_FONTS.DejaVuSans)
    }
    // Если ничего не найдено - используем встроенный Helvetica
    else {
      doc.font('Helvetica')
      console.warn(
        'Стандартные шрифты Ubuntu не найдены, используется Helvetica'
      )
    }

    // Заголовок
    doc
      .fontSize(20)
      .text(title, { align: 'center', underline: true })
      .moveDown()

    // Дата
    doc
      .fontSize(12)
      .text(`Сгенерировано: ${new Date().toLocaleString('ru-RU')}`)
      .moveDown(2)

    // Основной текст
    doc.fontSize(14).text(content, {
      lineGap: 5,
      paragraphGap: 10,
      indent: 20,
      align: 'justify'
    })

    doc.pipe(res)
    doc.end()
  } catch (error) {
    console.error('Ошибка генерации PDF:', error)
    res.status(500).json({ error: 'Ошибка при создании PDF' })
  }
})

app.get('/api/accounts', (req, res) => {
  res.json(db.accounts)
})

app.get('/api/accounts/:id', (req, res) => {
  const account = db.accounts.find((a) => a.id === req.params.id)

  if (account) {
    res.json(account)
  } else {
    res.status(404).json({ error: 'Account not found' })
  }
})

app.post('/api/accounts', (req, res) => {
  const newAccount = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    charges: [],
    payments: [],
    ...req.body
  }
  db.accounts.push(newAccount)
  res.status(201).json(newAccount)
})

app.put('/api/accounts', (req, res) => {
  try {
    const updatedAccounts = req.body.accounts
    if (!Array.isArray(updatedAccounts)) {
      return res
        .status(400)
        .json({ error: 'Expected an array of accounts in the request body' })
    }

    // Полностью заменяем все аккаунты
    db.accounts = updatedAccounts.map((account) => ({
      ...account,
      updatedAt: new Date().toISOString()
    }))
  } catch (error) {
    res.json(db.accounts)
    console.error('Error updating all accounts:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.put('/api/accounts/:id', (req, res) => {
  const index = db.accounts.findIndex((a) => a.id === req.params.id)
  if (index !== -1) {
    const updatedAccount = {
      ...db.accounts[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    }
    db.accounts[index] = updatedAccount
    res.json(updatedAccount)
  } else {
    res.status(404).json({ error: 'Account not found' })
  }
})

app.delete('/api/accounts/:id', (req, res) => {
  const index = db.accounts.findIndex((a) => a.id === req.params.id)
  if (index !== -1) {
    const deletedAccount = db.accounts.splice(index, 1)[0]
    res.json(deletedAccount)
  } else {
    res.status(404).json({ error: 'Account not found' })
  }
})

app.get('/api/files', (req, res) => {
  res.json(db.files)
})

app.get('/api/files/:id', (req, res) => {
  const findFile = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item
      if (item.children) {
        const found = findFile(item.children, id)
        if (found) return found
      }
    }
    return null
  }

  const file = findFile(db.files, req.params.id)
  if (file) {
    res.json(file)
  } else {
    res.status(404).json({ error: 'File not found' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
