Project CP

ต้อง setup backend ก่อน ถึงจะสามารถเข้าใช้งานได้
และ setup line liff ตั้ง redirect url เป็น https://localhost:3000/
เมื่อ redirect แล้วให้เปลี่ยนเข้า http://localhost:3000/ เพื่อเก็บค่า access token ไว้ใช้งาน
backend อยู่ที่ https://github.com/SnowTd/project-cp-be.git

git clone https://github.com/SnowTd/project-cp-fe.git

bun install

bun run dev

setup env

- BASEURL_API=
- LIFF_ID=

Tool
nextjs 14.2.13
tailwindcss
shadcn/ui
line liff sdk
