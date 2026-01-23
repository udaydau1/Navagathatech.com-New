import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getJobs, addJob } from "@/lib/jobs";

export async function GET() {
    const session = await getSession();

    if (!session || session.email !== "hr@navagathatech.com") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const jobs = await getJobs();
        return NextResponse.json(jobs);
    } catch (error) {
        return NextResponse.json({ message: "Failed to load jobs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getSession();

    if (!session || session.email !== "hr@navagathatech.com") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const newJob = await addJob({
            ...body,
            slug: body.title.toLowerCase().replace(/ /g, "-"),
        });
        return NextResponse.json(newJob);
    } catch (error) {
        return NextResponse.json({ message: "Failed to create job" }, { status: 500 });
    }
}
