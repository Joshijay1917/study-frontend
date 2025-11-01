import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./UserSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://study-backend-fswj.onrender.com/api/v1',
    credentials: 'include'
})

const baseQueryWithReAuth = async(args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log("res", result);
    
    if(result?.data?.success) {
        if(result.data.data.username) {
            api.dispatch(setCredentials({user: result.data.data}))
        }
        return result;
    }
    
    if(args?.url === "/user/curr-user" && !result?.error?.data?.success) {
        console.log("Access token expired. Trying refresh...");

        const refreshResult = await baseQuery("/user/refresh-token", api, extraOptions);
        if(refreshResult?.data?.success) {
            api.dispatch(setCredentials(refreshResult.data.data))

            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("Refresh token expired. Need to Login..");
            api.dispatch(logOut())
        }
    }

    return result;
}

export const ApiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Subjects', 'Notes', 'Assi', 'Labs', 'NotePhotos', 'AssiPhotos', 'LabPhotos', 'LatestUpdates'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (form) => ({
                url: '/user/login',
                method: 'POST',
                body: form
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setCredentials(data.data))
                } catch (error) {
                    console.error("Login failed!! Err:", error)
                }
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'POST'
            })
        }),
        registerUser: builder.mutation({
            query: (form) => ({
                url: '/user/register',
                method: 'POST',
                body: form
            })
        }),

        currentUser: builder.query({
            query: () => '/user/curr-user'
        }),
        getAllSubjects: builder.query({
            query: () => '/subject/getAll',
            providesTags: ['Subjects']
        }),
        getAllNotes: builder.query({
            query: (subjectId) => `/notes/${subjectId}`,
            providesTags: ['Notes']
        }),
        getAllAssignments: builder.query({
            query: (subjectId) => `/assignment/${subjectId}`,
            providesTags: ['Assi']
        }),
        getAllLabs: builder.query({
            query: (subjectId) => `/labmanual/${subjectId}`,
            providesTags: ['Labs']
        }),
        getAllNotesPhotos: builder.query({
            query: (typeId) => `/notes/photos/${typeId}`,
            providesTags: ['NotePhotos']
        }),
        getAllAssignmentPhotos: builder.query({
            query: (typeId) => `/assignment/photos/${typeId}`,
            providesTags: ['AssiPhotos']
        }),
        getAllLabsPhotos: builder.query({
            query: (typeId) => `/labmanual/photos/${typeId}`,
            providesTags: ['LabPhotos']
        }),
        uploadNotePhoto: builder.mutation({
            query: (form) => ({
                url: '/notes/upload',
                method: 'POST',
                body: form
            }),
            invalidatesTags: ['NotePhotos']
        }),
        uploadAssignmentPhoto: builder.mutation({
            query: (form) => ({
                url: '/assignment/upload',
                method: 'POST',
                body: form
            }),
            invalidatesTags: ['AssiPhotos']
        }),
        uploadLabPhoto: builder.mutation({
            query: (form) => ({
                url: '/lab/upload',
                method: 'POST',
                body: form
            }),
            invalidatesTags: ['LabPhotos']
        }),
        addSubject: builder.mutation({
            query: (form) => ({
                url: '/subject/add',
                method: 'POST',
                body: form,
            }),
            invalidatesTags: ['Subjects']
        }),
        addNote: builder.mutation({
            query: (form) => ({
                url: '/notes/add',
                method: 'POST',
                body: form
            }),
            invalidatesTags: ['Notes']
        }),
        addAssignment: builder.mutation({
            query: (form) => ({
                url: '/assignment/add',
                method: 'POST',
                body: form
            }),
            invalidatesTags: ['Assi']
        }),
        addLabManual: builder.mutation({
            query: (form) => ({
                url: '/labmanual/add',
                method: 'POST',
                body: form
            }),
            invalidatesTags: ['Labs']
        }),
        getLatestUpdates: builder.query({
            query: () => '/latestUpdates/',
            providesTags: ['LatestUpdates']
        }),
        deleteSubject: builder.mutation({
            query: (subjectId) => ({
                url: '/subject/delete',
                method: 'DELETE',
                body: subjectId
            }),
            invalidatesTags: ['Subjects']
        }),
        deleteNote: builder.mutation({
            query: (notesId) => ({
                url: '/notes/delete',
                method: 'DELETE',
                body: notesId
            }),
            invalidatesTags: ['Notes', 'LatestUpdates']
        }),
        deleteAssignment: builder.mutation({
            query: (assignmentId) => ({
                url: '/assignment/delete',
                method: 'DELETE',
                body: assignmentId
            }),
            invalidatesTags: ['Assi', 'LatestUpdates']
        }),
        deleteLabmanual: builder.mutation({
            query: (labmanualId) => ({
                url: '/labmanual/delete',
                method: 'DELETE',
                body: labmanualId
            }),
            invalidatesTags: ['Labs', 'LatestUpdates']
        }),
        deleteOnePhotoNotes: builder.mutation({
            query: (publicId) => ({
                url: '/notes/photo/delete',
                method: 'DELETE',
                body: publicId
            }),
            invalidatesTags: ['NotePhotos', 'LatestUpdates']
        }),
        deleteOnePhotoAssi: builder.mutation({
            query: (publicId) => ({
                url: '/assignment/photo/delete',
                method: 'DELETE',
                body: publicId
            }),
            invalidatesTags: ['AssiPhotos', 'LatestUpdates']
        }),
        deleteOnePhotoLab: builder.mutation({
            query: (publicId) => ({
                url: '/labmanual/photo/delete',
                method: 'DELETE',
                body: publicId
            }),
            invalidatesTags: ['LabPhotos', 'LatestUpdates']
        }),
    })
})

export const { 
    useRegisterUserMutation,
    useCurrentUserQuery,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetAllSubjectsQuery,
    useGetAllNotesQuery,
    useGetAllAssignmentsQuery,
    useGetAllLabsQuery,
    useGetAllNotesPhotosQuery,
    useGetAllAssignmentPhotosQuery,
    useGetAllLabsPhotosQuery,
    useUploadNotePhotoMutation,
    useUploadAssignmentPhotoMutation,
    useUploadLabPhotoMutation,
    useAddSubjectMutation,
    useAddNoteMutation,
    useAddAssignmentMutation,
    useAddLabManualMutation,
    useGetLatestUpdatesQuery,
    useDeleteSubjectMutation,
    useDeleteNoteMutation,
    useDeleteAssignmentMutation,
    useDeleteLabmanualMutation,
    useDeleteOnePhotoNotesMutation,
    useDeleteOnePhotoAssiMutation,
    useDeleteOnePhotoLabMutation
 } = ApiSlice