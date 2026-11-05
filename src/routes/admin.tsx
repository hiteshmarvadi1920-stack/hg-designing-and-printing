import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getProjectsFn, deleteProjectFn, addProjectFn } from "@/lib/projects-api";
import type { Project } from "@/lib/content";

export const Route = createFileRoute("/admin")({
  loader: () => getProjectsFn(),
  head: () => ({
    meta: [
      { title: "Admin — Project Manager" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const projects = Route.useLoaderData();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${projects.find((p) => p.slug === slug)?.title}"?`)) return;
    setDeleting(slug);
    try {
      await deleteProjectFn({ data: slug });
      router.invalidate();
    } catch (e) {
      console.error(e);
      alert("Failed to delete project.");
    } finally {
      setDeleting(null);
    }
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAdding(true);
    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      await addProjectFn({ data: fd });
      form.reset();
      setPreview(null);
      setShowForm(false);
      router.invalidate();
    } catch (err) {
      console.error(err);
      alert("Failed to add project.");
    } finally {
      setAdding(false);
    }
  }

  function handleFilePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ cursor: "default" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
              ← Back to site
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <h1 className="text-lg font-semibold text-gray-900">
              Admin — Project Manager
            </h1>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {projects.length} projects
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Add Project toggle */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            {showForm ? (
              <>
                <XIcon /> Close
              </>
            ) : (
              <>
                <PlusIcon /> Add Project
              </>
            )}
          </button>
        </div>

        {/* Add Project form */}
        {showForm && (
          <div className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-base font-semibold text-gray-900">New Project</h2>
            <form onSubmit={handleAdd} className="space-y-5">
              {/* Image upload */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-start gap-4">
                  <label className="flex h-32 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gray-400 hover:bg-gray-100">
                    <UploadIcon />
                    <span className="mt-1 text-xs text-gray-500">Choose file</span>
                    <input
                      type="file"
                      name="image"
                      accept="image/jpeg,image/png,image/webp"
                      required
                      className="hidden"
                      onChange={handleFilePreview}
                    />
                  </label>
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-32 w-auto rounded-lg border border-gray-200 object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Fields grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="add-title" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="add-title"
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Riya Beauty Parlour"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="add-category" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="add-category"
                    type="text"
                    name="category"
                    required
                    placeholder="e.g. Banner, Poster design"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="add-desc" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="add-desc"
                  name="description"
                  rows={2}
                  placeholder="Brief description of the design"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <div className="w-32">
                <label htmlFor="add-year" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  id="add-year"
                  type="text"
                  name="year"
                  defaultValue={new Date().getFullYear().toString()}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={adding}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                >
                  {adding ? (
                    <>
                      <SpinnerIcon /> Adding…
                    </>
                  ) : (
                    "Add Project"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setPreview(null);
                  }}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Project grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              deleting={deleting === p.slug}
              onDelete={() => handleDelete(p.slug)}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 text-4xl">📂</div>
            <p className="text-lg font-medium text-gray-600">No projects yet</p>
            <p className="mt-1 text-sm text-gray-400">Click "Add Project" to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}

/* ── Project card ── */

function ProjectCard({
  project: p,
  deleting,
  onDelete,
}: {
  project: Project;
  deleting: boolean;
  onDelete: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={p.image}
          alt={p.description}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Year badge */}
        <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[0.65rem] font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
          {p.year}
        </span>
      </div>
      {/* Info */}
      <div className="p-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-gray-400">
          {p.category}
        </p>
        <h3 className="mt-0.5 truncate text-sm font-semibold text-gray-900">{p.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">{p.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[0.6rem] text-gray-300">{p.slug}</span>
          <button
            onClick={onDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
          >
            {deleting ? <SpinnerIcon /> : <TrashIcon />}
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
      <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5A.75.75 0 0 1 9.95 6Z" clipRule="evenodd" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-gray-400">
      <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-3.5 w-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
    </svg>
  );
}
