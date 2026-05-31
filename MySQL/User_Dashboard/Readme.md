# User Dashboard — ERD

## Tables

### USERS

| Column        | Type     | Notes                 |
| ------------- | -------- | --------------------- |
| id            | INT PK   |                       |
| email         | VARCHAR  | Unique                |
| first_name    | VARCHAR  |                       |
| last_name     | VARCHAR  |                       |
| password_hash | VARCHAR  |                       |
| description   | TEXT     |                       |
| user_level    | INT      | 0 = admin, 1 = normal |
| created_at    | DATETIME |                       |
| updated_at    | DATETIME |                       |

### MESSAGES

| Column       | Type     | Notes      |
| ------------ | -------- | ---------- |
| id           | INT PK   |            |
| sender_id    | INT FK   | → users.id |
| recipient_id | INT FK   | → users.id |
| content      | TEXT     |            |
| created_at   | DATETIME |            |

---

## Relationships

```
USERS ||--o{ MESSAGES : sends
USERS ||--o{ MESSAGES : receives
```

One user sends many messages. One user receives many messages.

---

## Notes

- `user_level = 0` → admin. The first person to register becomes admin automatically.
- `password_hash` — never store plain passwords.
- `MESSAGES` references `USERS` twice — once for the sender, once for the recipient.

---
