// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 7000;

app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin); // Какой origin приходит?
  next();
});

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Инициализация данных в памяти
let db = {
  accounts: [
    {
      id: "1",
      code: "ЛС004550123",
      status: "OPEN",
      owner: "Иванов Иван Иванович22",
      address: "Москва, Ленинский просп., 13, корп.2, кв 14",
      debt: 107.5,
      createdAt: "2025-04-22",
      updatedAt: "2025-05-12T05:42:16.094Z",
      charges: [],
      payments: [],
    },
    {
      id: "2",
      code: "ЛС004550124",
      status: "OPEN",
      owner: "Петров Петр Петрович",
      address: "Москва, Тверская, 10 кв 15",
      debt: 0,
      createdAt: "2025-04-22",
      updatedAt: "2025-05-01T02:29:56.427Z",
      charges: [],
      payments: [],
    },
    {
      id: "3",
      code: "ЛС004550125",
      status: "CLOSED",
      owner: "Сидоров Сидор Сидорович",
      address: "Москва, Арбат, 5",
      debt: -50,
      createdAt: "2025-04-22",
      updatedAt: "2025-04-23T10:02:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "4",
      code: "ЛС004550126",
      status: "PRE_CLOSED",
      owner: "Смирнова Анна Ивановна",
      address: "Москва, Пресненская наб., 12",
      debt: 200,
      createdAt: "2024-11-25",
      updatedAt: "2025-04-23T10:03:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "5",
      code: "ЛС004550127",
      status: "OPEN",
      owner: "Козлов Алексей Петрович",
      address: "Москва, Кутузовский просп., 30",
      debt: 150,
      createdAt: "2024-11-26",
      updatedAt: "2025-04-23T10:04:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "6",
      code: "ЛС004550128",
      status: "OPEN",
      owner: "Новикова Елена Сергеевна",
      address: "Москва, Профсоюзная, 45",
      debt: 0,
      createdAt: "2024-11-27",
      updatedAt: "2025-04-23T10:05:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "7",
      code: "ЛС004550129",
      status: "CLOSED",
      owner: "Морозов Дмитрий Александрович",
      address: "Москва, Варшавское шоссе, 60",
      debt: 0,
      createdAt: "2024-11-28",
      updatedAt: "2025-04-23T10:06:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "8",
      code: "ЛС004550130",
      status: "OPEN",
      owner: "Волкова Ольга Николаевна",
      address: "Москва, Ленинградский просп., 80",
      debt: 300,
      createdAt: "2024-11-29",
      updatedAt: "2025-04-23T10:07:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "9",
      code: "ЛС004550131",
      status: "PRE_CLOSED",
      owner: "Соколов Игорь Владимирович",
      address: "Москва, Мичуринский просп., 15",
      debt: 75,
      createdAt: "2024-11-30",
      updatedAt: "2025-04-23T10:08:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "10",
      code: "ЛС004550132",
      status: "OPEN",
      owner: "Лебедева Мария Андреевна",
      address: "Москва, Рублевское шоссе, 20",
      debt: 125,
      createdAt: "2024-12-01",
      updatedAt: "2025-04-23T10:09:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "11",
      code: "ЛС004550133",
      status: "OPEN",
      owner: "Кузнецов Артем Михайлович",
      address: "Москва, Садовая-Кудринская, 25",
      debt: 0,
      createdAt: "2024-12-02",
      updatedAt: "2025-04-23T10:10:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "12",
      code: "ЛС004550134",
      status: "CLOSED",
      owner: "Павлова Екатерина Дмитриевна",
      address: "Москва, Новый Арбат, 30",
      debt: -100,
      createdAt: "2024-12-03",
      updatedAt: "2025-04-23T10:11:00Z",
      charges: [],
      payments: [],
    },
    {
      id: "7f08",
      code: "zxc",
      owner: "zxc123",
      address: "лох бумажный",
      status: "OPEN",
      updatedAt: "2025-05-12T05:32:37.129Z",
    },
  ],
  files: [
    {
      id: "1",
      name: "Документ 1",
      type: "folder",
      children: [
        {
          id: "2",
          name: "Файл 2",
          type: "file",
          size: 1024,
        },
        {
          id: "3",
          name: "Документ 3",
          type: "folder",
          children: [
            {
              id: "5",
              name: "Файл 5",
              type: "file",
              size: 1024,
            },
          ],
        },
      ],
    },
    {
      id: "4",
      name: "Файл 4",
      size: 1024,
      type: "file",
    },
    {
      id: "6",
      name: "Файл 6",
      size: 1024,
      type: "file",
    },
  ],
};

// ========== Accounts API ========== //

// Получить все аккаунты
app.get("/api/accounts", (req, res) => {
  res.json(db.accounts);
});

// Получить аккаунт по ID
app.get("/api/accounts/:id", (req, res) => {
  const account = db.accounts.find((a) => a.id === req.params.id);
  if (account) {
    res.json(account);
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});

// Создать новый аккаунт
app.post("/api/accounts", (req, res) => {
  const newAccount = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    charges: [],
    payments: [],
    ...req.body,
  };
  db.accounts.push(newAccount);
  res.status(201).json(newAccount);
});

// Обновить аккаунт
app.put("/api/accounts/:id", (req, res) => {
  const index = db.accounts.findIndex((a) => a.id === req.params.id);
  if (index !== -1) {
    const updatedAccount = {
      ...db.accounts[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    db.accounts[index] = updatedAccount;
    res.json(updatedAccount);
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});

// Удалить аккаунт
app.delete("/api/accounts/:id", (req, res) => {
  const index = db.accounts.findIndex((a) => a.id === req.params.id);
  if (index !== -1) {
    const deletedAccount = db.accounts.splice(index, 1)[0];
    res.json(deletedAccount);
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});

// ========== Files API ========== //

// Получить все файлы
app.get("/api/files", (req, res) => {
  res.json(db.files);
});

// Получить файл по ID
app.get("/api/files/:id", (req, res) => {
  const findFile = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findFile(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const file = findFile(db.files, req.params.id);
  if (file) {
    res.json(file);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
