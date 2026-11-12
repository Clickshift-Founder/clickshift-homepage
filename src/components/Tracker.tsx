"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Sends one page view per route, then time on page and scroll depth (see app/api/collect/route.ts).
// No cookies. A random visitor id in localStorage, a session id in sessionStorage (new after 30 idle minutes).
// Respects Do Not Track and Global Privacy Control: if either is on, nothing is sent.

const IDLE_MS = 30 * 60_000;

function store(kind: "local" | "session") {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function rid() {
  try {
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}

function ids() {
  const ls = store("local");
  const ss = store("session");
  let vid = ls?.getItem("cs_vid") ?? null;
  const isNew = !vid;
  if (!vid) {
    vid = rid();
    ls?.setItem("cs_vid", vid);
  }
  const now = Date.now();
  let sid = ss?.getItem("cs_sid") ?? null;
  const last = Number(ss?.getItem("cs_last") ?? 0);
  if (!sid || now - last > IDLE_MS) {
    sid = rid();
    ss?.setItem("cs_sid", sid);
  }
  ss?.setItem("cs_last", String(now));
  return { vid, sid, isNew };
}

function optedOut() {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean; msDoNotTrack?: string };
  return n.doNotTrack === "1" || n.msDoNotTrack === "1" || n.globalPrivacyControl === true;
}

export default function Tracker() {
  const pathname = usePathname();
  const first = useRef(true);
  const current = useRef<{ id: number | null; vid: string; start: number; visible: number; since: number; scroll: number } | null>(null);

  useEffect(() => {
    if (optedOut() || pathname.startsWith("/admin")) return;

    const send = (body: object, beacon = false) => {
      const data = JSON.stringify(body);
      if (beacon && navigator.sendBeacon) {
        navigator.sendBeacon("/api/collect", data);
        return Promise.resolve(null);
      }
      return fetch("/api/collect", { method: "POST", body: data, keepalive: true, headers: { "Content-Type": "text/plain" } })
        .then((r) => (r.ok && r.status === 200 ? r.json() : null))
        .catch(() => null);
    };

    const elapsed = (c: NonNullable<typeof current.current>) => c.visible + (document.visibilityState === "visible" ? Date.now() - c.since : 0);
    const ping = (beacon: boolean) => {
      const c = current.current;
      if (!c?.id) return;
      send({ t: "ping", id: c.id, vid: c.vid, ms: elapsed(c), scroll: c.scroll }, beacon);
    };

    const { vid, sid, isNew } = ids();
    const q = new URLSearchParams(window.location.search);
    const rec = { id: null as number | null, vid, start: Date.now(), visible: 0, since: Date.now(), scroll: 0 };
    current.current = rec;
    send({
      t: "pv",
      vid,
      sid,
      isNew: isNew && first.current,
      path: pathname,
      ref: first.current ? document.referrer : "",
      us: q.get("utm_source") ?? q.get("ref") ?? undefined,
      um: q.get("utm_medium") ?? undefined,
      uc: q.get("utm_campaign") ?? undefined,
    }).then((r) => {
      if (r && typeof r.id === "number") rec.id = r.id;
    });
    first.current = false;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 100;
      if (pct > rec.scroll) rec.scroll = pct;
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") {
        rec.visible += Date.now() - rec.since;
        rec.since = Date.now();
        ping(true);
      } else {
        rec.since = Date.now();
      }
    };
    const onHide = () => ping(true);
    const beat = window.setInterval(() => document.visibilityState === "visible" && ping(false), 20_000);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onHide);
    return () => {
      ping(true); // leaving this route inside the app
      window.clearInterval(beat);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onHide);
    };
  }, [pathname]);

  return null;
}
