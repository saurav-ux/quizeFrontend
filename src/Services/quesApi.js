import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react"

export const quesApi = createApi({
    baseQuery: fetchBaseQuery({
        // baseUrl:'http://localhost:5077'
        baseUrl:'https://quizgamebackend.vercel.app'
    }),
    reducerPath: 'quesApi',
    endpoints:(builder)=>({
        getQuesData:builder.query({
            query: (page) => ({
              url: `/ques?page=${page}`,
              method: 'GET',
            }),
          }),
        postAnsData: builder.mutation({
            query: (data) => ({
              url: `/score/`,
              method: 'POST',
              body:data
    
            }),
          }),
          signup:builder.mutation({
            query:(data)=>({
              url: `/auth/`,
              method: 'POST',
              body:data
            })
          }),
          validate:builder.mutation({
            query:(data)=>({
              url: `/auth/validate`,
              method: 'POST',
              body:data
            })
          }),
          getLeaderData:builder.query({
            query: () => ({
              url: `/score/leader`,
              method: 'GET',
            }),
          }),
    })
})
export const {useGetQuesDataQuery,usePostAnsDataMutation,useSignupMutation,useValidateMutation,useGetLeaderDataQuery} = quesApi