import fs from 'fs/promises';
import path from 'path';

export interface Job {
    id: string;
    slug: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    overview: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
}

const jobsFilePath = path.join(process.cwd(), 'data', 'jobs.json');

export async function getJobs(): Promise<Job[]> {
    const data = await fs.readFile(jobsFilePath, 'utf8');
    return JSON.parse(data);
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
    const jobs = await getJobs();
    return jobs.find(j => j.slug === slug);
}

export async function saveJobs(jobs: Job[]): Promise<void> {
    await fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2), 'utf8');
}

export async function addJob(job: Omit<Job, 'id'>): Promise<Job> {
    const jobs = await getJobs();
    const newJob = { ...job, id: Date.now().toString() };
    jobs.push(newJob);
    await saveJobs(jobs);
    return newJob;
}

export async function updateJob(id: string, updates: Partial<Job>): Promise<Job | undefined> {
    const jobs = await getJobs();
    const index = jobs.findIndex(j => j.id === id);
    if (index === -1) return undefined;

    jobs[index] = { ...jobs[index], ...updates };
    await saveJobs(jobs);
    return jobs[index];
}

export async function deleteJob(id: string): Promise<boolean> {
    const jobs = await getJobs();
    const initialLength = jobs.length;
    const filteredJobs = jobs.filter(j => j.id !== id);
    if (filteredJobs.length === initialLength) return false;

    await saveJobs(filteredJobs);
    return true;
}
