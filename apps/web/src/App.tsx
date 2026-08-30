import { useEffect, useRef, useState } from "react";
import type { Game } from "@idlerpg/core";
import { buildContentRegistry, loadGame, resetSave } from "./game/loader.js";

interface View {
  realmName: string;
  current: number;
  cap: number;
  activityName: string | null;
}

const content = buildContentRegistry();
const firstActivity = content.activities[0];

export default function App() {
  const [view, setView] = useState<View | null>(null);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const gameRef = useRef<Game | null>(null);
  const saveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    let unsubscribe: (() => void) | undefined;
    let onUnload: (() => void) | undefined;

    loadGame()
      .then(({ game, saveStore }) => {
        if (cancelled) return;
        gameRef.current = game;
        saveRef.current = () => {
          void saveStore.save(game.snapshot());
        };

        const render = () => {
          const realm = game.currentRealm();
          const progress = game.progress();
          const activity = game.activeActivity();
          setView({
            realmName: realm.name,
            current: progress.current,
            cap: progress.cap,
            activityName: activity?.name ?? null,
          });
        };

        game.sync(); // settle the offline gap on load
        render();
        unsubscribe = game.subscribe(render);
        timers.push(window.setInterval(() => game.sync(), 1000));
        timers.push(window.setInterval(() => saveRef.current?.(), 5000));
        onUnload = () => saveRef.current?.();
        window.addEventListener("beforeunload", onUnload);
        setReady(true);
      })
      .catch((error: unknown) => {
        if (!cancelled) setLoadError(String(error));
      });

    return () => {
      cancelled = true;
      for (const t of timers) window.clearInterval(t);
      unsubscribe?.();
      if (onUnload) window.removeEventListener("beforeunload", onUnload);
      saveRef.current?.();
    };
  }, []);

  const toggleActivity = () => {
    const game = gameRef.current;
    if (!game || !firstActivity) return;
    if (game.activeActivity()) game.stopActivity();
    else game.startActivity(firstActivity.id);
  };

  if (loadError) {
    return (
      <main style={{ maxWidth: 480, margin: "48px auto", fontFamily: "system-ui, sans-serif" }}>
        <p>存档加载失败：{loadError}</p>
        <button
          onClick={() => {
            void resetSave().then(() => window.location.reload());
          }}
          style={{ padding: "8px 24px", fontSize: 16 }}
        >
          重置存档并重试
        </button>
      </main>
    );
  }

  if (!ready || !view) return <p>加载中……</p>;

  const percent = Math.min(100, (view.current / view.cap) * 100).toFixed(1);

  return (
    <main style={{ maxWidth: 480, margin: "48px auto", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 24 }}>IdleRPG</h1>
      <section style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
        <p>当前境界：{view.realmName}</p>
        <p>
          进度：{view.current} / {view.cap}（{percent}%）
        </p>
        <p>进行中：{view.activityName ?? "无"}</p>
        <button onClick={toggleActivity} style={{ padding: "8px 24px", fontSize: 16 }}>
          {view.activityName ? "停止" : (firstActivity?.name ?? "开始")}
        </button>
      </section>
    </main>
  );
}
