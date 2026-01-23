"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronLeft, Save, Plus, X, Loader2, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Job } from "@/lib/jobs";

export default function JobEditor({ params }: { params?: Promise<{ id: string }> }) {
    const resolvedParams = params ? use(params) : null;
    const id = resolvedParams?.id;
    const isEditing = !!id;
    const router = useRouter();

    const [form, setForm] = useState<Partial<Job>>({
        title: "",
        department: "Engineering",
        location: "Mumbai, IN",
        type: "Full-time",
        description: "",
        overview: "",
        responsibilities: [""],
        requirements: [""],
        benefits: [""]
    });

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetch(`/api/admin/jobs`)
                .then(res => res.json())
                .then((jobs: Job[]) => {
                    const job = jobs.find(j => j.id === id);
                    if (job) setForm(job);
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const handleListChange = (key: 'responsibilities' | 'requirements' | 'benefits', index: number, value: string) => {
        const newList = [...(form[key] || [])];
        newList[index] = value;
        setForm({ ...form, [key]: newList });
    };

    const addListItem = (key: 'responsibilities' | 'requirements' | 'benefits') => {
        setForm({ ...form, [key]: [...(form[key] || []), ""] });
    };

    const removeListItem = (key: 'responsibilities' | 'requirements' | 'benefits', index: number) => {
        const newList = [...(form[key] || [])];
        newList.splice(index, 1);
        setForm({ ...form, [key]: newList });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const url = isEditing ? `/api/admin/jobs/${id}` : "/api/admin/jobs";
        const method = isEditing ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                alert("Failed to save job.");
            }
        } catch (err) {
            alert("An error occurred.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-secondary" size={40} /></div>;

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-8 transition-colors font-semibold">
                        <ChevronLeft size={18} /> Back to Dashboard
                    </Link>

                    <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
                        <h1 className="text-3xl font-extrabold text-primary mb-10 flex items-center gap-4">
                            {isEditing ? "Edit Job Posting" : "Create New Opportunity"}
                            {!isEditing && <span className="text-xs font-bold uppercase py-1 px-3 bg-secondary/10 text-secondary rounded-full border border-secondary/20">New</span>}
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Basic Info */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary">Job Title</label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-secondary outline-none transition-all"
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                        placeholder="e.g. Senior Software Engineer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary">Department</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-secondary outline-none transition-all"
                                        value={form.department}
                                        onChange={e => setForm({ ...form, department: e.target.value })}
                                    >
                                        <option>Engineering</option>
                                        <option>Enterprise Systems</option>
                                        <option>Managed Services</option>
                                        <option>Business Operations</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary">Location</label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-secondary outline-none transition-all"
                                        value={form.location}
                                        onChange={e => setForm({ ...form, location: e.target.value })}
                                        placeholder="Mumbai, IN / Remote"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary">Job Type</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-secondary outline-none transition-all"
                                        value={form.type}
                                        onChange={e => setForm({ ...form, type: e.target.value })}
                                    >
                                        <option>Full-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </select>
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div className="space-y-8 pt-6 border-t border-gray-50">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary flex items-center gap-2">
                                        Short Description <Info size={14} className="text-gray-400" />
                                    </label>
                                    <p className="text-xs text-foreground-muted mb-2">Used for the card preview on the Careers landing page.</p>
                                    <textarea
                                        required
                                        rows={2}
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-secondary outline-none transition-all resize-none"
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                        placeholder="Briefly describe the role..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-primary">Full Job Overview</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-secondary outline-none transition-all"
                                        value={form.overview}
                                        onChange={e => setForm({ ...form, overview: e.target.value })}
                                        placeholder="Provide a detailed introduction to the role..."
                                    />
                                </div>
                            </div>

                            {/* Lists */}
                            {(['responsibilities', 'requirements', 'benefits'] as const).map(key => (
                                <div key={key} className="space-y-4 pt-6 border-t border-gray-50">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-primary capitalize">{key}</label>
                                        <button
                                            type="button"
                                            onClick={() => addListItem(key)}
                                            className="text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <Plus size={14} /> Add Item
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {form[key]?.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    required
                                                    className="flex-grow px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-secondary outline-none transition-all"
                                                    value={item}
                                                    onChange={e => handleListChange(key, idx, e.target.value)}
                                                    placeholder={`Enter ${key.slice(0, -1)}...`}
                                                />
                                                {form[key]!.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeListItem(key, idx)}
                                                        className="p-3 text-gray-300 hover:text-red-400 transition-colors"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="pt-10">
                                <button
                                    disabled={saving}
                                    className="w-full py-5 bg-primary text-white font-extrabold rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/95 transition-all shadow-2xl shadow-primary/20 disabled:opacity-70"
                                >
                                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                    {isEditing ? "Save Changes" : "Publish Job Posting"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
