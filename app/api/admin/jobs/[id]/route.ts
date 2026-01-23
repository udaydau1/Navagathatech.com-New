import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateJob, deleteJob } from "@/lib/jobs";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();
    const { id } = await params;

    if (!session || session.email !== "hr@navagathatech.com") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const updated = await updateJob(id, {
            ...body,
            slug: body.title ? body.title.toLowerCase().replace(/ /g, "-") : undefined,
        });

        if (!updated) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: "Failed to update job" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();
    const { id } = await params;

    if (!session || session.email !== "hr@navagathatech.com") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const success = await deleteJob(id);
        if (!success) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete job" }, { status: 500 });
    }
}
