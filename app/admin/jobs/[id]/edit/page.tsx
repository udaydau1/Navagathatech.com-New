import JobEditor from "@/components/JobEditor";

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
    return <JobEditor params={params} />;
}
