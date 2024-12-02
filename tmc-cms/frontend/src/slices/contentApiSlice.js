import { apiSlice } from "./apiSlice";
const HOME_URL = "/api/content";

export const contentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    publish: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/publish?page=${data.pageId}`,
        method: "POST",
        body: data.data,
      }),
    }),
    load: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/load?page=${
          data.pageId
        }&unique=${new Date().getTime()}`,
        method: "GET",
      }),
    }),
    loadAll: builder.mutation({
      query: () => ({
        url: `${HOME_URL}/loadall`,
        method: "GET",
      }),
    }),

    loadArticle: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/article/${
          data.pageId
        }?unique=${new Date().getTime()}`,
        method: "GET",
      }),
    }),
    deleteArticle: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/article/${data.pageId}`,
        method: "DELETE",
      }),
    }),
    getCategory: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/category/${data.type}`,
        method: "GET",
      }),
    }),

    //news
    publishNews: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/news/${data.pageId}`,
        method: "POST",
        body: data.data,
      }),
    }),
    getAllNews: builder.mutation({
      query: () => ({
        url: `${HOME_URL}/allnews`,
        method: "GET",
      }),
    }),

    //review
    publishReview: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/review/${data.pageId}`,
        method: "POST",
        body: data.data,
      }),
    }),
    getAllReview: builder.mutation({
      query: () => ({
        url: `${HOME_URL}/allreview`,
        method: "GET",
      }),
    }),

    //video
    publishVideo: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/video/${data.pageId}`,
        method: "POST",
        body: data.data,
      }),
    }),
    getAllVideo: builder.mutation({
      query: () => ({
        url: `${HOME_URL}/allvideo`,
        method: "GET",
      }),
    }),

    //member
    upsertMember: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/member/${data.memberId}`,
        method: "POST",
        body: data.data,
      }),
    }),
    deleteMember: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/member/${data.memberId}`,
        method: "DELETE",
      }),
    }),
    getAllMember: builder.mutation({
      query: () => ({
        url: `${HOME_URL}/allmember`,
        method: "GET",
      }),
    }),
    //knowledge item
    upsertKnowledgeItem: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/knowledgeitem/${data.knowledgeitemId}`,
        method: "POST",
        body: data.data,
      }),
    }),
    deleteKnowledgeItem: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/knowledgeitem/${data.knowledgeitemId}`,
        method: "DELETE",
      }),
    }),
    getAllKnowledgeItem: builder.mutation({
      query: () => ({
        url: `${HOME_URL}/allknowledgeitem`,
        method: "GET",
      }),
    }),

    //bot
    trainPage: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/bot/page/${data.pageId}`,
        method: "POST",
        body: data,
      }),
    }),
    trainArticle: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/bot/article/${data.pageId}`,
        method: "POST",
        body: data,
      }),
    }),
    trainMember: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/bot/member/${data.memberId}`,
        method: "POST",
        body: data,
      }),
    }),
    trainKnowledgeItem: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/bot/knowledgeitem/${data.knowledgeitemId}`,
        method: "POST",
        body: data,
      }),
    }),
    
    getAllAdmin: builder.mutation({
      query: () => ({
        url: `${HOME_URL}/alladmin`,
        method: "GET",
      }),
    }),

    toggleAllowedAdmin: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/toggleAllowedAdmin`,
        method: "POST",
        body: data
      }),
    }),
    deleteAdmin: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/deleteAdmin`,
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const {
  usePublishMutation,
  useLoadMutation,
  useLoadAllMutation,

  useLoadArticleMutation,
  useDeleteArticleMutation,
  useGetCategoryMutation,

  usePublishNewsMutation,
  useGetAllNewsMutation,

  usePublishReviewMutation,
  useGetAllReviewMutation,

  usePublishVideoMutation,
  useGetAllVideoMutation,

  useUpsertMemberMutation,
  useDeleteMemberMutation,
  useGetAllMemberMutation,

  useUpsertKnowledgeItemMutation,
  useDeleteKnowledgeItemMutation,
  useGetAllKnowledgeItemMutation,

  useTrainPageMutation,
  useTrainArticleMutation,
  useTrainMemberMutation,
  useTrainKnowledgeItemMutation,
  
  useGetAllAdminMutation,
  useToggleAllowedAdminMutation,
  useDeleteAdminMutation
} = contentApiSlice;
