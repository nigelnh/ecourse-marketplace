# Sàn Giáo Dục Thương Mại Điện Tử với AI

React-based marketplace cho các khóa học trực tuyến với tính năng gợi ý thông minh từ AI.

## Tính năng chính

- **Hiển thị danh sách sản phẩm**: Hiển thị khóa học với thông tin đầy đủ
- **Tìm kiếm và lọc**: Tìm theo tên, lọc theo giá
- **Gợi ý thông minh (AI)**: Gọi API `/api/suggestions?userId=xxx`
- **Modal chi tiết**: Xem thông tin chi tiết khóa học
- **Yêu thích**: Đánh dấu và quản lý khóa học yêu thích
- **Lịch sử xem**: Track và hiển thị khóa học đã xem
- **Loading states**: Skeleton loading khi gọi API
- **Error handling**: Xử lý lỗi khi API fail
- **Responsive design**: Hoạt động tốt trên mọi thiết bị

## Cài đặt

### Prerequisites

- Node.js (>=14.0.0)
- npm or yarn

### Cài đặt dependencies

```bash
cd ebook-marketplace
npm install
```

### Chạy project

**Option 1: Chạy cùng lúc React + API Server**

```bash
# Terminal 1: Start JSON Server
npx json-server --watch db.json --port 3001

# Terminal 2: Start React App
npm start
```

**Option 2: Sử dụng script tự động (nếu concurrently hoạt động)**

```bash
npm run dev
```

### URLs

- **React App**: http://localhost:3000
- **API Server**: http://localhost:3001
- **API Endpoints**:
  - GET /courses - Lấy danh sách khóa học
  - GET /suggestions?userId=xxx - Lấy gợi ý cho user

## Dữ liệu

Project sử dụng **JSON Server** làm fake API với file `db.json`:

```json
{
  "courses": [...],      // 10 khóa học mẫu
  "suggestions": [...]   // Gợi ý cho từng user
}
```

## Kiến trúc

### Components chính

- **HomePage**: Trang chủ với danh sách khóa học
- **FavoritesPage**: Trang quản lý yêu thích
- **HistoryPage**: Lịch sử xem khóa học
- **ProductModal**: Modal chi tiết sản phẩm
- **SuggestionsModal**: Modal hiển thị gợi ý AI

### Context Management

- **UserBehaviorContext**: Track hành vi xem khóa học
- **FavoritesContext**: Quản lý danh sách yêu thích
- **SuggestionsContext**: Xử lý gợi ý AI

### Services

- **apiService.js**: API calls với Axios
- **suggestionsService.js**: Logic gợi ý thông minh

## AI Suggestions

Hệ thống gợi ý hoạt động theo 2 lớp:

1. **API-based**: Gọi `/api/suggestions?userId=xxx`
2. **Algorithm-based**: Fallback algorithm dựa trên:
   - Lịch sử xem
   - Danh sách yêu thích
   - Tương tự về giá cả, tác giả, level

## UI/UX Features

- **Modern Design**: Giao diện hiện đại, thân thiện
- **Responsive**: Mobile-first approach
- **Smooth Animations**: Hover effects, transitions
- **Loading States**: Skeleton loading cho better UX
- **Error Handling**: User-friendly error messages

## Troubleshooting

### JSON Server không khởi động

```bash
# Cài đặt global
npm install -g json-server

# Hoặc dùng npx
npx json-server --watch db.json --port 3001
```

### Port 3001 bị chiếm

```bash
# Kiểm tra process đang dùng port
lsof -i :3001

# Kill process nếu cần
kill -9 [PID]
```

### Images không hiển thị

- Đảm bảo images trong folder `public/assets/course-images/`
- Check đường dẫn trong db.json: `/assets/course-images/course-X.jpg`

## 📝 Demo

**Demo Link**: [Deployed on Vercel/Netlify]

**Github Repo**: [Repository URL]

## Tech Stack

- **Frontend**: React 18
- **Styling**: CSS, Responsive Design
- **State Management**: Context API + useReducer
- **HTTP Client**: Axios
- **Mock API**: JSON Server
- **Icons**: Lucide React

---