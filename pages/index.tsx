import { useState } from "react";

export default function Home() {

  const [image, setImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  async function run() {

    setStatus("🧠 AI analyzing product...");

    const r1 = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ image })
    });

    const { dna } = await r1.json();

    setStatus("🧬 generating 50 variants...");

    const r2 = await fetch("/api/mutate", {
      method: "POST",
      body: JSON.stringify({ dna })
    });

    const variants = await r2.json();

    setStatus("🎨 rendering images...");

    const results = [];

    for (let v of variants) {

      const r = await fetch("/api/render", {
        method: "POST",
        body: JSON.stringify({ variant: v, dna })
      });

      const img = await r.json();
      results.push(img.image);
    }

    setImages(results);
    setStatus("✅ done");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🧬 AI Product Design Studio</h1>

      <input
        placeholder="粘贴图片URL（下一步我帮你升级上传）"
        onChange={(e) => setImage(e.target.value)}
        style={{ width: "100%" }}
      />

      <button onClick={run} style={{ marginTop: 20 }}>
        Generate 50 Products
      </button>

      <p>{status}</p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 10
      }}>
        {images.map((img, i) => (
          <img key={i} src={img} width="100%" />
        ))}
      </div>

    </div>
  );
}
