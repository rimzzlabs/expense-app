# <p align="center">**ExpenseApp💰**</p>

ExpenseApp is an app to see you expense history, income history and help you notes what you're buying lately💰

> I built this only on weekend and sometimes at night to spend my **lonely** time as a Frontend Developer

## What's For

This app is an implementation of React with Supabase, simply have Authentication and CRUD operation.

### Stack

- Vite ⚡
- React ⚛️
- Supabase 🔥
- TailwindCSS 💨
- Miscellaneous 🔌
  - Framer Motion 🎞️
  - Jotai 👻
  - Headless UI 🔋
  - React Hot Toast 🔔
  - React Hook Form 📃

### Todos

- [x] Signin
- [x] Signup
- [x] Signout
- [x] Read Expense
- [x] Write Expense
- [x] Update Expense
- [x] Delete Expense
- [x] Read Expense History
- [x] Write Expense History
- [x] Delete Expense History
- [x] Update Expense History
- [x] Update User Profile Picture
- [x] Update User Username
- [x] Update User Email
- [x] Update User Password
- [x] Forgot Password
- [x] oAuth with Google and GitHub

## Develop on your local machine

1. Register on [Supabase](https://supabase.com).
2. Obtain your project's **Anon Key** and your Supabase project **URL**.
3. Paste them into the `.env.file`.
4. Go to the "SQL editor" in your Supabase Dashboard and click "New Query."
5. Execute the following SQL code to create the `expense` table:

```sql
DROP TABLE IF EXISTS expense CASCADE;
CREATE TABLE expense (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    history_id UUID UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW() NULL,
    title TEXT,
    total_money INT4
);
```

6. Execute the following SQL code to create the `history` table:

```sql
DROP TABLE IF EXISTS history CASCADE;
CREATE TABLE history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    expense_id UUID REFERENCES expense(history_id),
    created_at TIMESTAMPTZ DEFAULT NOW() NULL,
    source TEXT,
    type TEXT DEFAULT 'income',
    amount INT4
);
```

7. Create bucket `profiles` for profile picture
8. Inside `profiles` bucket, create folder `avatar`
9. Create **policies** for tables and bucket
   1. soon..

## Contribution

PR's are always open
