import { useGetAllAssignmentsQuery, useGetAllLabsQuery, useGetAllNotesQuery } from "../Features/ApiSlice";

export const getTypeDetails = (type, subjectId) => {
    const notes = useGetAllNotesQuery(subjectId, { skip: type !== "notes" })
    const assignment = useGetAllAssignmentsQuery(subjectId, { skip: type !== "assignment" })
    const labmanual = useGetAllLabsQuery(subjectId, { skip: type !== "labmanual" })

    if (type === "notes") return notes;
    if (type === "assignment") return assignment;
    if (type === "labmanual") return labmanual;

    return { data: null, isLoading: false, error: null }
}