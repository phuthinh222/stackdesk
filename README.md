# STACKDESK — DỰ ÁN NỀN TẢNG PRODUCT INTELLIGENCE & DISCOVERY

## 1. Tổng quan Dự án (Project Overview)

StackDesk là **Nền tảng Khám phá, So sánh và Tư vấn Sản phẩm Công nghệ** (Product Discovery & Intelligence Platform) được thiết kế chuyên biệt cho Lập trình viên (Developers), Remote Workers, Tech Enthusiasts và những người muốn tối ưu hóa không gian làm việc (Workspace Setup).

Khác biệt hoàn toàn với các website review công nghệ truyền thống hay blog Affiliate đơn thuần, StackDesk hoạt động như một **Hệ thống Hỗ trợ Ra Quyết định** (Decision-Support Engine) giúp người dùng tự tin chọn đúng sản phẩm theo nhu cầu cá nhân.

```text
[ Discover ] ──> [ Understand ] ──> [ Compare ] ──> [ Choose ] ──> [ Buy ]
```

## 2. Bài toán Thị trường (Problem Statement)

Thị trường thiết bị công nghệ hiện nay bị quá tải thông tin (Information Overload) và thiếu ngữ cảnh ứng dụng (Lack of Contextual Meaning):

- **Sự bùng nổ Thông số Kỹ thuật (Raw Specs):** Người dùng đối mặt với hàng loạt thông số phức tạp (27", 1440p, IPS, 180Hz, USB-C 90W PD, KVM Switch). Thông số cao hơn không đồng nghĩa với việc sản phẩm đó phù hợp hơn.
- **Sự đứt gãy giữa "Thông số" và "Ngữ cảnh sử dụng":** Một màn hình có độ sáng cao chưa chắc đã tốt cho người gõ code ban đêm; một bàn phím cơ đắt tiền chưa chắc đã phù hợp với môi trường văn phòng yên tĩnh.
- **Trải nghiệm Review Rời rạc:** Các nội dung đánh giá hiện nay mang tính định tính, thiếu cấu trúc dữ liệu để so sánh đối đầu (Head-to-head) hoặc lọc đa tiêu chí (Multi-criteria Filtering).

## 3. Mục tiêu Chiến lược (Strategic Goals)

```text
Nhu cầu (User Intent)
        ↓
Tiêu chí (Normalized Criteria)
        ↓
Sản phẩm Phù hợp (Product Matching)
        ↓
So sánh Đối đầu (Explainable Comparison)
        ↓
Quyết định Mua sắm (Confident Decision)
```

- **Đơn giản hóa Quá trình Ra Quyết định:** Rút ngắn thời gian nghiên cứu từ nhiều ngày xuống còn vài phút thông qua các công cụ lọc và so sánh trực quan.
- **Chuyển hóa Dữ liệu thành Tri thức (Raw Data → Product Intelligence):** Chuẩn hóa toàn bộ thông số kỹ thuật thành các chỉ số đánh giá theo ngữ cảnh thực tế (Programming, Gaming, MacBook Setup, Productivity, Ergonomics).
- **Cá nhân hóa bằng AI (Assisted Personalization):** Xây dựng AI Product Advisor có khả năng dịch ngôn ngữ tự nhiên của người dùng thành các truy vấn có cấu trúc (Structured Queries), kết hợp với thuật toán tư vấn minh bạch (Deterministic Recommendation Engine).

## 4. Phân khúc Khách hàng Mục tiêu (User Personas)

| Phân khúc | Đặc điểm & Nhu cầu Cốt lõi | Sản phẩm Trọng tâm |
| --- | --- | --- |
| **Developer / Programmer** | Chú trọng độ nét văn bản (Text Clarity), khả năng tương thích macOS/Linux, gõ phím thoải mái (Ergonomics), kết nối USB-C/Thunderbolt. | Monitor, Mechanical Keyboard, Mouse |
| **Remote Worker** | Tối ưu năng suất (Productivity), thiết bị gọn gàng, độ bền cao, giá trị sử dụng trên chi phí (Value for Money). | Desk setup, Webcam, Headset, Chair |
| **Tech Enthusiast** | Đòi hỏi sâu về thông số (Detailed Specs), hiệu năng tối đa, tính năng mới nhất, thích so sánh chuyên sâu. | Custom Hardware, High-end Peripherals |
| **Workspace Builder** | Tìm kiếm sự đồng bộ về thẩm mỹ (Minimalist/Aesthetic), quản lý dây cáp (Cable Management), giải pháp trọn bộ. | Curated Bundles, Desk Mats, Accessories |

## 5. Phạm vi Sản phẩm (Product Scope)

StackDesk triển khai theo chiến lược **Tập trung & Mở rộng Dần** (Iterative Expansion):

**Giai đoạn Đột phá (Core Catalog):** Focus 100% vào 3 nhóm sản phẩm thiết yếu của không gian làm việc:

- **Monitors:** Đánh giá sâu về Panel, Resolution, Refresh Rate, Color Accuracy, USB-C Power Delivery, Eye Care.
- **Keyboards:** Layout, Switch Type, Connectivity, Ergonomics, Customizability.
- **Mice:** Sensor, Weight, Ergonomics, Battery Life, Productivity Features.

**Giai đoạn Mở rộng (Future Catalog):** Desk Accessories, Lighting, Audio, Ergonomic Chairs, Cable Management Kits, Curated Setup Bundles.

## 6. Bốn Lớp Giá trị Cốt lõi (Value Stack)

```text
                     [ Decision ]
                          ▲
                          │
             [ Product Recommendation ]
                          ▲
                          │
             [ Product Comparison ]
                          ▲
                          │
             [ Product Intelligence ]
                          ▲
                          │
              [ Product Information ]
```

- **Product Information (Lớp Thông tin):** Dữ liệu sản phẩm thô được thu thập, làm sạch và cấu trúc hóa chuẩn xác.
- **Product Intelligence (Lớp Tri thức):** Diễn giải thông số kỹ thuật thành điểm số và nhận xét theo từng ngữ cảnh sử dụng thực tế.
- **Product Comparison (Lớp So sánh):** So sánh trực quan sự khác biệt có ý nghĩa giữa các sản phẩm (không chỉ so sánh con số).
- **Product Recommendation (Lớp Đề xuất):** Thuật toán khớp nối chính xác giữa Yêu cầu Người dùng và Đặc tính Sản phẩm.

## 7. Hành trình Người dùng (User Journey)

1. **Discover:** Tiếp cận qua Google SEO (Buying Guides, Comparison Articles), Social Sharing hoặc các công cụ Finder trên StackDesk.
2. **Understand:** Đọc tóm tắt ưu/nhược điểm (Pros/Cons), đánh giá biên tập (Editorial Verdict) và các điểm số use-case.
3. **Compare:** Chọn 2-4 sản phẩm để đối sánh trực tiếp về tính năng, độ tương thích và chênh lệch giá.
4. **Choose:** Sử dụng Bộ lọc Thông minh (Smart Finder) hoặc AI Advisor để nhận danh sách đề xuất kèm lý do ("Why this match").
5. **Buy:** Chuyển hướng sang nhà bán hàng phù hợp (Amazon, Shopify Store, Local Authorized Dealers) để hoàn tất thanh toán.

## 8. Kiến trúc Dữ liệu Sản phẩm (Product Data Architecture)

Để phục vụ cho toàn bộ tính năng ở mọi giai đoạn, dữ liệu sản phẩm của StackDesk được thiết kế theo mô hình **Unified Normalized Schema**:

```text
Product Data Node
 ├── Identity       (ID, Slug, Name, Brand, SKU)
 ├── Category       (Monitor, Keyboard, Mouse)
 ├── Specifications (Discriminated Union Schema by Category)
 ├── Tags           (#macbook-setup, #budget-under-300, #minimalist)
 ├── Use Cases      (Scores: Programming, Gaming, Office, Design)
 ├── Editorial      (Verdict, Summary, Pros, Cons, Best For)
 ├── Scoring        (Weighted Formula Score)
 └── Commerce       (Provider, Type: Affiliate/Direct, Price, Status)
```

## 9. Product Intelligence Framework

Chuyển đổi thông số kỹ thuật thành giá trị sử dụng bằng chuỗi chuyển đổi dữ liệu 4 bước rõ ràng nhằm đảm bảo độ tin cậy tuyệt đối:

```text
Raw Specification ──> Derived Metrics ──> Assessment ──> Context Score
```

**Quy trình tính điểm minh bạch (Ví dụ cho Monitor):**

- **Raw Specification:** 27 inch + 2560 × 1440
- **Derived Metrics:** 109.2 PPI (Pixel Density), 16:9 Aspect Ratio
- **Assessment:** High Text Clarity (Độ nét chữ cao, hiển thị mã nguồn không bị vỡ font hay đau mắt)
- **Context Score:** Đóng góp vào Programming Score dựa trên công thức tổng hợp trọng số giữa Text Clarity, Screen Area, Ergonomics, và Connectivity.

## 10. Hệ thống So sánh Sản phẩm (Comparison Engine)

Mục tiêu của Engine so sánh là trả lời câu hỏi: *"Sự khác biệt 50 USD giữa sản phẩm A và B mang lại giá trị thực tế gì?"*

- **Head-to-head Spec Matrix:** So sánh dòng-kế-dòng các thuộc tính kỹ thuật.
- **Use-Case Comparison:** So sánh trực quan biểu đồ năng lực theo từng nhu cầu.
- **Trade-off Analysis:** Làm rõ cái giá phải trả khi chọn sản phẩm này thay vì sản phẩm khác (Ví dụ: "Đổi lấy màn hình 180Hz mượt hơn, bạn sẽ mất cổng kết nối USB-C").

## 11. Hệ thống Đề xuất & Minh bạch (Recommendation Engine)

```text
User Requirements  +  Product Intelligence  ──>  Engine Matching  ──>  Explainable Recommendation
```

Hệ thống đề xuất tuân thủ nghiêm ngặt 4 nguyên tắc:

- **Có cơ sở (Evidence-based):** Đề xuất dựa trên dữ liệu thật, không xếp hạng dựa trên hoa hồng affiliate.
- **Có thể giải thích (Explainable UX):** Hiển thị rõ lý do tại sao sản phẩm đạt điểm cao ("Khuyên dùng vì: Có USB-C 90W sạc MacBook + Tấm nền IPS hiển thị chữ sắc nét").
- **Thuật toán trọng số (Deterministic Matching):** Sử dụng công thức tính điểm trọng số công khai thay vì thuật toán hộp đen (Black-box), giúp trả về các sản phẩm phù hợp nhất dựa trên các tiêu chí đã xác định.
- **Mở rộng Linh hoạt (Scalable):** Dễ dàng thêm category mới mà không gãy hệ thống logic cũ.

## 12. Tích hợp AI Advisor (AI-Assisted Personalization)

AI đóng vai trò là **Natural Language Interface**, không đóng vai trò là Search Engine hay Recommendation Engine trực tiếp.

```text
[User Prompt]
      ↓
[LLM Understanding] ──> Expose Intent ──> [Structured Query (JSON)]
                                                   ↓
                                         [Zod Schema Validation]
                                                   ↓
                                     [Deterministic Match Engine]
                                                   ↓
                                    [Ranked Results + Explanations]
```

**Luồng xử lý mẫu:**

**User Prompt:** *"Tìm cho tôi màn hình khoảng $300 dùng gõ code, lâu lâu chơi game nhẹ, đang xài MacBook Pro."*

**LLM Output (Structured Query):**

```json
{
  "category": "monitor",
  "budget": { "max": 350 },
  "useCases": ["programming", "gaming"],
  "requirements": { "hasUsbC": true, "resolution": "1440p" },
  "priorities": { "textClarity": 0.9, "macCompatibility": 0.9 }
}
```

**StackDesk Engine:** Filter catalog dựa trên JSON → Tính điểm trọng số → Trả về các sản phẩm phù hợp nhất kèm lý do giải thích rõ ràng.

## 13. Kênh Nội dung & Mạng Xã hội (Social & Content Distribution)

Bên cạnh SEO (Google), StackDesk mở rộng tầng **Discover** bằng cách kết hợp trực tiếp với các nền tảng mạng xã hội để tiếp cận đúng persona (Developer, Remote Worker, Tech Enthusiast, Workspace Builder) tại nơi họ đang xem nội dung hằng ngày, đồng thời dẫn traffic có ngữ cảnh về StackDesk để Compare/Choose/Buy.

```text
[ Facebook / TikTok / YouTube ] ──> [ Content có ngữ cảnh ] ──> [ StackDesk (Compare / Finder / AI Advisor) ] ──> [ Buy ]
```

| Kênh | Vai trò trong Funnel | Dạng nội dung chính | Mục tiêu |
| --- | --- | --- | --- |
| **Facebook** | Cộng đồng & retention | Bài review dạng post, chia sẻ deal/giá tốt, đăng trong các group Setup/Gõ phím/Workspace, livestream Q&A | Xây dựng cộng đồng, traffic nhắc lại (return visits) |
| **TikTok** | Discover nhanh, viral | Video ngắn 15–60s: unbox, so sánh nhanh 2 sản phẩm, "3 lỗi khi chọn màn hình lập trình", theo trend | Tiếp cận mới (reach), tạo nhận diện thương hiệu |
| **YouTube** | Educate sâu, trust-building | Video dài: review chi tiết, so sánh đối đầu (head-to-head), hướng dẫn build setup, Shorts tóm tắt | Chuyển đổi (Understand → Compare), SEO phụ trợ qua video |

**Nguyên tắc tích hợp:**

- **Một nguồn dữ liệu, nhiều định dạng:** Nội dung trên cả 3 kênh đều bắt nguồn từ Product Intelligence & Editorial data sẵn có trên StackDesk (Verdict, Pros/Cons, Use-case Score), không tạo nội dung tách biệt để tránh sai lệch thông tin.
- **Điều hướng có ngữ cảnh (Contextual CTA):** Mỗi video/post dẫn về đúng trang sản phẩm, bảng so sánh hoặc Finder tương ứng với nội dung đang nói tới — không dẫn chung chung về trang chủ.
- **Đo lường theo kênh:** Gắn UTM/tracking riêng cho Facebook, TikTok, YouTube để đánh giá kênh nào tạo ra traffic chất lượng (tỷ lệ Compare/Buy), phục vụ việc phân bổ ngân sách nội dung.
- **Tần suất tối thiểu (giai đoạn đầu):** Ưu tiên YouTube + TikTok cho awareness sản phẩm mới, Facebook cho duy trì cộng đồng và chia sẻ lại nội dung đã có — tránh dàn trải nguồn lực khi mới launch.
