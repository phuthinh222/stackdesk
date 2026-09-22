# TODO — Triển khai StackDesk

Checklist triển khai cụ thể theo từng giai đoạn, bám theo kiến trúc mô tả trong [README.md](README.md). Đánh dấu `[x]` khi hoàn thành; các mục gắn nhãn **(quyết định)** là việc cần chốt trước khi làm tiếp, chưa có câu trả lời cuối cùng trong tài liệu hiện tại.

## Giai đoạn 0 — Nền tảng & Setup (Tuần 1)

- [x] Chốt base project / tech stack — **Astro + AstroWind** (islands cho Comparison Engine/Smart Finder/AI Advisor UI, server endpoints cho AI Advisor backend)
- [x] Khởi tạo repo, cấu trúc thư mục dự án — scaffold bằng `npm create astro@latest . -- --template onwidget/astrowind` (không tự tạo file tay), `git init`, commit đầu tiên, push lên `origin/dev` tại [github.com/phuthinh222/stackdesk](https://github.com/phuthinh222/stackdesk) (nhánh `dev`, chưa có `main`)
- [x] Đăng ký domain **stackdesk24.site** + kết nối hosting **Vercel** — đã đăng ký domain và link project trên Vercel dashboard. Lưu ý: `vercel.json` đã có sẵn từ template, `astro.config.ts` đang ở `output: 'static'` — khi làm AI Advisor (Giai đoạn 3) cần chuyển route `/api/*` sang `server`/`hybrid` với `@astrojs/vercel` adapter
- [x] Setup công cụ Analytics — **PostHog Cloud**: đã cài `posthog-js`, wiring xong trong `src/utils/analytics.ts` (`initAnalytics()` + `trackEvent()` sẵn cho Compare/Finder/AI Advisor/`/go/...` sau này) và `src/components/common/Analytics.astro` (chỉ nhúng script khi có `PUBLIC_POSTHOG_KEY`, dạng module deferred — đã build-test cả 2 trường hợp có/không key). **Còn lại việc của bạn:** tạo project trên [posthog.com](https://posthog.com) (chọn US hoặc EU Cloud), copy API key vào `.env` (copy từ `.env.example`) cho local, và thêm `PUBLIC_POSTHOG_KEY`/`PUBLIC_POSTHOG_HOST` vào Environment Variables trên Vercel dashboard cho production
- [x] Dựng design system tạm thời — đổi theo đúng quy trình chính thức của AstroWind (`.agents/skills/styling.md`): màu primary/secondary → **Indigo**, accent → **Amber** trong `src/components/CustomStyles.astro` (light + dark); thêm font **JetBrains Mono** cho spec sản phẩm qua Astro Fonts API (`astro.config.ts` + `Layout.astro` + `--font-mono` trong `tailwind.css`), giữ **Inter** cho sans/heading. Đã build-test: cả 2 font tự host đúng, màu áp dụng đúng cả 2 theme. Layout cơ bản (spacing/grid) giữ nguyên mặc định AstroWind — chưa cần chỉnh vì chưa có trang sản phẩm thực (Giai đoạn 1-2)

## Giai đoạn 1 — Data & Content Architecture (Tuần 1–2)

- [ ] Định nghĩa schema `Product Data Node` bằng Zod (Identity, Category, Specifications, Tags, Use Cases, Editorial, Scoring, Commerce — theo mục 8 README)
- [ ] Viết discriminated union schema riêng cho từng category: Monitor / Keyboard / Mouse
- [ ] Thiết kế công thức Use-case Score (Programming, Gaming, Office, Design) cho từng category — công thức phải công khai, không black-box
- [ ] Chốt nguồn ảnh sản phẩm (tự chụp / brand press kit / Creators API hotlink) — **(quyết định)**
- [ ] Thu thập & nhập dữ liệu mẫu 10–15 sản phẩm/category để test pipeline (Monitor, Keyboard, Mouse)

## Giai đoạn 2 — Core Product Experience (Tuần 2–4)

- [ ] Trang danh sách sản phẩm theo category + bộ lọc cơ bản
- [ ] Trang chi tiết sản phẩm (spec đầy đủ, Editorial verdict/pros/cons, use-case score)
- [ ] Comparison Engine: chọn 2–4 sản phẩm → Head-to-head Spec Matrix
- [ ] Comparison Engine: Use-Case Comparison (biểu đồ năng lực theo nhu cầu)
- [ ] Comparison Engine: Trade-off Analysis (giải thích chênh lệch giá mang lại gì)
- [ ] Smart Finder: bộ lọc đa tiêu chí (multi-criteria filtering)

## Giai đoạn 3 — Intelligence & Recommendation Engine (Tuần 4–5)

- [ ] Cài đặt Weighted Formula Score (công thức trọng số minh bạch, tách biệt khỏi hoa hồng affiliate)
- [ ] Xây UI Explainable Recommendation ("Khuyên dùng vì: ...")
- [ ] AI Advisor — bước 1: LLM hiểu prompt tự nhiên → sinh Structured Query (JSON)
- [ ] AI Advisor — bước 2: validate query bằng Zod Schema
- [ ] AI Advisor — bước 3: Deterministic Match Engine chạy trên catalog đã chuẩn hóa
- [ ] AI Advisor — bước 4: trả Ranked Results kèm giải thích
- [ ] Test AI Advisor với 10–20 prompt mẫu (tiếng Việt + tiếng Anh) để kiểm tra độ chính xác structured query

## Giai đoạn 4 — Commerce & Affiliate (Tuần 5)

- [ ] Đăng ký affiliate/đối tác bán hàng (Amazon Associates, Shopify store, local authorized dealer...)
- [ ] Quyết định có làm redirect `/go/...` để track click hay chỉ dùng `onClick` — **(quyết định, phụ thuộc kết quả đo pilot)**
- [ ] Gắn UTM/tracking cho từng nguồn traffic dẫn tới trang mua hàng

## Giai đoạn 5 — Content Marketing & Social Distribution (Tuần 5–6, chạy song song Giai đoạn 4)

Theo mục 13 README (Kênh Nội dung & Mạng Xã hội):

- [ ] Viết SEO content: buying guide + comparison article cho từng category (Monitor, Keyboard, Mouse)
- [ ] **Facebook:** tạo Page, tham gia các group setup/bàn phím liên quan, lên lịch đăng bài review + chia sẻ deal/giá tốt
- [ ] **TikTok:** viết kịch bản 5–10 video ngắn đầu tiên (unbox, so sánh nhanh 2 sản phẩm, mẹo chọn thiết bị)
- [ ] **YouTube:** tạo kênh, sản xuất 3–5 video review chi tiết / so sánh đối đầu đầu tiên
- [ ] Gắn UTM riêng cho từng kênh (Facebook / TikTok / YouTube) để đo tỷ lệ Compare/Buy theo kênh
- [ ] Đảm bảo mọi CTA trong nội dung dẫn về đúng trang sản phẩm/so sánh liên quan (không dẫn chung về trang chủ)

## Giai đoạn 6 — Community & Launch (Tuần 6–7)

- [ ] Xác nhận lại kênh cộng đồng ưu tiên (Reddit, Twitter/X) — đã sơ bộ chốt ở phiên trước, cần xác nhận còn hiệu lực
- [ ] Soft launch nội bộ, thu thập feedback từ nhóm nhỏ (dev/remote worker quen biết)
- [ ] Public launch, theo dõi số liệu: traffic theo kênh, tỷ lệ Compare, tỷ lệ click-to-buy
- [ ] Lên kế hoạch vòng lặp cải thiện dựa trên số liệu launch (spec nào hay bị so sánh, category nào cần mở rộng trước)

## Việc mở — chưa chốt (theo dõi riêng)

- [ ] Công cụ Analytics
- [ ] Nguồn ảnh sản phẩm
- [ ] Redirect `/go/...` hay chỉ `onClick`
- [ ] Logo, typography, tone of voice chính thức (làm sau, không chặn launch)
- [ ] Kênh cộng đồng chính thức (Reddit / Twitter-X — cần xác nhận lại)
