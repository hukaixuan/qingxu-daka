#!/usr/bin/env node
/**
 * Local screenshot helper for 今日情绪抽签.
 * Forces a drawn-card state via injected JS (Qingxu.showCard), not URL params.
 *
 * Usage:
 *   python3 -m http.server 8767
 *   node tools/screenshot.mjs
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import fs from "node:fs";
import http from "node:http";

const PORT = process.env.PORT || "8767";
const BASE = (process.env.BASE || `http://127.0.0.1:${PORT}/`).replace(/\/?$/, "/");
const OUT = process.env.OUT || "/tmp/qingxu-shots";
const CHROME = process.env.CHROME || "google-chrome";
const DEBUG_PORT = Number(process.env.DEBUG_PORT || "9223");
const W = 390;
const H = 844;

fs.mkdirSync(OUT, { recursive: true });

function waitHttp(port, path, ms) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const req = http.get({ host: "127.0.0.1", port, path, timeout: 600 }, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      });
      req.on("error", () => {
        if (Date.now() - start > ms) reject(new Error("timeout waiting for :" + port + path));
        else setTimeout(tryOnce, 80);
      });
      req.on("timeout", () => {
        req.destroy();
        if (Date.now() - start > ms) reject(new Error("timeout waiting for :" + port + path));
        else setTimeout(tryOnce, 80);
      });
    };
    tryOnce();
  });
}

function connectWs(url) {
  const ws = new WebSocket(url);
  let nextId = 0;
  const pending = new Map();
  const consoleMessages = [];
  const pageErrors = [];
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(String(ev.data));
    if (msg.id != null && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.method + " " + JSON.stringify(msg.error)));
      else resolve(msg.result);
      return;
    }
    const m = msg.method;
    const p = msg.params || {};
    if (m === "Runtime.consoleAPICalled") {
      const text = (p.args || []).map((a) => a.value ?? a.description ?? a.type).join(" ");
      consoleMessages.push({ type: p.type, text });
    } else if (m === "Runtime.exceptionThrown") {
      const d = p.exceptionDetails || {};
      pageErrors.push(d.text || (d.exception && d.exception.description) || "exception");
    }
  });
  const ready = new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });
  function send(method, params, sessionId) {
    const id = ++nextId;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify(payload));
      setTimeout(() => {
        if (pending.has(id)) {
          pending.delete(id);
          reject(new Error("CDP timeout: " + method));
        }
      }, 15000);
    });
  }
  return { ws, ready, send, consoleMessages, pageErrors };
}

const userDir = "/tmp/qingxu-chrome-profile-" + process.pid;
fs.mkdirSync(userDir, { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-http-cache",
  "--force-device-scale-factor=2",
  `--remote-debugging-port=${DEBUG_PORT}`,
  `--user-data-dir=${userDir}`,
  "about:blank"
], { stdio: ["ignore", "pipe", "pipe"] });

let stderr = "";
chrome.stderr.on("data", (d) => { stderr += d.toString(); });

let failed = false;
try {
  await waitHttp(DEBUG_PORT, "/json/version", 10000);
  const ver = JSON.parse(await waitHttp(DEBUG_PORT, "/json/version", 2000));
  const browser = connectWs(ver.webSocketDebuggerUrl);
  await browser.ready;

  const created = await browser.send("Target.createTarget", { url: "about:blank" });
  const attached = await browser.send("Target.attachToTarget", {
    targetId: created.targetId,
    flatten: true
  });
  const sid = attached.sessionId;
  const send = (method, params) => browser.send(method, params, sid);

  await send("Runtime.enable");
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: W,
    height: H,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true });

  async function screenshot(name) {
    const res = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
    const file = `${OUT}/${name}.png`;
    fs.writeFileSync(file, Buffer.from(res.data, "base64"));
    console.log("wrote", file, fs.statSync(file).size);
    return file;
  }

  async function evaluate(expression) {
    const res = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (res.exceptionDetails) {
      throw new Error("eval failed: " + JSON.stringify(res.exceptionDetails.text || res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }

  const nav = await send("Page.navigate", { url: BASE + "?v=" + Date.now() });
  await send("Page.loadEventFired").catch(() => {});
  // loadEventFired may have already happened; also wait via evaluate
  await sleep(200);
  await evaluate("document.fonts ? document.fonts.ready.then(() => true) : true");
  await sleep(400);

  const startInfo = await evaluate(`({
    title: document.title,
    hasLogo: !!document.querySelector('.logo'),
    screen: document.getElementById('screen-title') && !document.getElementById('screen-title').hidden,
    moodCount: window.Qingxu && window.Qingxu.MOODS.length
  })`);
  console.log("start", JSON.stringify(startInfo));
  await screenshot("start");

  const drawn = await evaluate(`
    (async function () {
      if (!window.Qingxu) return { ok: false, reason: "no Qingxu API" };
      window.Qingxu.showCard(0, { animate: false });
      await new Promise((r) => setTimeout(r, 120));
      var card = document.getElementById("card");
      return {
        ok: true,
        mood: window.Qingxu.MOODS[0].name,
        count: window.Qingxu.MOODS.length,
        resultShown: document.getElementById("screen-result") && !document.getElementById("screen-result").hidden,
        cardSize: card ? [card.width, card.height] : null
      };
    })()
  `);
  console.log("drawn", JSON.stringify(drawn));
  await sleep(200);
  await screenshot("card");

  // also export the raw card canvas (share image)
  const dataUrl = await evaluate(`
    document.getElementById("card").toDataURL("image/png")
  `);
  if (typeof dataUrl === "string" && dataUrl.startsWith("data:image/png")) {
    const buf = Buffer.from(dataUrl.split(",")[1], "base64");
    const file = `${OUT}/card-export.png`;
    fs.writeFileSync(file, buf);
    console.log("wrote", file, buf.length);
  }

  const errors = browser.pageErrors.slice();
  const consoleErrs = browser.consoleMessages.filter((m) => m.type === "error" || m.type === "warning");
  console.log("pageErrors", JSON.stringify(errors));
  console.log("console", JSON.stringify(consoleErrs));
  fs.writeFileSync(`${OUT}/report.json`, JSON.stringify({
    startInfo, drawn, errors, console: browser.consoleMessages
  }, null, 2));
  if (errors.length) failed = true;
} catch (err) {
  failed = true;
  console.error("SCREENSHOT FAILED", err);
  console.error("chrome stderr:", stderr.slice(-2000));
} finally {
  try { chrome.kill("SIGTERM"); } catch (e) {}
  await sleep(200);
  try { chrome.kill("SIGKILL"); } catch (e) {}
}

process.exit(failed ? 1 : 0);
