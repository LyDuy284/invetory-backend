# Inventory Backend (Node.js + MySQL)

## Cài đặt

```bash
npm install
cp .env.example .env
# sửa thông tin DB, JWT, Cloudinary trong .env
npm run dev
```

## Cấu trúc chính

- Đăng ký / đăng nhập: \`/api/auth\`
- Products (cần Bearer token):
  - GET \`/api/products\`
  - POST \`/api/products\` (multipart/form-data, field \`image\`)
- Orders (cần Bearer token):
  - GET \`/api/orders\`
  - POST \`/api/orders\`
  - PATCH \`/api/orders/:id/status\`
