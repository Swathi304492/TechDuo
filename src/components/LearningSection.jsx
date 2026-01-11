
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// 🧠 Topics from Basic → Advanced
const TOPICS = [
  // BASIC
  {
    id: "t-html",
    slug: "html-basics",
    title: "HTML Basics",
    level: "Basic",
    category: "Basic",
    description: "Structure the web with semantic tags and accessible markup.",
    example: "<header> <main> <footer> with alt text on images.",
  },
  {
    id: "t-css",
    slug: "css-basics",
    title: "CSS Basics",
    level: "Basic",
    category: "Basic",
    description: "Style pages with selectors, the box model, and flex/grid.",
    example: "Use Flexbox for navbars and Grid for complex layouts.",
  },
  {
    id: "t-js",
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    level: "Basic",
    category: "Basic",
    description: "Variables, functions, arrays/objects, DOM, and events.",
    example: "Add a click handler to toggle dark mode.",
  },
  {
    id: "t-git",
    slug: "git-basics",
    title: "Git Basics",
    level: "Basic",
    category: "Basic",
    description: "Version control: init, add, commit, branch, push, pull.",
    example: "Create a feature branch and open a PR.",
  },
  {
    id: "t-http",
    slug: "http-rest",
    title: "HTTP & REST",
    level: "Basic",
    category: "Basic",
    description: "HTTP methods, status codes, REST principles and endpoints.",
    example: "GET /api/users returns a list of users (200 OK).",
  },

  // INTERMEDIATE
  {
    id: "t-node",
    slug: "node-npm",
    title: "Node.js & NPM",
    level: "Intermediate",
    category: "Intermediate",
    description: "Runtime, modules, npm scripts, and package.json.",
    example: "npm run dev with nodemon for auto-restarts.",
  },
  {
    id: "t-express",
    slug: "express-basics",
    title: "Express Basics",
    level: "Intermediate",
    category: "Intermediate",
    description: "Routing, middleware, error handling, and responses.",
    example: "app.use(express.json()) and app.get('/api').",
  },
  {
    id: "t-jwt",
    slug: "jwt-auth",
    title: "JWT & Auth",
    level: "Intermediate",
    category: "Intermediate",
    description: "Stateless authentication with signed tokens.",
    example: "Authorization: Bearer <token> in protected routes.",
  },
  {
    id: "t-api-design",
    slug: "api-design",
    title: "API Design",
    level: "Intermediate",
    category: "Intermediate",
    description: "Versioning, resource modeling, pagination, rate limits.",
    example: "Use /v1 and next/prev links for paginated lists.",
  },
  {
    id: "t-docker",
    slug: "docker-fundamentals",
    title: "Docker Fundamentals",
    level: "Intermediate",
    category: "Intermediate",
    description: "Containerize apps for consistent environments.",
    example: "Dockerfile + docker-compose for local dev.",
  },

  // ADVANCED
  {
    id: "t-oauth",
    slug: "oauth2-oidc",
    title: "OAuth2 & OIDC",
    level: "Advanced",
    category: "Advanced",
    description: "Delegated authorization and OpenID Connect identity.",
    example: "Sign in with Google using Authorization Code flow.",
  },
  {
    id: "t-micro",
    slug: "microservices",
    title: "Microservices",
    level: "Advanced",
    category: "Advanced",
    description: "Service boundaries, API gateways, observability.",
    example: "Separate user-service and order-service with a gateway.",
  },
  {
    id: "t-cicd",
    slug: "ci-cd",
    title: "CI/CD",
    level: "Advanced",
    category: "Advanced",
    description: "Automated build, test, and deploy pipelines.",
    example: "Run tests on every PR and deploy main to staging.",
  },
  {
    id: "t-k8s",
    slug: "kubernetes-basics",
    title: "Kubernetes Basics",
    level: "Advanced",
    category: "Advanced",
    description: "Pods, deployments, services, and config maps.",
    example: "Scale deployments and expose via service objects.",
  },
];

export default function LearningSection() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All"); // All | Basic | Intermediate | Advanced

  const theme = {
    bg: "#f0fbff",
    card: "#e6f2ff",
    accent: "#9be7d9",
    accent2: "#a3c4f3",
    text: "#0e2a36",
    muted: "#50708a",
    chipBg: "#eafaf5",
    chipBorder: "#cdeee2",
  };

  const tabs = ["All", "Basic", "Intermediate", "Advanced"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOPICS.filter((t) => {
      const matchesTab = tab === "All" ? true : t.category === tab;
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [query, tab]);

  return (
    <div className="container py-5" style={{ background: theme.bg, borderRadius: 16 }}>
      <h2 className="fw-bold mb-2" style={{ color: theme.text }}>
        Study Modules
      </h2>
      <p className="mb-3" style={{ color: theme.muted }}>
        Learn from basics to advanced, topic-by-topic.
      </p>

      {/* Tabs */}
      <div className="d-flex gap-2 mb-3 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t}
            className="btn btn-sm fw-bold"
            onClick={() => setTab(t)}
            style={{
              background: tab === t ? theme.accent : "transparent",
              color: tab === t ? "#063a36" : theme.text,
              border: `2px solid ${theme.accent2}`,
              borderRadius: 999,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          className="form-control"
          placeholder="Search topics (e.g., 'Docker', 'JWT', 'REST')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            border: `1px solid ${theme.accent2}`,
            borderRadius: 12,
            background: "#ffffff",
            color: theme.text,
          }}
        />
      </div>

      {/* Cards */}
      <div className="row g-4">
        {filtered.map((t) => (
          <div key={t.id} className="col-md-6 col-lg-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{
                borderRadius: 16,
                background: `linear-gradient(180deg, ${theme.card}, #f1fbf7)`,
                border: `1px solid ${theme.accent2}`,
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span
                    className="badge fw-semibold"
                    style={{
                      background: theme.accent,
                      color: "#063a36",
                      border: `1px solid ${theme.chipBorder}`,
                    }}
                  >
                    {t.level}
                  </span>
                  <span className="small" style={{ color: theme.muted }}>{t.category}</span>
                </div>
                <h4 className="fw-bold mb-2" style={{ color: theme.text }}>{t.title}</h4>
                <p className="small mb-3" style={{ color: theme.muted }}>{t.description}</p>

                <div
                  className="mt-2 p-2 rounded"
                  style={{ background: theme.chipBg, border: `1px dashed ${theme.chipBorder}` }}
                >
                  <small className="fw-bold text-uppercase" style={{ fontSize: 10, color: theme.muted }}>
                    Example
                  </small>
                  <p className="mb-0 small fst-italic" style={{ color: theme.text }}>
                    "{t.example}"
                  </p>
                </div>
              </div>

              <div className="card-footer bg-white border-0 p-3 d-flex gap-2">
                {/* Same-tab: navigate via Link */}
                <Link
                  className="btn fw-bold w-100"
                  to={`/learn/${t.slug}`}
                  aria-label={`Start topic ${t.title}`}
                  style={{
                    background: theme.accent,
                    color: "#063a36",
                    borderRadius: 12,
                    border: `2px solid ${theme.accent2}`,
                  }}
                >
                  Start Topic
                </Link>

                {/* Optional: open the topic in a new tab
                <a
                  className="btn fw-bold w-100"
                  href={`/learn/${t.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "transparent",
                    color: theme.text,
                    borderRadius: 12,
                    border: `2px solid ${theme.accent2}`,
                  }}
                >
                  Open in New Tab
                </a> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          className="alert mt-3"
          role="status"
          style={{ background: theme.card, color: theme.text, border: `1px solid ${theme.accent2}` }}
        >
          No topics match your search. Try a different keyword or tab.
        </div>
      )}
    </div>
  );
}
