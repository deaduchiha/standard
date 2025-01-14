"use client";
import { ofetch } from "ofetch";
import Cookies from "js-cookie";

export const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  retry: false,

  async onRequest({ options }) {
    const token = Cookies.get("token");

    if (token) {
      options.headers.set("Authorization", "Bearer " + token);
    }
  },
  async onResponseError({ response }) {
    const { _data } = response;

    return Promise.reject(_data); // default Error from backend
  },
});
