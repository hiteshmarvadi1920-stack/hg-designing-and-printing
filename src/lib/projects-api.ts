import { createServerFn } from "@tanstack/react-start";
import { defaultProjects, type Project } from "./content";

/* ── Server functions ── */

export const getProjectsFn = createServerFn().handler(async (): Promise<Project[]> => {
  try {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const jsonFile = path.resolve(process.cwd(), "data/projects.json");
    if (fs.existsSync(jsonFile)) {
      const raw = fs.readFileSync(jsonFile, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) {
        return list as Project[];
      }
    }
  } catch {
    // If running in a read-only or serverless environment without data/projects.json, fallback gracefully
  }
  return defaultProjects;
});

export const deleteProjectFn = createServerFn()
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const jsonFile = path.resolve(process.cwd(), "data/projects.json");
      if (fs.existsSync(jsonFile)) {
        const raw = fs.readFileSync(jsonFile, "utf-8");
        const projects: Project[] = JSON.parse(raw);
        const filtered = projects.filter((p) => p.slug !== slug);
        fs.writeFileSync(jsonFile, JSON.stringify(filtered, null, 2), "utf-8");
        return { ok: true, remaining: filtered.length };
      }
    } catch (err) {
      console.warn("Delete project file system warning:", err);
    }
    return { ok: true };
  });

export const addProjectFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as FormData)
  .handler(async ({ data: formData }) => {
    const file = formData.get("image") as File | null;
    const title = (formData.get("title") as string) || "Untitled";
    const category = (formData.get("category") as string) || "Design";
    const description = (formData.get("description") as string) || "";
    const year = (formData.get("year") as string) || new Date().getFullYear().toString();

    if (!file || file.size === 0) {
      throw new Error("Image file is required");
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const arrayBuf = await file.arrayBuffer();
    const buf = Buffer.from(arrayBuf);
    const dims = getImageDimensions(buf);
    const ratio = dims ? `${dims.w}/${dims.h}` : "1/1";

    let filename = `w-${slug}-${Date.now()}.jpeg`;
    try {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const ext = path.extname(file.name).toLowerCase() || ".jpeg";
      filename = `w-${slug}-${Date.now()}${ext}`;

      const outDir = path.resolve(process.cwd(), "public/work");
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, filename), buf);

      const jsonFile = path.resolve(process.cwd(), "data/projects.json");
      let projects: Project[] = defaultProjects;
      if (fs.existsSync(jsonFile)) {
        projects = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));
      }

      const newProject: Project = {
        slug,
        title,
        category,
        description,
        image: `/work/${filename}`,
        ratio,
        year,
      };

      projects.push(newProject);
      fs.writeFileSync(jsonFile, JSON.stringify(projects, null, 2), "utf-8");
      return { ok: true, project: newProject };
    } catch (err) {
      console.warn("Add project file system warning:", err);
      const newProject: Project = {
        slug,
        title,
        category,
        description,
        image: `/work/${filename}`,
        ratio,
        year,
      };
      return { ok: true, project: newProject };
    }
  });

/* ── Image dimension parsing (server-only) ── */

function getImageDimensions(buf: Buffer): { w: number; h: number } | null {
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1]!;
      if (marker === 0xc0 || marker === 0xc2) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      }
      const len = buf.readUInt16BE(i + 2);
      i += 2 + len;
    }
  }
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // WebP
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") {
      return {
        w: (buf[24]! | (buf[25]! << 8) | (buf[26]! << 16)) + 1,
        h: (buf[27]! | (buf[28]! << 8) | (buf[29]! << 16)) + 1,
      };
    }
  }
  return null;
}
