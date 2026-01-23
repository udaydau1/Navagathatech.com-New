"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Plus, Edit2, Trash2, Briefcase, MapPin, Loader2, AlertCircle, Search } from "lucide-react";
import Link from "next/link";
import { Job } from "@/lib/jobs";

export default function AdminDashboard() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/admin/jobs");
            if (res.ok) {
                const data = await res.json();
                setJobs(data);
            } else {
                setError("Failed to fetch jobs. Re-login as HR.");
            }
        } catch (err) {
            setError("Error connecting to server.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
            if (res.ok) {
                setJobs(jobs.filter(j => j.id !== id));
            } else {
                alert("Failed to delete job.");
            }
        } catch (err) {
            alert("Error deleting job.");
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-extrabold text-primary mb-2">Admin Dashboard</h1>
                            <p className="text-foreground-muted">Manage job postings and applications</p>
                        </div>
                        <Link
                            href="/admin/jobs/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-primary font-bold rounded-2xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
                        >
                            <Plus size={20} /> Post New Job
                        </Link>
                    </div>

                    <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-grow max-w-md w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by title or department..."
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-secondary outline-none transition-all text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="text-sm font-semibold text-primary/40 ml-auto">
                                Showing {filteredJobs.length} active postings
                            </div>
                        </div>

                        {loading ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="animate-spin text-secondary" size={40} />
                                <p className="text-foreground-muted font-medium">Loading your cockpit...</p>
                            </div>
                        ) : error ? (
                            <div className="py-20 text-center">
                                <div className="inline-flex items-center gap-2 text-red-500 bg-red-50 px-6 py-3 rounded-2xl border border-red-100">
                                    <AlertCircle size={20} />
                                    {error}
                                </div>
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className="py-20 text-center text-foreground-muted">
                                <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                                <p>No job postings found matching your search.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {filteredJobs.map((job) => (
                                    <div key={job.id} className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] px-2 py-1 bg-[#D4AF37]/5 rounded">
                                                    {job.department}
                                                </span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 px-2 py-1 bg-gray-100 rounded">
                                                    {job.type}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-primary mb-1">{job.title}</h3>
                                            <div className="flex items-center gap-4 text-xs font-medium text-foreground-muted">
                                                <div className="flex items-center gap-1.5 capitalize">
                                                    <MapPin size={14} className="text-secondary" />
                                                    {job.location}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/admin/jobs/${job.id}/edit`}
                                                className="p-3 text-primary/60 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                                                title="Edit Posting"
                                            >
                                                <Edit2 size={20} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(job.id, job.title)}
                                                className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                title="Delete Posting"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                            <Link
                                                href={`/careers/${job.slug}`}
                                                target="_blank"
                                                className="ml-4 px-4 py-2 text-xs font-bold text-primary border border-primary/10 rounded-lg hover:border-primary transition-all"
                                            >
                                                Preview Page
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
