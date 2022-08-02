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

1. Register to [Supabase](https://supabase.com)
2. Get your projects' **Anon Key** and your Supabase project **URL**
3. Paste it on `.env.file`
4. Create table `expense`, with 6 columns:
   1. `id` `(uuid)` default value: `uuid_generate_v4()` as **primary key**
   2. `user_id` `(uuid)` **relation with `user.id`**
   3. `history_id` `(uuid)` mark as `unique`
   4. `created_at` `(timestamptz)` default value: `now()` mark as `allow nullable`
   5. `title` `(text)`
   6. `total_money` `(int4)`
5. Create table `history`, with 6 columns:
   1. `id` `(uuid)` default value: `uuid_generate_v4()` as **primary key**
   2. `user_id` (uuid) **relation with user.id**
   3. `expense_id` `(uuid)` **relation with `history.history_id`**
   4. `created_at` `(timestamptz)` default value: `now()` mark as `allow nullable`
   5. `source` `(text)`
   6. `type` `(text)` this actually should be 2(income, and outcome), default value: `income`
   7. `amount` `(int4)`
6. Create bucket `profiles` for profile picture
7. Inside `profiles` bucket, create folder `avatar`
8. Create **policies** for tables and bucket
   1. soon..

## Contribution

PR's are always open
