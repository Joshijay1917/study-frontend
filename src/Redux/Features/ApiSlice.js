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
        // api.dispatch(setCredentials({user: result.data.data}))
        return result;
    }
    
    if(!result?.error?.data?.success) {
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
    tagTypes: ['Subjects', 'Notes', 'Assi', 'Labs'],
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
                    console.error("Login failed!!", error)
                }
            },
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
            query: (typeId) => `/notes/photos/${typeId}`
        }),
        getAllAssignmentPhotos: builder.query({
            query: (typeId) => `/assignment/photos/${typeId}`
        }),
        getAllLabsPhotos: builder.query({
            query: (typeId) => `/labmanual/photos/${typeId}`
        }),
        uploadNotePhoto: builder.mutation({
            query: (form) => ({
                url: '/notes/upload',
                method: 'POST',
                body: form
            })
        }),
        uploadAssignmentPhoto: builder.mutation({
            query: (form) => ({
                url: '/assignment/upload',
                method: 'POST',
                body: form
            })
        }),
        uploadLabPhoto: builder.mutation({
            query: (form) => ({
                url: '/lab/upload',
                method: 'POST',
                body: form
            })
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
        })
    })
})

export const { 
    useCurrentUserQuery,
    useLoginUserMutation,
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
    useAddLabManualMutation
 } = ApiSlice