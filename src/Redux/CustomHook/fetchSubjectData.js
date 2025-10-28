import { useGetAllAssignmentPhotosQuery, useGetAllLabsPhotosQuery, useGetAllNotesPhotosQuery } from "../Features/ApiSlice";

export const fetchSubjectData = (type, typeId) => {
    const notes = useGetAllNotesPhotosQuery(typeId, { skip: type !== "notes" })
    const assignment = useGetAllAssignmentPhotosQuery(typeId, { skip: type !== "assignment" })
    const labmanual = useGetAllLabsPhotosQuery(typeId, { skip: type !== "labmanual" })

    if (type === "notes") return notes;
    if (type === "assignment") return assignment;
    if (type === "labmanual") return labmanual;

    return { data: null, isLoading: false, error: null }
}