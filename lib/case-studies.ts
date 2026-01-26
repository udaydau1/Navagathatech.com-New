import { promises as fs } from 'fs';
import path from 'path';

export interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    category: string;
    client: string;
    summary: string;
    content: string;
    links: { name: string; url: string }[];
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
    const filePath = path.join(process.cwd(), 'data', 'case-studies.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
    const studies = await getCaseStudies();
    return studies.find(s => s.slug === slug);
}
