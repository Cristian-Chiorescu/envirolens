# EnviroLens

**Environmental Intelligence Platform for Calgary Consultants**

EnviroLens is a full-stack web application that combines real-time air quality monitoring, AI-powered compliance guidance, and searchable project knowledge to accelerate environmental consulting decision-making in Calgary, Alberta.

[Live Demo](https://envirolens.vercel.app) • [Documentation](#documentation) • [Technical Details](#architecture)

---

## 🎯 Project Origin

This project was built as a prototype implementation of a "consulting memory system" concept - a tool that helps environmental consultants at firms like Corvus Consulting instantly access relevant past work based on current conditions.

**The Challenge:** Environmental consulting knowledge often exists in scattered reports, individual memories, and isolated systems. When air quality conditions change or new compliance questions arise, consultants must manually recall similar past projects.

**The Solution:** EnviroLens contextually surfaces relevant institutional knowledge by connecting three key elements:

- **Current environmental conditions** (real-time Calgary air quality)
- **Regulatory compliance context** (AI assistant explaining implications)
- **Past project experience** (knowledge base of similar work)

---

## ✨ Key Features

### 📊 Real-Time Air Quality Dashboard

- Live Calgary air quality data from AQICN API
- AQI metrics with pollutant breakdowns (PM2.5, PM10, NO₂, O₃, CO)
- 24-hour trend visualization
- Health risk indicators and recommendations
- Responsive charts using Recharts

### 🤖 AI Compliance Assistant

- Floating chat interface powered by OpenAI GPT-3.5-turbo
- Contextually aware of current air quality conditions
- Explains Alberta regulations (TIER, EPEA, OBPS, NPRI)
- References relevant past projects
- Natural language interaction with conversation memory
- Available on all pages

### 📁 Contextual Project Knowledge Base

- Database of past consulting projects
- Smart filtering by sector, regulation, and air quality conditions
- Projects automatically highlighted when relevant to current AQI
- Detailed case studies with problem/approach/outcome/lessons learned
- Demonstrates knowledge management principles

---

## 🛠️ Tech Stack

**Frontend:**

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS (with OKLCH color space)
- Recharts for data visualization

**Backend:**

- Next.js API Routes (serverless)
- OpenAI API (GPT-5-nano)
- AQICN Air Quality API

**Development:**

- ESLint
- Git/GitHub
- Vercel (deployment)

---

## 🏗️ Architecture

### Data Flow

```
┌─────────────────────────────────────────────────┐
│              EnviroLens Platform                │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Client] Browser                               │
│     │                                           │
│     ├─► Dashboard Page                          │
│     ├─► Projects Page                           │
│     └─► Floating AI Chat                        │
│           │                                     │
│           ▼                                     │
│  [API Routes] Next.js Serverless Functions      │
│     │                                           │
│     ├─► /api/air-quality                        │
│     │      └─► AQICN API (Calgary data)         │
│     │                                           │
│     └─► /api/ai-assistant                       │
│            ├─► Current air quality context      │
│            ├─► Relevant projects context        │
│            └─► OpenAI API (GPT-3.5-turbo)       │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Component Structure

```
app/
├── api/
│   ├── air-quality/route.ts    # Fetches Calgary air quality
│   └── ai-assistant/route.ts   # OpenAI integration
├── dashboard/page.tsx          # Main dashboard view
├── projects/page.tsx           # Knowledge base view
└── layout.tsx

components/
├── DashboardLayout.tsx         # Shared layout with nav
├── FloatingAIChat.tsx          # AI assistant UI
├── MetricCard.tsx              # Dashboard metric displays
├── AQIStatusBanner.tsx         # Health risk indicator
├── AQITrendChart.tsx           # Line chart component
├── PollutantChart.tsx          # Bar chart component
├── ProjectCard.tsx             # Project display card
├── ProjectFilters.tsx          # Filter controls
├── LoadingState.tsx            # Loading UI
├── ErrorState.tsx              # Error handling UI
└── RegulatoryContext.tsx       # Static regulation info

data/
└── consultingProjects.ts       # Seed data for knowledge base

types/
└── index.ts                    # TypeScript type definitions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- AQICN API token ([Get one here](https://aqicn.org/data-platform/token/))

### Installation

1. **Clone the repository**

```bash
   git clone https://github.com/Cristian-Chiorescu/envirolens.git
   cd envirolens
```

2. **Install dependencies**

```bash
   npm install
```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

```bash
   AQICN_API_TOKEN=your_aqicn_token_here
   OPENAI_API_KEY=your_openai_key_here
   NEXT_PUBLIC_APP_NAME=EnviroLens
```

4. **Run the development server**

```bash
   npm run dev
```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

---

## 🎨 Design Decisions

### Why Next.js?

- **API Routes**: Keeps API keys secure on the server
- **Server Components**: Optimized data fetching where appropriate
- **File-based routing**: Clean, intuitive structure
- **Vercel deployment**: One-click deployment with excellent DX

### Why OKLCH Color Space?

- **Perceptual uniformity**: Colors appear more consistent across the spectrum
- **Better interpolation**: Smoother gradients and transitions
- **Future-proof**: Modern CSS color space with growing browser support

### Why Contextual Projects?

Rather than a generic project list, the knowledge base intelligently surfaces relevant past work based on current air quality conditions. This demonstrates:

- Systems thinking (how pieces connect)
- User empathy (what consultants actually need)
- Technical implementation (filtering algorithms)

### AI Integration Strategy

The AI assistant receives:

1. **Current air quality data**: Enables specific, relevant responses
2. **Relevant projects**: Allows referencing institutional knowledge
3. **Conversation history**: Maintains context across messages

This creates a genuinely useful tool rather than a generic chatbot.

---

## 📖 Key Learning Outcomes

This project demonstrates:

✅ **Full-stack development** - Frontend, backend, API integration  
✅ **TypeScript proficiency** - Comprehensive type safety  
✅ **Modern React patterns** - Hooks, client/server components, state management  
✅ **API design** - RESTful endpoints, error handling, data transformation  
✅ **AI integration** - Prompt engineering, context management, conversation memory  
✅ **Data visualization** - Recharts configuration, responsive design  
✅ **UX thinking** - Contextual information delivery, floating UI patterns  
✅ **Clean architecture** - Component separation, reusability, maintainability

---

## 🔮 Future Enhancements

**Phase 1: Data Improvements**

- [ ] Historical air quality data storage
- [ ] Real-time data refresh with WebSockets
- [ ] Multiple monitoring stations across Calgary
- [ ] Export data to CSV/PDF

**Phase 2: AI Enhancements**

- [ ] Vector database for semantic project search
- [ ] RAG (Retrieval Augmented Generation) for better project referencing
- [ ] Multi-turn conversation with project deep-dives
- [ ] Upgrade to GPT-4 for more sophisticated analysis

**Phase 3: Knowledge Management**

- [ ] User authentication and project uploads
- [ ] Collaborative tagging and annotations
- [ ] Project relationships and dependencies
- [ ] Full-text search across project documents

**Phase 4: Analytics**

- [ ] Predictive air quality modeling
- [ ] Compliance risk scoring
- [ ] Automated report generation
- [ ] Dashboard customization

---

## 🧪 Testing

**Manual Testing Checklist:**

- [x] Dashboard loads with real Calgary data
- [x] AI assistant responds appropriately to queries
- [x] Projects filter by sector and regulation
- [x] Relevant projects highlighted based on AQI
- [x] Navigation works across all pages
- [x] Mobile responsive design
- [x] Error states handle gracefully
- [x] Loading states display correctly

**API Fallbacks:**

- Air quality API: Returns mock data if fetch fails
- OpenAI API: Shows error message if quota exceeded

---

## 📊 Performance

**Lighthouse Scores (Desktop):**

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Key Optimizations:**

- Server-side data caching (5-minute revalidation)
- Component code splitting
- Optimized images and fonts
- Minimal JavaScript bundle

---

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:

- Open an issue for bugs or feature requests
- Fork the repo and experiment
- Reach out with questions or ideas

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Cristian Chiorescu**

- Portfolio: [cristianchiorescu.com](https://cristianchiorescu.com)
- LinkedIn: [linkedin.com/in/cristianchiorescu](https://linkedin.com/in/cristianchiorescu)
- GitHub: [@Cristian-Chiorescu](https://github.com/Cristian-Chiorescu)

---

## 🙏 Acknowledgments

- **AQICN** for air quality data API
- **OpenAI** for GPT-5-nano API access
- **Corvus Consulting** for the inspiration
- **Recharts** for beautiful, composable charts
- **Vercel** for seamless deployment

---

## 📸 Screenshots

### Dashboard

![Dashboard showing real-time Calgary air quality metrics, charts, and health indicators](/dashboard.png)

### AI Assistant

![Floating chat interface with AI providing compliance guidance](/ai-chat.png)

### Projects Knowledge Base

![Filterable project cards with contextual highlighting based on current conditions](/projects.png)

---

**Built with ❤️ in Calgary, Alberta**

_Developed over 5 days as a technical demonstration of full-stack development, AI integration, and knowledge management principles._
