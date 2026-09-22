# TODO — Triển khai StackDesk

Checklist triển khai cụ thể theo từng giai đoạn, bám theo kiến trúc mô tả trong [README.md](README.md). Đánh dấu `[x]` khi hoàn thành; các mục gắn nhãn **(quyết định)** là việc cần chốt trước khi làm tiếp, chưa có câu trả lời cuối cùng trong tài liệu hiện tại.

## Giai đoạn 0 — Nền tảng & Setup (Tuần 1)

- [x] Chốt base project / tech stack — **Astro + AstroWind** (islands cho Comparison Engine/Smart Finder/AI Advisor UI, server endpoints cho AI Advisor backend)
- [x] Khởi tạo repo, cấu trúc thư mục dự án — scaffold bằng `npm create astro@latest . -- --template onwidget/astrowind` (không tự tạo file tay), `git init`, commit đầu tiên, push lên `origin/dev` tại [github.com/phuthinh222/stackdesk](https://github.com/phuthinh222/stackdesk) (nhánh `dev`, chưa có `main`)
- [x] Đăng ký domain **stackdesk24.site** + kết nối hosting **Vercel** — đã đăng ký domain và link project trên Vercel dashboard. Lưu ý: `vercel.json` đã có sẵn từ template, `astro.config.ts` đang ở `output: 'static'` — khi làm AI Advisor (Giai đoạn 3) cần chuyển route `/api/*` sang `server`/`hybrid` với `@astrojs/vercel` adapter
- [x] Setup công cụ Analytics — **PostHog Cloud**: đã cài `posthog-js`, wiring xong trong `src/utils/analytics.ts` (`initAnalytics()` + `trackEvent()` sẵn cho Compare/Finder/AI Advisor/`/go/...` sau này) và `src/components/common/Analytics.astro` (chỉ nhúng script khi có `PUBLIC_POSTHOG_KEY`, dạng module deferred — đã build-test cả 2 trường hợp có/không key). **Còn lại việc của bạn:** tạo project trên [posthog.com](https://posthog.com) (chọn US hoặc EU Cloud), copy API key vào `.env` (copy từ `.env.example`) cho local, và thêm `PUBLIC_POSTHOG_KEY`/`PUBLIC_POSTHOG_HOST` vào Environment Variables trên Vercel dashboard cho production
- [x] Dựng design system tạm thời — đổi theo đúng quy trình chính thức của AstroWind (`.agents/skills/styling.md`): màu primary/secondary → **Indigo**, accent → **Amber** trong `src/components/CustomStyles.astro` (light + dark); thêm font **JetBrains Mono** cho spec sản phẩm qua Astro Fonts API (`astro.config.ts` + `Layout.astro` + `--font-mono` trong `tailwind.css`), giữ **Inter** cho sans/heading. Đã build-test: cả 2 font tự host đúng, màu áp dụng đúng cả 2 theme. Layout cơ bản (spacing/grid) giữ nguyên mặc định AstroWind — chưa cần chỉnh vì chưa có trang sản phẩm thực (Giai đoạn 1-2)

## Giai đoạn 1 — Data & Content Architecture (Tuần 1–2)

- [x] Định nghĩa schema `Product Data Node` bằng Zod — [src/lib/schema/product.ts](src/lib/schema/product.ts): `productSchema = z.discriminatedUnion('category', [monitor, keyboard, mouse])`, mỗi nhánh gồm Identity/Tags/UseCases/Editorial/Commerce dùng chung + `specifications` riêng theo category. Wired vào Content Collection `products` trong `src/content.config.ts` (đọc từ `src/data/products/{monitors,keyboards,mice}/*.md`). Đã build-test cả 2 chiều: data hợp lệ build qua, data sai field bị Zod chặn đúng với thông báo lỗi rõ ràng. **Lưu ý thiết kế:** `Scoring` không nằm trong schema này — để dành cho scoring engine tính toán (Giai đoạn 3), tránh 2 nguồn sự thật; `ID`/`Slug` của Identity dùng `id` do content collection tự sinh từ đường dẫn file, không lặp lại trong frontmatter
- [x] Viết discriminated union schema riêng cho từng category — làm cùng lúc với mục Zod schema ở trên (không tách rời được): `monitorProductSchema` / `keyboardProductSchema` / `mouseProductSchema` trong [src/lib/schema/product.ts](src/lib/schema/product.ts)
- [x] Thiết kế công thức Use-case Score (Programming, Gaming, Office, Design) cho từng category — 2 file công khai, tách rời rõ ràng theo mục 9 README (Raw Spec → Derived Metrics → Assessment → Context Score):
  - [src/lib/scoring/deriveMetrics.ts](src/lib/scoring/deriveMetrics.ts): `deriveMonitorFactors`/`deriveKeyboardFactors`/`deriveMouseFactors` — chuyển spec thô thành factor 0–10 có tên rõ ràng (textClarity, screenArea, typingComfort, precision...)
  - [src/lib/scoring/useCaseScore.ts](src/lib/scoring/useCaseScore.ts): `computeUseCaseScores(product)` — trọng số từng use-case export công khai dạng const (`MONITOR_WEIGHTS`/`KEYBOARD_WEIGHTS`/`MOUSE_WEIGHTS`), mỗi bộ trọng số cộng đúng 1.0, không có hệ số ẩn
  - **Sửa lại quyết định trước đó:** `useCases` đã bỏ khỏi schema Zod (không nhập tay nữa) — README mục 9 nói rõ Use Case Score là *kết quả tính toán*, không phải data nhập tay. 3 fixture đã cập nhật theo (bỏ block `useCases:`)
  - Đã verify bằng script chạy thật (không chỉ type-check): phát hiện + sửa 1 lỗi công thức (precision chuột dùng thang DPI gaming 20000 làm mouse productivity bị điểm quá thấp) trước khi chốt
- [x] Chốt nguồn ảnh sản phẩm — **hotlink từ retailer (Amazon)**, không tự chụp. Khớp sẵn với affiliate Amazon Associates ở Giai đoạn 4, không cần pipeline lưu trữ/tải ảnh. Đã thêm field `images` vào schema ([src/lib/schema/product.ts](src/lib/schema/product.ts)): `{ url, alt, source }`, `source` mặc định `retailer-hotlink`, vẫn chừa `press-kit` cho trường hợp hiếm cần tự host ảnh brand. 3 fixture đã cập nhật theo, build/check sạch
- [x] Thu thập & nhập dữ liệu mẫu — **15 sản phẩm thật** (5/category) từ data user research, map vào schema. `astro check` + `build` sạch, tất cả pass Zod validation.
  - Monitors: Dell UltraSharp U2724DE, ASUS ProArt PA278CV, LG UltraGear 27GR83Q-B, BenQ RD280U, GIGABYTE M27Q Rev 2.0
  - Keyboards: Keychron Q1 Max, Logitech MX Keys S, NuPhy Air75 V2, Wooting 60HE+, MoErgo Glove80
  - Mice: Logitech MX Master 3S, Razer Viper V3 Pro, Logitech Lift Vertical, Keychron M3 Mini 4K, Apple Magic Mouse (USB-C)
  - Đã thêm field `hasKvm` (monitor) + enum `IPS Black` vào schema vì đây là tín hiệu thật xuất hiện trong data
  - **`scores` do user cung cấp bị bỏ** — theo kiến trúc đã chốt, điểm số tính từ `computeUseCaseScores()`, không nhập tay
  - **Cần bạn review lại:** (1) `images` toàn bộ là placeholder placehold.co, chưa có ảnh thật — cần lấy URL ảnh thật từ từng trang Amazon; (2) 1 vài field không có trong data gốc (`backlighting`, `gripStyle`, `sensorType` phần lớn, ergonomics chi tiết) được điền theo kiến thức sản phẩm chung, đã đánh dấu bằng comment ở đầu mỗi file cần double-check; (3) **Wooting 60HE+ dùng chung URL Amazon với GIGABYTE M27Q** (nghi ngờ lỗi copy-paste trong data gốc) — cần link đúng

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
