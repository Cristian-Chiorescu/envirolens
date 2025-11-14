import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <div>
          <h1>EnviroLens</h1>
          <p>Environmental Data Intelligence for Calgary</p>
          <p>
            Real-time air quality monitoring wit AI-powered compliance insights
          </p>
          <Link href="/dashboard">View Dashboard</Link>
          <div>
            <div>
              <h3>Live data</h3>
              <p>Real-time Calgary air quality metrics</p>
            </div>
            <div>
              <h3>AI Insights</h3>
              <p>Natural language explanations of environmental trends</p>
            </div>
            <div>
              <h3>Compliance Context</h3>
              <p>RConnect data to Alberta regulations</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
